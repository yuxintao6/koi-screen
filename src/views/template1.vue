<!-- 初始化代码模板页面 -->
<template>      
    <div ref="refChart" :style="{ height: kHOne + 'px'}"></div>
</template>

<script>
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
    allData: [],
    // 浏览器高度
    kHOne: null,
    // 浏览器宽度
    kWOne: null,
    // 浏览器字体大小
    kFOne: null,
    // 自适应浏览器获取宽高大小定时器
    koiTime: null 
  }
  },
  created () {},
  beforeMount(){
    this.kHOne = Math.round(this.screenHeight * 0.3)
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
    // 获取接口数据
    this.getData();
    // 局部刷新定时器
    //this.getDataTimer();    
  },
  beforeDestroy () {

  },
  destroyed() {
    // 清除自适应屏幕定时器
    clearInterval(this.koiTime);
    this.koiTime = null;
    // 页面大小改变时触发销毁
    window.removeEventListener('resize',this.getScreenHeight, false);
    // 页面大小改变时触发销毁
    window.removeEventListener('resize',this.getScreenWidth, false);
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
        this.kHOne = Math.round(this.screenHeight * 0.3);
        //console.log("高度->"+this.screenHeight +"-"+ this.kHOne);
    },
    // 字体大小根据宽度自适应
    getScreenWidth(){
      this.screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      // 浏览器字体计算
      this.kFOne = Math.round(this.screenWidth / 100);
      // 浏览器宽度宽度
      this.kWOne = this.screenWidth;      
      //console.log("宽度->"+this.screenWidth);
    },
    getData() {
      // 调用接口方法
      // getModuleData().then(res => {
      //       this.allData = res.data;
      //       //console.log("ALLDATA->"+JSON.stringify(this.allData.pcsSum));
      //       // echarts查不到数据，将初始化echarts的方法全部放置到接口方法中即可。  
      // })  
      // 获取服务器的数据, 对this.allData进行赋值之后, 调用updateChart方法更新图表
      //console.log("ALLDATA->",JSON.stringify(res.data))
      //console.log("ALLDATA->",JSON.stringify(this.allData))
      //this.updateChart();
      // 向data数据中set值
      // if(this.allData.apcsFault == "正常"){
      //     this.$set(this.titleItem1[0].number,'content',textNormal)
      // }else {
      //     this.$set(this.titleItem1[0].number,'content',this.allData.apcsFault)
      //     this.$set(this.titleItem1[0].number.style,'fill',textColor)
      // }
    },
    // 定时器
    getDataTimer(){
      this.koiTimer = setInterval(() => {
        // 执行刷新数据的方法
        this.getData();
        //console.log("Hello World")
      }, 3000)
    },  
  }
}
</script>
<style lang='less' scoped>

</style>