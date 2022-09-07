<!-- echarts模板，有局部刷新需要在mounted自行开启 -->
<template>      
    <div ref="refChart" :style="{ height: kHOne + 'px'}"></div>
</template>

<script>
require("../../../assets/theme/shine")
export default {
  name: '',
  components: {},
  data () {
  return {
    // 获取浏览器可视区域高度（包含滚动条）、 window.innerHeight
    // 获取浏览器可视区域高度（不包含工具栏高度）、document.documentElement.clientHeight
    // 获取body的实际高度  (三个都是相同，兼容性不同的浏览器而设置的) document.body.clientHeight
    screenHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    screenWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    chartInstance: null,
    allData: [],
    kHOne: null,
    // 自适应浏览器获取宽高大小定时器
    koiTime: null,
    // 局部刷新定时器    
    koiTimer: null,    
  }
  },
  created () {},
  beforeMount(){
    this.kHOne = Math.round(this.screenHeight * 0.35)
  },
  mounted(){
    // 页面大小改变时触发
    window.addEventListener('resize',this.getScreenHeight, false);
    // 页面大小改变时触发
    window.addEventListener('resize',this.getScreenWidth, false);
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
    window.removeEventListener('resize',this.getScreenHeight, false);
    // 页面大小改变时触发销毁
    window.removeEventListener('resize',this.getScreenWidth, false);
    // Echarts图表自适应销毁
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    // 自适应浏览器获取宽高大小定时器
    resizeScreen(){
      this.koiTime = setInterval(() => {
        this.getScreenHeight();
        this.getScreenWidth();
      }, 200)
    },
    // 获取浏览器高度进行自适应
    getScreenHeight() {
        this.screenHeight = window.innerHeight || document.documentElement.innerHeight || document.body.clientHeight;
        // 四舍五入取整数
        this.kHOne = Math.round(this.screenHeight * 0.35);
        //console.log("高度->"+this.screenHeight +"-"+ this.kHOne);
    },
    // 字体大小根据宽度自适应
    getScreenWidth(){
      this.screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      //console.log("宽度->"+this.screenWidth);
    },
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.refChart,'shine');
      const initOption = {
          title: {
            text: "🎠24小时负载电压",
            left: 'left'
          },      
          tooltip: {
            trigger: 'axis'
          },     
          legend: {
            right: '0%',
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
          },
          yAxis: {
            type: 'value'
          }      
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
            right: '0%',
            data: ['负载A相电压', '负载B相电压', '负载C相电压', '负载N相电压', '输出A相电压', '输出B相电压', '输出C相电压', '输出N相电压']
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']
          },
          series: [
            {
              name: '负载A相电压',
              type: 'line',
              stack: 'Total',
              data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 132, 101, 134, 230]
            },
            {
              name: '负载B相电压',
              type: 'line',
              stack: 'Total',
              data: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310, 290, 330, 310, 234]
            },
            {
              name: '负载C相电压',
              type: 'line',
              stack: 'Total',
              data: [150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410, 154, 190, 330, 230]
            },
            {
              name: '负载N相电压',
              type: 'line',
              stack: 'Total',
              data: [320, 332, 301, 334, 390, 330, 320, 320, 332, 301, 334, 390, 330, 320, 320, 332, 301, 334, 390, 330, 320, 332, 301, 334, 332]
            },
            {
              name: '输出A相电压',
              type: 'line',
              stack: 'Total',
              data: [558, 457, 715, 355, 687, 328, 586, 266, 425, 478, 657, 145, 789, 954, 425, 456, 425, 225, 668, 335, 415, 578, 225, 478, 365 ]
            },
            {
              name: '输出B相电压',
              type: 'line',
              stack: 'Total',
              data: [498, 785, 687, 256, 749, 756, 952, 498, 785, 687, 256, 749, 756, 952, 498, 785, 687, 256, 749, 756, 952, 687, 256, 749, 687]
            },
            {
              name: '输出C相电压',
              type: 'line',
              stack: 'Total',
              data: [498, 785, 687, 256, 749, 756, 952, 498, 785, 687, 256, 749, 756, 952, 498, 785, 687, 256, 749, 756, 952, 687, 256, 749, 687]
            },
            {
              name: '输出N相电压',
              type: 'line',
              stack: 'Total',
              data: [458, 756, 894, 648, 574, 687, 698, 458, 756, 894, 648, 574, 687, 698, 458, 756, 894, 648, 574, 687, 698, 756, 894, 648, 698]
            }
          ]                      
      };
      // 图表数据变化配置
      this.chartInstance.setOption(dataOption);
    },
    screenAdapter() {
      this.titleFontSize = Math.round(this.$refs.refChart.offsetWidth / 50);
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: Math.round(this.titleFontSize * 0.8),
          },
        },
        // 圆点分类标题
        legend: {
          textStyle: {
            fontSize: Math.round(this.titleFontSize / 2),
          },
        },
        xAxis: {
          //  改变x轴字体颜色和大小
          axisLabel: {
            textStyle: {
              fontSize: Math.round(this.titleFontSize * 0.8),
            },
          },
        },
        yAxis: {
          //  改变y轴字体颜色和大小
          axisLabel: {
            textStyle: {
              fontSize: Math.round(this.titleFontSize * 0.8),
            },
          },
        },
      };
      // 图表自适应变化配置
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
    // 定时器
    getDataTimer(){
      this.koiTimer = setInterval(() => {
        // 执行刷新数据的方法
        this.getData();
        //console.log("Hello World")
      }, 6000 * 30)
    },   
  }
}
</script>
<style lang='less' scoped>

</style>