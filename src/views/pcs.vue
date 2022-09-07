<!--  -->
<template>
  <div id="index">   
       <!--  DataV-Loading加载动画 -->
       <dv-loading v-if="loading">Loading...</dv-loading>
       <!-- 总体布局-start -->
        <div v-else class="koi-body">
          <!-- 第一部分-头部-start -->
            <div class="header">
              <!-- 首页 -->
              <a class="homePage font-bold colorDeepskyblue" :style="{'font-size': Math.round(this.screenWidth/100) + 'px'}" href="http://www.baidu.com" target="_self">首页</a>
              <!-- 时间 -->
              <div class="localTime colorPink" :style="{'font-size': Math.round(this.screenWidth/100) + 'px'}">{{ dateYear }} {{ dateWeek }} {{ dateDay }}</div>
              <!-- 装饰10 -->
              <dv-decoration-10 class="dv-dec-10-left" />
              <!-- 装饰8 -->
              <dv-decoration-8 class="dv-dec-8-left" :color="decorationColor"/>
              <!-- 标题 -->
              <span class="title font-bold colorLightsteelblue" :style="{'font-size': Math.round(this.screenWidth/100) + 'px'}">PCS可视化平台</span>
              <!-- 装饰8 -->
              <dv-decoration-8 class="dv-dec-8-right" :reverse="true" :color="decorationColor" />
              <!-- 装饰10 -->
              <dv-decoration-10 class="dv-dec-10-right"/>
            </div>
          <!-- 第一部分-头部-end -->

        <!-- Element-UI Layout布局 -->
        <div class="layoutHome">
          <el-row>
            <!-- top1 -->
            <el-col :span="24">
              <div :style="{ height: kHOne + 'px'}">
                <dv-border-box-12 style="padding:12px">
                   <topchart1></topchart1>
                </dv-border-box-12> 
              </div>
            </el-col>
          </el-row>

           <el-row>
            <!-- left1 -->
            <el-col :span="12">
              <div :style="{ height: kHTwo + 'px'}">
                <dv-border-box-12 style="padding:12px">
                  <leftchart1></leftchart1>
                </dv-border-box-12> 
              </div>
            </el-col>
            <!-- right1 -->
            <el-col :span="12">
              <div :style="{ height: kHTwo + 'px'}">
                <dv-border-box-12 style="padding:12px">
                  <rightchart1></rightchart1>
                </dv-border-box-12> 
              </div>
            </el-col>            
          </el-row>

           <el-row>
            <!-- left2 -->
            <el-col :span="12">
              <div :style="{ height: kHTwo + 'px'}">
                <dv-border-box-12 style="padding:12px">
                  <leftchart2></leftchart2>
                </dv-border-box-12> 
              </div>
            </el-col>
            <!-- right2 -->
            <el-col :span="12">
              <div :style="{ height: kHTwo + 'px'}">
                <dv-border-box-12 style="padding:12px">
                  <rightchart2></rightchart2>
                </dv-border-box-12> 
              </div>
            </el-col>            
          </el-row>              
        </div>
          <!-- 总体布局end -->
        </div>
   </div>
</template>

<script>
import { formatTime } from '../utils/index.js'
import topchart1 from "../components/pcs/top/chart1.vue";
import leftchart1 from "../components/pcs/left/chart1.vue";
import leftchart2 from "../components/pcs/left/chart2.vue";
import rightchart1 from "../components/pcs/right/chart1.vue";
import rightchart2 from "../components/pcs/right/chart2.vue";
export default {
  name: 'index',
  components: {
    topchart1,
    leftchart1,
    leftchart2,
    rightchart1,
    rightchart2
  },
  data () {
  return {
    loading: true,
    // 装饰8颜色
    decorationColor: ['#568aea', '#000000'],
    timer: null,
    koiTime: null,
    dateDay: null,
    dateYear: null,
    dateWeek: null,
    weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    // 获取浏览器可视区域高度（包含滚动条）、
    // 获取浏览器可视区域高度（不包含工具栏高度）、
    // 获取body的实际高度  (三个都是相同，兼容性不同的浏览器而设置的)
    screenHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    screenWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    kHOne: 300,
    kHTwo: 500
  }
  },
  created () {

  },
  mounted(){
    // 页面大小改变时触发
    window.addEventListener('resize',this.getScreenHeight, false);
    // 页面大小改变时触发
    window.addEventListener('resize',this.getScreenWidth, false);
    // 鼠标移动时触发
    //window.addEventListener('mousemove',this.getHeight, false);
    this.timeInterval();
    this.cancelLoading();
    this.resizeScreen();
  },
  beforeDestroy () {
    clearInterval(this.timer)
    clearInterval(this.koiTime);
    // 页面大小改变时触发
    window.removeEventListener('resize',this.getScreenHeight, false);
    // 页面大小改变时触发
    window.removeEventListener('resize',this.getScreenWidth, false);
  },
  watch: {
      screenWidth: function (news, old) {
          if (news <= 1200) {
            this.$notify({
              title: '浏览器高度提示',
              dangerouslyUseHTMLString: true,
              message: '<strong style= "color: teal">浏览器宽度<1200px将不再进行自适应</strong>',
              type: 'warning',
              position: 'bottom-right',
              duration: 2000
            });
          }
      },
      screenHeight: function (news, old) {
          if (news <= 700) {
            this.$notify({
              title: '浏览器宽度提示',
              dangerouslyUseHTMLString: true,
              message: '<strong style= "color: teal">浏览器高度<700px将不再进行自适应</strong>',
              type: 'warning',
              position: 'bottom-right',
              duration: 2000
            });
          } 
      }
  },
  methods: {
    timeInterval() {
      this.timer = setInterval(() => {
        this.dateDay = formatTime(new Date(), 'HH: mm: ss')
        this.dateYear = formatTime(new Date(), 'yyyy/MM/dd')
        this.dateWeek = this.weekday[new Date().getDay()]
      }, 1000)
    },
    cancelLoading() {
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
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
        this.kHOne = Math.round(this.screenHeight * 0.18);
        this.kHTwo = Math.round(this.screenHeight * 0.38);
        //console.log(this.screenHeight +"-"+ Math.round(this.percentHThirty) +"-"+ Math.round(this.percentHForty));
    },
    // 字体大小根据宽度自适应
    getScreenWidth(){
      this.screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      //console.log("hh-"+this.screenWidth+"-"+this.screenHeight);
    }

  }
}
</script>

<style lang="less" scoped>
</style>
