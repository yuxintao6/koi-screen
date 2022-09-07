<template>
  <div id="center">
    <!-- 方块显示图 -->
    <div class="square" v-if="isReload">
      <!-- 正常 -->
      <div
        class="bg-color-black item"
        :style="{ height: kHOne + 'px'}"
        v-for="item in titleItem1"
        :key="item.title"
      >
        <p class="colorGold font-bold" :style="{ 'font-size': kFOne + 'px','text-align': 'left','margin-left': kFOne + 'px'}">{{ item.title }}</p>
        <div>
          <dv-digital-flop
            class="dv-dig-flop"
            :style="{'margin-left': kFOne + 'px'}"
            :config="item.number"
          />
        </div>
      </div>

      <!-- 异常 -->
      <div
        class="bg-color-black item"
        :style="{ height: kHOne + 'px'}"
        v-for="item in titleItem2"
        :key="item.title"
      >
        <p class="colorLightsteelblue font-bold" :style="{ 'font-size': kFOne + 'px','text-align': 'left','margin-left': kFOne + 'px'}">{{ item.title }}</p>
        <div>
          <dv-digital-flop
            class="dv-dig-flop"
            :style="{'margin-left': kFOne + 'px'}"
            :config="item.number"
          />
        </div>
      </div>

      <!-- 异常 -->
      <div
        class="bg-color-black item"
        :style="{ height: kHOne + 'px'}"
        v-for="item in titleItem3"
        :key="item.title"
      >
        <p class="colorDeepskyblue font-bold" :style="{ 'font-size': kFOne + 'px','text-align': 'left','margin-left': kFOne + 'px'}">{{ item.title }}</p>
        <div>
          <dv-digital-flop
            class="dv-dig-flop"
            :style="{'margin-left': kFOne + 'px'}"
            :config="item.number"
          />
        </div>
      </div>

      <!-- 其他 -->
      <div
        class="bg-color-black item"
        :style="{ height: kHOne + 'px'}"
        v-for="item in titleItem4"
        :key="item.title"
      >
        <p class="colorLightsalmon font-bold" :style="{ 'font-size': kFOne + 'px','text-align': 'left','margin-left': kFOne + 'px'}">{{ item.title }}</p>
        <div>
          <dv-digital-flop
            class="dv-dig-flop"
            :style="{'margin-left': kFOne + 'px'}"
            :config="item.number"
          />
        </div>
      </div>

     <!-- 储能变流器 -->
      <div
        class="bg-color-black item"
        :style="{ height: kHOne + 'px'}"
        v-for="item in titleItem5"
        :key="item.title"
      >
        <p class="colorHotpink font-bold" :style="{ 'font-size': kFOne + 'px','text-align': 'left','margin-left': kFOne + 'px'}">{{ item.title }}</p>
        <div>
          <dv-digital-flop
            class="dv-dig-flop"
            :style="{'margin-left': kFOne + 'px'}"
            :config="item.number"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { getCurrentData, getCurrentDataByStorage } from "@/api/ems/index"
export default {
  name: "centerBox",
  inject: ['reload'],
  components: {},
  data() {
    return {
      // 获取浏览器可视区域高度（包含滚动条）、 window.innerHeight
      // 获取浏览器可视区域高度（不包含工具栏高度）、document.documentElement.clientHeight
      // 获取body的实际高度  (三个都是相同，兼容性不同的浏览器而设置的) document.body.clientHeight
      screenHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
      screenWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      chartInstance: null,
      allData: [],
      allData2: [],
      koiTimer: null,
      // 局部刷新
      isReload: true,
      kHOne: null,
      kFOne: null,
      // 翻牌器字体大小
      kFTwo: null,
      titleItem1: [
        {
          title: 'PCS模块',
          number: {
            textAlign: 'left',
            style: {
              fontSize: 20
            }
          }
        },
        {
          title: 'DC储能模块',
          number: {
            textAlign: 'left',
            style: {
              fontSize: 20
            }
          }
        },
        {
          title: 'DC光伏模块',
          number: {
            textAlign: 'left',
            style: {
              fontSize: 20
            }
          }
        },
        {
          title: 'DCAC模块故障',
          number: {
            textAlign: 'left',
            style: {
              fontSize: 20
            }
          }
        },
        {
          title: '电池故障',
          number: {
            textAlign: 'left',
            style: {
              fontSize: 20
            }
          }
        },
      ],
      titleItem2:[
         {
          title: '自动模式开机标志',
          number: {
            textAlign: 'left',
            style: {
              fontSize: 20
            }
          }
        },
        {
          title: '系统VS电压',
          number: {
            textAlign: 'left',
            style: {
              fontSize: 20
            }
          }
        },
        {
          title: '母线VDC电压',
          number: {
            textAlign: 'left',
            style: {
              fontSize: 20
            }
          }
        },
        {
          title: '整体通讯',
          number: {
            textAlign: 'left',
            style: {
              fontSize: 20
            }
          }
        },
        {
          title: 'PCS通讯',
          number: {
            textAlign: 'left',
            style: {
              fontSize: 20
            }
          }
        },
      ],
      titleItem3:[
         {
          title: 'DC1通讯',
          number: {
            textAlign: 'left',
            style: {
              fontSize: 20
            }
          }
        },
        {
          title: 'DC2通讯',
          number: {
            textAlign: 'left',
            style: {
              fontSize: 20
            }
          }
        },
        {
          title: '电池通讯',
          number: {
            textAlign: 'left',
            style: {
              fontSize: 20
            }
          }
        },
        {
          title: 'DCAC通讯',
          number: {
            textAlign: 'left',
            style: {
              fontSize: 20
            }
          }
        },
        {
          title: '充电桩通讯',
          number: {
            textAlign: 'left',
            style: {
              fontSize: 20
            }
          }
        },
      ],
      titleItem4:[
         {
          title: '自动模式开机状态',
          number: {
            textAlign: 'left',
            style: {
              fontSize: 22
            }
          }
        },
        {
          title: '当前运行模式',
          number: {
            textAlign: 'left',
            style: {
              fontSize: 12
            }
          }
        },
        {
          title: '自动/手动模式设置',
          number: {
            textAlign: 'left',
            style: {
              fontSize: 18
            }
          }
        },
        {
          title: '开关机设置',
          number: {
            textAlign: 'left',
            style: {
              fontSize: 16
            }
          }
        },
        {
          title: '联络线功率设置',
          number: {
            textAlign: 'left',
            style: {
              fontSize: 24
            }
          }
        },
      ],
      titleItem5:[
         {
          title: '当前开关机状态',
          number: {
            textAlign: 'left',
            style: {
              fontSize: 24
            }
          }
        },
        {
          title: '储能变流器运行模式',
          number: {
            textAlign: 'left',
            style: {
              fontSize: 18
            }
          }
        },
        {
          title: 'IGBT最低温度',
          number: {
            textAlign: 'left',
            style: {
              fontSize: 24
            }
          }
        },
        {
          title: 'IGBT最高温度',
          number: {
            textAlign: 'left',
            style: {
              fontSize: 24
            }
          }
        },
        {
          title: '环境温度',
          number: {
            textAlign: 'left',
            style: {
              fontSize: 24
            }
          }
        },
      ],
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
    this.getStorageData();
    // 定时器
    //this.getDataTimer();
  },
  destroyed() {
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
      this.koiTimer = setInterval(() => {
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
      this.kFTwo = Math.round(this.screenWidth / 100);
      //console.log("宽度->"+this.screenWidth);
    },
    getData() {
      getCurrentData().then(res => {
        //console.log("ALLDATA->",JSON.stringify(res.data))
        this.allData = res.data;
        const textColor = 'tomato';
        const textNormal = '正常';
        //console.log("ALLDATA->",this.allData.apcsFault)
        // 字体颜色 fill: 'tomato'
              
        // PCS模块
        if(this.allData.apcsFault == "正常"){
           this.$set(this.titleItem1[0].number,'content',textNormal)
        }else {
           this.$set(this.titleItem1[0].number,'content',this.allData.apcsFault)
           this.$set(this.titleItem1[0].number.style,'fill',textColor)
        }

        // DC储能模块
        if(this.allData.adcstoreFault == "正常"){
           this.$set(this.titleItem1[1].number,'content',textNormal)
        }else {
           this.$set(this.titleItem1[1].number,'content',this.allData.adcstoreFault)
           this.$set(this.titleItem1[1].number.style,'fill',textColor)
        }

        // DC光伏模块
        if(this.allData.adcpvFault == "正常"){
           this.$set(this.titleItem1[2].number,'content',textNormal)
        }else {
           this.$set(this.titleItem1[2].number,'content',this.allData.adcpvFault)
           this.$set(this.titleItem1[2].number.style,'fill',textColor)
        }
        
        // DCAC模块故障
        if(this.allData.adcacFault == "正常"){
           this.$set(this.titleItem1[3].number,'content',textNormal)
        }else {
           this.$set(this.titleItem1[3].number,'content',this.allData.adcacFault)
           this.$set(this.titleItem1[3].number.style,'fill',textColor)
        }   
        
        // 电池故障
        if(this.allData.abatteryFault == "正常"){
           this.$set(this.titleItem1[4].number,'content',textNormal)
        }else {
           this.$set(this.titleItem1[4].number,'content',this.allData.abatteryFault)
           this.$set(this.titleItem1[4].number.style,'fill',textColor)
        }

        // 自动模式开机
        if(this.allData.automodeonExcep == "正常"){
           this.$set(this.titleItem2[0].number,'content',textNormal)
        }else {
           this.$set(this.titleItem2[0].number,'content',this.allData.automodeonExcep)
           this.$set(this.titleItem2[0].number.style,'fill',textColor)
        }        
        
        // 系统VS电压
        if(this.allData.asysvsvoltExcep == "正常"){
           this.$set(this.titleItem2[1].number,'content',textNormal)
        }else {
           this.$set(this.titleItem2[1].number,'content',this.allData.asysvsvoltExcep)
           this.$set(this.titleItem2[1].number.style,'fill',textColor)
        }      
        
        // 母线VDC电压
        if(this.allData.abusvdcvoltExcep == "正常"){
           this.$set(this.titleItem2[2].number,'content',textNormal)
        }else {
           this.$set(this.titleItem2[2].number,'content',this.allData.abusvdcvoltExcep)
           this.$set(this.titleItem2[2].number.style,'fill',textColor)
        }

        // 整体通讯
        if(this.allData.amasterdevcommuErr == "正常"){
           this.$set(this.titleItem2[3].number,'content',textNormal)
        }else {
           this.$set(this.titleItem2[3].number,'content',this.allData.amasterdevcommuErr)
           this.$set(this.titleItem2[3].number.style,'fill',textColor)
        }
        
        // PCS通讯
        if(this.allData.apcscommuErr == "正常"){
           this.$set(this.titleItem2[4].number,'content',textNormal)
        }else {
           this.$set(this.titleItem2[4].number,'content',this.allData.apcscommuErr)
           this.$set(this.titleItem2[4].number.style,'fill',textColor)
        }       

        // DC1通讯
        if(this.allData.adc1commuErr == "正常"){
           this.$set(this.titleItem3[0].number,'content',textNormal)
        }else {
           this.$set(this.titleItem3[0].number,'content',this.allData.adc1commuErr)
           this.$set(this.titleItem3[0].number.style,'fill',textColor)
        }   

        // DC2通讯
        if(this.allData.adc2commuErr == "正常"){
           this.$set(this.titleItem3[1].number,'content',textNormal)
        }else {
           this.$set(this.titleItem3[1].number,'content',this.allData.adc2commuErr)
           this.$set(this.titleItem3[1].number.style,'fill',textColor)
        }   

        // 电池通讯
        if(this.allData.abatcommuErr == "正常"){
           this.$set(this.titleItem3[2].number,'content',textNormal)
        }else {
           this.$set(this.titleItem3[2].number,'content',this.allData.abatcommuErr)
           this.$set(this.titleItem3[2].number.style,'fill',textColor)
        }      
        
        // DCAC通讯
        if(this.allData.adcaccommuErr == "正常"){
           this.$set(this.titleItem3[3].number,'content',textNormal)
        }else {
           this.$set(this.titleItem3[3].number,'content',this.allData.adcaccommuErr)
           this.$set(this.titleItem3[3].number.style,'fill',textColor)
        }     
        
        // 充电桩通讯
        if(this.allData.achargingpilecommuErr == "正常"){
           this.$set(this.titleItem3[4].number,'content',textNormal)
        }else {
           this.$set(this.titleItem3[4].number,'content',this.allData.achargingpilecommuErr)
           this.$set(this.titleItem3[4].number.style,'fill',textColor)
        }   

        // 自动模式开机
        if(this.allData.aautomodeonStatus == "开机"){
           this.$set(this.titleItem4[0].number,'content',"开机")
        }else {
           this.$set(this.titleItem4[0].number,'content',this.allData.aautomodeonStatus)
           this.$set(this.titleItem4[0].number.style,'fill',textColor)
        }
        
        // 当前运行模式(未知)
        if(this.allData.acurrunmode == "光伏发电"){
           this.$set(this.titleItem4[1].number,'content',"光伏发电")
        }else {
           this.$set(this.titleItem4[1].number,'content',this.allData.acurrunmode)
           this.$set(this.titleItem4[1].number.style,'fill',textColor)
        } 
        
        // 自动/手动模式设置
        if(this.allData.aemsModeSet == "自动开关机模式"){
           this.$set(this.titleItem4[2].number,'content',"自动")
        }else {
           this.$set(this.titleItem4[2].number,'content',this.allData.aemsModeSet)
        } 
        
        // 开关机设置
        if(this.allData.aemsOnoffSet == "自动模式开机"){
           this.$set(this.titleItem4[3].number,'content',"自动模式开机")
        }else {
           this.$set(this.titleItem4[3].number,'content',this.allData.aemsOnoffSet)
           this.$set(this.titleItem4[3].number.style,'fill',textColor)
        } 
        
        // 联络线功率设置(未知)
        if(this.allData.aemsOffconnectgridSet == "0"){
           this.$set(this.titleItem4[4].number,'content', '0kW')
        }else {
           this.$set(this.titleItem4[4].number,'content',this.allData.aemsOffconnectgridSet+"kW")
           this.$set(this.titleItem4[4].number.style,'fill',textColor)
        }
        
      })
      // 获取服务器的数据, 对this.allData进行赋值之后, 调用updateChart方法更新图表
      //console.log("ALLDATA->",JSON.stringify(res.data))
      //console.log("ALLDATA->",JSON.stringify(res.allData))
    },
    getStorageData(){
      getCurrentDataByStorage().then(res => {
        //console.log("ALLDATA->",JSON.stringify(res.data))
        this.allData2 = res.data;
        const textColor = 'tomato';

        // 当前开关机状态
        if(this.allData2.cstacCurdevstatus == "开机"){
           this.$set(this.titleItem5[0].number,'content',"开机")
        }else {
           this.$set(this.titleItem5[0].number,'content',this.allData2.cstacCurdevstatus)
        } 

        // 储能变流器运行模式
        if(this.allData2.cstacCurrunmode == "光伏发电模式"){
           this.$set(this.titleItem5[1].number,'content',"光伏发电模式")
        }else {
           this.$set(this.titleItem5[1].number,'content',this.allData2.cstacCurrunmode)
        } 

        // IGBT最低温度
        this.$set(this.titleItem5[2].number,'content',this.allData2.cstacIgbtLowesttmp+"°C")

        // IGBT最高温度
        this.$set(this.titleItem5[3].number,'content',this.allData2.cstacIgbtHighesttmp+"°C")

        // 环境温度
        this.$set(this.titleItem5[4].number,'content',this.allData2.cstacEnvtmp+'°C')       
        this.config =  {...this.titleItem5};//对象解构，更新props
      })     
    },
    reloadData () {//局部刷新
			this.isReload = false;
			this.$nextTick(() => {
				this.isReload = true
			})
    },
    // 定时器
    getDataTimer(){
      this.koiTimer = setInterval(() => {    
        this.getData();
        this.getStorageData();
        //this.reloadData(); // 需要定时局部刷新页面 
        //console.log("Hello World")
      }, 10000)
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
      width: 19.5%;
      border-radius: 6px;
      margin-top: 4px;  
      .dv-dig-flop {
        width: 70%;
      }
    }
  }
}
</style>
