<template>
      <div>
        <div>
          <!-- <span class="colorDeepskyblue" style="position: absolute; left: 10px;font-size: 10px;">时间：2022/07/01-2022/07/31</span>           -->
          <div class="colorGrass font-bold" :style="{'font-size': kFOne + 'px'}">🌈手游上线次数排行榜</div>
        </div>
      <div>
        <dv-capsule-chart :config="config" :style="{ width: kWOne + 'px',height: kHOne + 'px'}" />
      </div>
    </div>
</template>

<script>
import { getSignData } from "../../../api/ems/index";
export default { 
  data() {
    return {
    // 获取浏览器可视区域高度（包含滚动条）、 window.innerHeight
    // 获取浏览器可视区域高度（不包含工具栏高度）、document.documentElement.clientHeight
    // 获取body的实际高度  (三个都是相同，兼容性不同的浏览器而设置的) document.body.clientHeight
    screenHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    screenWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    chartInstance: null,
    allData: [],
    // 高度
    kHOne: null,
    // 宽度
    kWOne: null,
    // 标题字体
    kFOne: null,
    // 定时器监控
    koiTime: null,
    // 局部刷新定时器 
    koiTimer: null,    
    config: {
      showValue: true,
      unit: "次",
      data: [
        {
          name: '王者荣耀',
          value: 32
        },
        {
          name: '和平精英',
          value: 30
        },
        {
          name: 'QQ飞车',
          value: 28
        },
        {
          name: '植物VS僵尸',
          value: 26
        },
        {
          name: '天天酷跑',
          value: 24
        },
        {
          name: '崩坏3',
          value: 22
        },
        {
          name: '我的世界',
          value: 20
        },
        {
          name: '第三人格',
          value: 18
        },
        {
          name: '穿越火线',
          value: 16
        },
        {
          name: '逆战',
          value: 14
        }
      ]
    }
   }
 },
  beforeMount(){
    this.kWOne = Math.round(this.screenWidth * 0.23)
    this.kHOne = Math.round(this.screenHeight * 0.42)
    this.kFOne = Math.round(this.screenWidth / 120)
  },  
  mounted(){
    // 页面大小改变时触发
    window.addEventListener('resize',this.getScreenHeight, false);
    // 页面大小改变时触发
    window.addEventListener('resize',this.getScreenWidth, false);
    // 鼠标移动时触发
    //window.addEventListener('mousemove',this.getHeight, false);
    this.resizeScreen();
    // 获取后端接口数据
    this.getData();
    // 执行数据局部刷新定时器
    //this.getDataTimer();
  },
  destroyed() {
    // 清除自适应定时器
    clearInterval(this.koiTime);
    this.koiTime = null;
    // 清除局部刷新定时器
    clearInterval(this.koiTimer);
    this.koiTimer = null; 
    // 页面大小改变时触发销毁
    window.removeEventListener('resize',this.getScreenHeight, false);
    // 页面大小改变时触发销毁
    window.removeEventListener('resize',this.getScreenWidth, false);
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
        this.kHOne = Math.round(this.screenHeight * 0.42);
        //console.log("高度->"+this.screenHeight +"-"+ this.kHOne);
    },
    // 字体大小根据宽度自适应
    getScreenWidth(){
      this.screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      this.kWOne = Math.round(this.screenWidth * 0.23);
      this.kFOne = Math.round(this.screenWidth / 120);
      //console.log("宽度->"+this.screenWidth);
    },
    getData() {
      // getSignData().then(res => {
      //   //console.log("ALLDATA->",JSON.stringify(res.data)) 
      //   const { config } = this;
      //   // 将数据赋值给DataV的胶囊柱图
      //   this.config.data = res.data;
      //   this.config = { ...this.config }
      // })
      // 获取服务器的数据, 对this.allData进行赋值之后, 调用updateChart方法更新图表
      //console.log("ALLDATA->",JSON.stringify(res.data))
      //console.log("ALLDATA->",JSON.stringify(this.allData))
    }, 
    // 定时器
    getDataTimer(){
      this.koiTimer = setInterval(() => {    
        // 执行刷新数据的方法
        this.getData();
        // console.log("Hello World")
      }, 60000 * 10)
    },          
  },
}
</script>

<style lang="less" scoped>

</style>
