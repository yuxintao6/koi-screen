<!-- echarts模板，有局部刷新需要在mounted自行开启 -->
<template>
  <div ref="refChart" :style="{ height: kHOne + 'px'}"></div>
</template>

<script>
require("../../../assets/theme/shine");
export default {
  name: "",
  components: {},
  data() {
    return {
      // 获取浏览器可视区域高度（包含滚动条）、 window.innerHeight
      // 获取浏览器可视区域高度（不包含工具栏高度）、document.documentElement.clientHeight
      // 获取body的实际高度  (三个都是相同，兼容性不同的浏览器而设置的) document.body.clientHeight
      screenHeight:
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight,
      screenWidth:
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth,
      chartInstance: null,
      allData: [],
      kHOne: null,
      // 自适应浏览器获取宽高大小定时器
      koiTime: null,
      // 局部刷新定时器
      koiTimer: null,
    };
  },
  created() {},
  beforeMount() {
    this.kHOne = Math.round(this.screenHeight * 0.3);
  },
  mounted() {
    // 页面大小改变时触发
    window.addEventListener("resize", this.getScreenHeight, false);
    // 页面大小改变时触发
    window.addEventListener("resize", this.getScreenWidth, false);
    // 鼠标移动时触发
    //window.addEventListener('mousemove',this.getHeight, false);
    // 自适应浏览器获取宽高大小定时器
    this.resizeScreen();
    // 图表初始化
    this.initChart();
    // 获取接口数据
    this.getData();
    // 调用Echarts图表自适应方法
    this.screenAdapter();
    // Echarts图表自适应
    window.addEventListener("resize", this.screenAdapter);
    // 局部刷新定时器
    //this.getDataTimer();
  },
  beforeDestroy () {
    // 销毁Echarts图表
    this.chartInstance.dispose();
    this.chartInstance = null;
  },
  destroyed() {
    // 清除自适应屏幕定时器
    clearInterval(this.koiTime);
    this.koiTime = null;
    // 清除局部刷新定时器
    clearInterval(this.koiTimer);
    this.koiTimer = null;
    // 页面大小改变时触发销毁
    window.removeEventListener("resize", this.getScreenHeight, false);
    // 页面大小改变时触发销毁
    window.removeEventListener("resize", this.getScreenWidth, false);
    // Echarts图表自适应销毁
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    // 自适应浏览器获取宽高大小定时器
    resizeScreen() {
      this.koiTime = setInterval(() => {
        this.getScreenHeight();
        this.getScreenWidth();
      }, 200);
    },
    // 获取浏览器高度进行自适应
    getScreenHeight() {
      this.screenHeight =
        window.innerHeight ||
        document.documentElement.innerHeight ||
        document.body.clientHeight;
      // 四舍五入取整数
      this.kHOne = Math.round(this.screenHeight * 0.3);
      //console.log("高度->"+this.screenHeight +"-"+ this.kHOne);
    },
    // 字体大小根据宽度自适应
    getScreenWidth() {
      this.screenWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      //console.log("宽度->"+this.screenWidth);
    },
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.refChart, "shine");
      const initOption = {
        title: {
          text: "🍅12个月用电量变化柱状图",
          left: 'left'
        },            
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: '15%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        // legend: {
          
        // },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],       
        series: [
          {
            type: 'bar',
            barGap: '-100%',
            barWidth: '60%',
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            },
            itemStyle: { //设置渐变色                     
                normal: {
                    label: {
                      show: true, //开启数字显示
                      position: "top", //在上方显示数字
                      textStyle: {
                        //数值样式
                        color: "orange", //字体颜色
                        //fontSize: 10, //字体大小
                      },
                    },                  
                    color: new this.$echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: 'deepskyblue'},
                            {offset: 1, color: 'pink'}
                        ]),
                    barBorderRadius: 2  //柱状角成椭圆形
                }
            }
          },
        ]
      };
      // 图表初始化配置
      this.chartInstance.setOption(initOption);
    },
    getData() {
      // 调用接口方法
      // getModuleData().then(res => {
      //       this.allData = res.data;
      //       this.updateChart();
      //       //console.log("ALLDATA->"+JSON.stringify(this.allData.pcsSum));
      //       // echarts查不到数据，将初始化echarts的方法全部放置到接口方法中即可。
      // })
      // 获取服务器的数据, 对this.allData进行赋值之后, 调用updateChart方法更新图表
      //console.log("ALLDATA->",JSON.stringify(res.data))
      //console.log("ALLDATA->",JSON.stringify(this.allData))
      this.updateChart();
    },
    updateChart() {
      // 处理图表需要的数据
      const dataOption = {
        legend: {
          data: ['用电量']
        },        
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }
        ],
        series: [
          {
            name: '用电量',
            type: 'bar',
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
            ],
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          },
        ]                
      };
      // 图表数据变化配置
      this.chartInstance.setOption(dataOption);
    },
    screenAdapter() {
      this.titleFontSize = Math.round(this.$refs.refChart.offsetWidth / 40);
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: this.titleFontSize,
          },
        },
        // // 圆点分类标题
        legend: {
          textStyle: {
            fontSize: Math.round(this.titleFontSize),
          },
        },
        xAxis: {
          //  改变x轴字体颜色和大小
          axisLabel: {
            textStyle: {
              fontSize: Math.round(this.titleFontSize),
            },
          },
        },
        yAxis: {
          //  改变y轴字体颜色和大小
          axisLabel: {
            textStyle: {
              fontSize: Math.round(this.titleFontSize),
            },
          },
        },
        series: [
          {
            // 圆柱的宽度
            barWidth: Math.round(this.titleFontSize * 2),
            itemStyle: {
              //颜色样式部分
              normal: {
                label: {
                  textStyle: {
                    fontSize: Math.round(this.titleFontSize), //字体大小
                  },
                },
              },
            },
          }
        ],                
      };
      // 图表自适应变化配置
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
    // 定时器
    getDataTimer() {
      this.koiTimer = setInterval(() => {
        // 执行刷新数据的方法
        this.getData();
        //console.log("Hello World")
      }, 60000 * 10);
    },
  },
};
</script>
<style lang='less' scoped>

</style>