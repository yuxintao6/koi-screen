<template>
  <div id="center">
    <!-- 方块显示图 margin-top: 3px;-->
    <div class="square">
      <!-- 第一行  -->
      <div
        class="bg-color-black item"
        :style="{ height: kHOne + 'px','margin-top': Math.round(kFOne/4) + 'px'}"
        v-for="item in allData.row1"
        :key="item.name"
      >
        <p class="colorDarkturquoise font-bold" :style="{ 'font-size': kFOne + 'px','text-align': 'left','margin-left': kFOne + 'px'}" v-text="item.name"></p>
        <p :style="{ height: Math.round(kFOne/1.5) + 'px'}"></p>
        <p :style="{ height: kHOne + 'px','font-size': Math.round(kFOne*1.8) + 'px','text-align': 'left','margin-left': kFOne + 'px','margin-top': Math.round(kFOne/2) + 'px', 'color': colorText1}" v-text="item.value"></p>
      </div>

      <!-- 第二行 -->
      <div
        class="bg-color-black item"
        :style="{ height: kHOne + 'px','margin-top': Math.round(kFOne/2) + 'px','margin-bottom': Math.round(kFOne/2) + 'px'}"
        v-for="item in allData.row2"
        :key="item.name"
      >
        <p class="colorLightsalmon font-bold" :style="{ 'font-size': kFOne + 'px','text-align': 'left','margin-left': kFOne + 'px'}" v-text="item.name"></p>
        <p :style="{ height: Math.round(kFOne/1.5) + 'px'}"></p>
        <p :style="{ height: kHOne + 'px','font-size': Math.round(kFOne*1.8) + 'px','text-align': 'left','margin-left': kFOne + 'px','margin-top': Math.round(kFOne/2) + 'px', 'color': colorText2}" v-text="item.value"></p>
      </div>          
    </div>
  </div>
</template>

<script>
//import { getCurrentData, getCurrentDataByStorage } from "@/api/ems/index"
export default {
  name: "centerBox",
  components: {},
  data() {
    return {
      // 获取浏览器可视区域高度（包含滚动条）、 window.innerHeight
      // 获取浏览器可视区域高度（不包含工具栏高度）、document.documentElement.clientHeight
      // 获取body的实际高度  (三个都是相同，兼容性不同的浏览器而设置的) document.body.clientHeight
      screenHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
      screenWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      chartInstance: null,
      koiTime: null,
      koiTimer: null,
      kHOne: null,
      kFOne: null,
      // 颜色
      colorText1: '#33cea0',
      colorText2: '#33cea0',
      allData: {
        row1: [
          {
            name: "电网频率",
            value: "120.15/Hz"
          },
          {
            name: "电网总有功功率",
            value: "18/kW"
          },
          {
            name: "电网总无功功率",
            value: "2/kVar"
          },
          {
            name: "电网总视在功率",
            value: "14/kVA"
          },
          {
            name: "负载频率",
            value: "106.15/Hz"
          },
          {
            name: "负载总有功功率",
            value: "100.5/kW"
          },
          {
            name: "负载总无功功率",
            value: "120/kVar"
          },
          {
            name: "负载总视在功率",
            value: "18/kVA"
          },
          {
            name: "输出频率",
            value: "2.25/Hz"
          },
          {
            name: "输出总有功功率",
            value: "140.5/kW"
          },
          {
            name: "输出总无功功率",
            value: "106.5/kVar"
          },                      
        ],
        row2: [
          {
            name: "输出总视在功率",
            value: "120.5/kVA"
          },
          {
            name: "直流侧总母线电压",
            value: "18/V"
          },
          {
            name: "直流上母线电压",
            value: "･ᴗ･/V"
          },
          {
            name: "直流下母线电压",
            value: "･ᴗ･/V"
          },
          {
            name: "直流侧电流",
            value: "106/A"
          },
          {
            name: "直流侧功率",
            value: "100/kW"
          },
          {
            name: "IGBT最低温度",
            value: "12°C"
          },
          {
            name: "IGBT最高温度",
            value: "36°C"
          },
          {
            name: "环境温度",
            value: "36°C"
          },
          {
            name: "PCS状态1",
            value: "电网电压欠压"
          },
          {
            name: "PCS状态2",
            value: "过温故障"
          },                             
        ], 
      },                  
    }
  },
  created () {},
  beforeMount(){
    this.kHOne = Math.round(this.screenHeight * 0.07)
  },
  mounted(){
    // 页面大小改变时触发
    window.addEventListener('resize',this.getScreenHeight, false);
    // 页面大小改变时触发
    window.addEventListener('resize',this.getScreenWidth, false);
    // 鼠标移动时触发
    //window.addEventListener('mousemove',this.getHeight, false);
    this.resizeScreen();
    this.getData();
    // 定时器
    //this.getDataTimer();
  },
  destroyed() {
    // 清除多次执行定时器
    clearInterval(this.koiTime);
    this.koiTime = null;
    // 清除多次执行定时器
    clearInterval(this.koiTimer);
    this.koiTimer = null;    
    // 页面大小改变时触发
    window.removeEventListener('resize',this.getScreenHeight, false);
    // 页面大小改变时触发
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
        this.kHOne = Math.round(this.screenHeight * 0.07);
        //console.log("高度->"+this.screenHeight +"-"+ this.kHOne);
    },
    // 字体大小根据宽度自适应
    getScreenWidth(){
      this.screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      this.kFOne = Math.round(this.screenWidth / 150);
      //console.log("宽度->"+this.screenWidth);
    },
    getData() {
      //console.log("ALLDATA->"+JSON.stringify(this.allData.row1));
      // getCurrentData().then(res => {
      //   //console.log("ALLDATA->",JSON.stringify(res.data))
      //   this.allData = res.data;
      //   // 字体颜色
      //   const abnormalColor = 'tomato';
      //   const textNormal = '正常';
      //   //console.log("ALLDATA->",this.allData.row1)
      //   let row1 = res.data.row1;
      //   row1.forEach(item => {
      //     if(item.value != textNormal){
      //         this.colorText1 = abnormalColor;
      //     } 
      //   });

      //   let row2 = res.data.row2;
      //   row2.forEach(item => {
      //     if(item.value != textNormal){
      //         this.colorText2 = abnormalColor;
      //     } 
      //   });
      //   let row3 = res.data.row3;
      //   row3.forEach(item => {
      //     if(item.value != textNormal){
      //         this.colorText3 = abnormalColor;
      //     } 
      //   });          
      // })
      // 获取服务器的数据, 对this.allData进行赋值之后, 调用updateChart方法更新图表
      //console.log("ALLDATA->",JSON.stringify(res.data))
      //console.log("ALLDATA->",JSON.stringify(res.allData))
    },
    // 定时器
    getDataTimer(){
      this.koiTimer = setInterval(() => {    
        this.getData();
        this.getStorageData();
        //console.log("Hello World")
      }, 3000)
    },    
  }
}

</script>

<style lang="less" scoped>
#center {
  display: flex;
  flex-direction: column;
  .square {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item {
      width: 9%;
      border-radius: 6px;
    }
  }
}
</style>
