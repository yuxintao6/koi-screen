<!-- left1 -->
<template>      
    <div ref="refChart" :style="{ height: kHOne + 'px'}"></div>
</template>

<script>
import { getModuleData } from "../../../api/ems/index";
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
    koiTime: null,
    // 局部刷新定时器    
    koiTimer: null,
  }
  },
  created () {},
  beforeMount(){
    this.kHOne = Math.round(this.screenHeight * 0.44)
  },
  mounted(){
    // 页面大小改变时触发
    window.addEventListener('resize',this.getScreenHeight, false);
    // 页面大小改变时触发
    window.addEventListener('resize',this.getScreenWidth, false);
    // 鼠标移动时触发
    //window.addEventListener('mousemove',this.getHeight, false);
    this.resizeScreen();
    // 图表初始化
    this.initChart();
    this.getData();
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
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
    // 页面大小改变时触发
    window.removeEventListener('resize',this.getScreenHeight, false);
    // 页面大小改变时触发
    window.removeEventListener('resize',this.getScreenWidth, false);
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: { 
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
        this.kHOne = Math.round(this.screenHeight * 0.44);
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
          text: "🌼近30天模块故障",
          left: 'center'
        },      
        tooltip: {
          trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
        },
        series: [
            {
              name: '模块故障',
              type: 'pie',
              // 环形图大小
              radius: ['45%', '70%'],
              // 环形图位置
              center: ["56%", "60%"], 
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '14',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
            }
          ]        
      };
      // 图表初始化配置
      this.chartInstance.setOption(initOption);
    },
    getData() {
      // getModuleData().then(res => {
      //     this.allData = res.data;
      //     this.updateChart(); 
      //     //console.log("数据left1->"+JSON.stringify(this.allData.pcsSum));
      //     // echarts查不到数据，将初始化echarts的方法全部放置到接口方法中即可。  
      // })         
      // 获取服务器的数据, 对this.allData进行赋值之后, 调用updateChart方法更新图表
      //console.log("ALLDATA->",JSON.stringify(res.data))
      //console.log("ALLDATA->",JSON.stringify(res.allData))
      this.updateChart();
    },
    updateChart() {
      // 处理图表需要的数据
      const dataOption = {
        series: [
            {
              data: [
                // { value: this.allData.pcsSum, name: 'AABB故障' },
                // { value: this.allData.dcsSum, name: 'CCDD故障' },
                // { value: this.allData.dcpvSum, name: 'YYXX故障' },
                // { value: this.allData.dcacSum, name: 'XXTT故障' },
                // { value: this.allData.batterySum, name: 'PPQQ故障' }
                { value: 5, name: 'AABB故障' },
                { value: 6, name: 'CCDD故障' },
                { value: 7, name: 'YYXX故障' },
                { value: 8, name: 'XXTT故障' },
                { value: 9, name: 'PPQQ故障' }
              ]
            }
          ]          
      };
      // 图表数据变化配置
      this.chartInstance.setOption(dataOption);
    },
    screenAdapter() {
      this.titleFontSize = (this.$refs.refChart.offsetWidth / 100) * 2;
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: Math.round(this.titleFontSize * 2),
          },
        },
        // 圆点分类标题
        legend: {
          textStyle: {
            fontSize: Math.round(this.titleFontSize * 1.2),
          },
        },
        // xAxis: {
        //   //  改变x轴字体颜色和大小
        //   axisLabel: {
        //     textStyle: {
        //       fontSize: this.titleFontSize,
        //     },
        //   },
        // },
        // yAxis: {
        //   //  改变y轴字体颜色和大小
        //   axisLabel: {
        //     textStyle: {
        //       fontSize: this.titleFontSize,
        //     },
        //   },
        // },
      };
      // 图标自适应变化配置
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
    // 定时器
    getDataTimer(){
      this.koiTimer = setInterval(() => {
        // 执行刷新数据的方法
        this.getData();
        //console.log("Hello World")
      }, 60000 * 10)
    },     
  
  }
}
</script>
<style scoped='scss' scoped>

</style>