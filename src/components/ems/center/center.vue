<template>
  <div id="center">
    <!-- 方块显示图 -->
    <div class="square">
      <!-- 正常 -->
      <div
        class="bg-color-black item"
        :style="{ height: kHOne + 'px'}"
        v-for="item in allData.row1"
        :key="item.name"
      >
        <p
          class="colorGold font-bold"
          :style="{ 'font-size': kFOne + 'px','text-align': 'left','margin-left': kFOne + 'px'}"
          v-text="item.name"
        ></p>
        <p
          :style="{ height: kHOne + 'px','font-size': Math.round(kFOne*2) + 'px','text-align': 'left','margin-left': kFOne + 'px','margin-top': Math.round(kFOne/2) + 'px', 'color': colorText1}"
          v-text="item.value"
        ></p>
      </div>

      <!-- 异常 -->
      <div
        class="bg-color-black item"
        :style="{ height: kHOne + 'px'}"
        v-for="item in allData.row2"
        :key="item.name"
      >
        <p
          class="colorLightsteelblue font-bold"
          :style="{ 'font-size': kFOne + 'px','text-align': 'left','margin-left': kFOne + 'px'}"
          v-text="item.name"
        ></p>
        <p
          :style="{ height: kHOne + 'px','font-size': Math.round(kFOne*2) + 'px','text-align': 'left','margin-left': kFOne + 'px','margin-top': Math.round(kFOne/2) + 'px', 'color': colorText2}"
          v-text="item.value"
        ></p>
      </div>

      <!-- 异常 -->
      <div
        class="bg-color-black item"
        :style="{ height: kHOne + 'px'}"
        v-for="item in allData.row3"
        :key="item.name"
      >
        <p
          class="colorDeepskyblue font-bold"
          :style="{ 'font-size': kFOne + 'px','text-align': 'left','margin-left': kFOne + 'px'}"
          v-text="item.name"
        ></p>
        <p
          :style="{ height: kHOne + 'px','font-size': Math.round(kFOne*2) + 'px','text-align': 'left','margin-left': kFOne + 'px','margin-top': Math.round(kFOne/2) + 'px', 'color': colorText3}"
          v-text="item.value"
        ></p>
      </div>

      <!-- 其他 -->
      <div
        class="bg-color-black item"
        :style="{ height: kHOne + 'px'}"
        v-for="item in allData.row4"
        :key="item.name"
      >
        <p
          class="colorLightsalmon font-bold"
          :style="{ 'font-size': kFOne + 'px','text-align': 'left','margin-left': kFOne + 'px'}"
          v-text="item.name"
        ></p>
        <p
          :style="{ height: kHOne + 'px','font-size': Math.round(kFOne*2) + 'px','text-align': 'left','margin-left': kFOne + 'px','margin-top': Math.round(kFOne/2) + 'px', 'color': colorText4}"
          v-text="item.value"
        ></p>
      </div>

      <!-- 储能变流器 -->
      <div
        class="bg-color-black item"
        :style="{ height: kHOne + 'px'}"
        v-for="item in allData2"
        :key="item.name"
      >
        <p
          class="colorHotpink font-bold"
          :style="{ 'font-size': kFOne + 'px','text-align': 'left','margin-left': kFOne + 'px'}"
          v-text="item.name"
        ></p>
        <p
          :style="{ height: kHOne + 'px','font-size': Math.round(kFOne*2) + 'px','text-align': 'left','margin-left': kFOne + 'px','margin-top': Math.round(kFOne/2) + 'px', 'color': colorText5}"
          v-text="item.value"
        ></p>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentData, getCurrentDataByStorage } from "@/api/ems/index";
export default {
  name: "centerBox",
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
      allData: {
        row1: [
          {
            name: "koi1模块",
            value: "正常",
          },
          {
            name: "koi2模块",
            value: "正常",
          },
          {
            name: "koi3模块",
            value: "正常",
          },
          {
            name: "koi4模块",
            value: "正常",
          },
          {
            name: "koi5故障",
            value: "正常",
          },
        ],
        row3: [
          {
            name: "koi6通讯",
            value: "･ᴗ･",
          },
          {
            name: "koi7通讯",
            value: "･ᴗ･",
          },
          {
            name: "koi8通讯",
            value: "･ᴗ･",
          },
          {
            name: "koi9通讯",
            value: "･ᴗ･",
          },
          {
            name: "koi10通讯",
            value: "･ᴗ･",
          },
        ],
        row2: [
          {
            name: "koi11开机",
            value: "･ᴗ･",
          },
          {
            name: "koi12电压",
            value: "･ᴗ･",
          },
          {
            name: "koi13电压",
            value: "･ᴗ･",
          },
          {
            name: "koi14通讯",
            value: "･ᴗ･",
          },
          {
            name: "koi15通讯",
            value: "･ᴗ･",
          },
        ],
        row4: [
          {
            name: "koi16状态",
            value: "关机",
          },
          {
            name: "当前运行模式",
            value: "･ᴗ･",
          },
          {
            name: "自动/手动模式设置",
            value: "手动模式",
          },
          {
            name: "开关机设置",
            value: "自动模式关机",
          },
          {
            name: "联络线功率设置",
            value: "0KW",
          },
        ],
      },
      allData2: [
        {
          name: "当前开关机状态",
          value: "开机",
        },
        {
          name: "储能当前运行模式",
          value: "･ᴗ･",
        },
        {
          name: "IGBT最低温度",
          value: "0°C",
        },
        {
          name: "IGBT最高温度",
          value: "100°C",
        },
        {
          name: "环境温度",
          value: "36°C",
        },
      ],
      koiTime: null,
      koiTimer: null,
      kHOne: null,
      kFOne: null,
      // 颜色
      colorText1: "#33cea0",
      colorText2: "#33cea0",
      colorText3: "#33cea0",
      colorText4: "#33cea0",
      colorText5: "#33cea0",
    };
  },
  created() {},
  beforeMount() {
    this.kHOne = Math.round(this.screenHeight * 0.07);
  },
  mounted() {
    // 页面大小改变时触发
    window.addEventListener("resize", this.getScreenHeight, false);
    // 页面大小改变时触发
    window.addEventListener("resize", this.getScreenWidth, false);
    // 鼠标移动时触发
    //window.addEventListener('mousemove',this.getHeight, false);
    this.resizeScreen();
    this.getData();
    this.getStorageData();
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
    window.removeEventListener("resize", this.getScreenHeight, false);
    // 页面大小改变时触发
    window.removeEventListener("resize", this.getScreenWidth, false);
  },
  methods: {
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
      this.kHOne = Math.round(this.screenHeight * 0.07);
      //console.log("高度->"+this.screenHeight +"-"+ this.kHOne);
    },
    // 字体大小根据宽度自适应
    getScreenWidth() {
      this.screenWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      this.kFOne = Math.round(this.screenWidth / 150);
      //console.log("宽度->"+this.screenWidth);
    },
    getData() {
      // getCurrentData().then((res) => {
      //   //console.log("ALLDATA->",JSON.stringify(res.data))
      //   this.allData = res.data;
      //   // 字体颜色
      //   const abnormalColor = "tomato";
      //   const textNormal = "正常";
      //   //console.log("ALLDATA->",this.allData.row1)
      //   let row1 = res.data.row1;
      //   row1.forEach((item) => {
      //     if (item.value != textNormal) {
      //       this.colorText1 = abnormalColor;
      //     }
      //   });

      //   let row2 = res.data.row2;
      //   row2.forEach((item) => {
      //     if (item.value != textNormal) {
      //       this.colorText2 = abnormalColor;
      //     }
      //   });
      //   let row3 = res.data.row3;
      //   row3.forEach((item) => {
      //     if (item.value != textNormal) {
      //       this.colorText3 = abnormalColor;
      //     }
      //   });
      // });
      // 获取服务器的数据, 对this.allData进行赋值之后, 调用updateChart方法更新图表
      //console.log("ALLDATA->",JSON.stringify(res.data))
      //console.log("ALLDATA->",JSON.stringify(res.allData))
    },
    getStorageData() {
      // getCurrentDataByStorage().then((res) => {
      //   //console.log("ALLDATA->",JSON.stringify(res.data))
      //   this.allData2 = res.data;
      //   // const textColor = 'tomato';
      // });
    },
    // 定时器
    getDataTimer() {
      this.koiTimer = setInterval(() => {
        this.getData();
        this.getStorageData();
        //console.log("Hello World")
      }, 3000);
    },
  },
};
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
      // 控制方块宽度比例
      width: 19.5%;
      border-radius: 6px;
      margin-top: 0.25%;
      margin-bottom: 0.25%;
    }
  }
}
</style>
