<template lang="html">
    <transition name="slide">
    <div v-if="isShow" class="calendarWrap">
      <jt-header 
          :title="headerName"
          :InvokedByComponent='true'
          :fixed='true'
          v-if="!isNative"
      >
          <div slot="left" @click="hide" class="headerBack"></div>
          <div slot="right" v-if="orgDst=='dst'" @click="clearDstDate">
            <div class="clearDstDate">
              清除返程
            </div>
          </div>
      </jt-header>

    <!-- 日历控件主体 -->
    <div class="weeks is-fixed">
      <ul class="is-fixed">
        <li v-for="item in week">
          <div class="week-zh">{{item.zh}}</div>
        </li>
      </ul>
    </div>

    <!-- 日历主体部分生成 -->
    <div class="monthWrap">
      <div class="monthItemwrap" v-for="item in monthDetail">
        <div class="monthItemHead">
          {{item.detailTop}}
        </div>
        <div class="monthTable" :style="{height:(item.detailStr.length/7)*1.6+'rem'}">
          <ul>
              <li v-for="(childItem,index) in item.detailStr" 
                    :style="{background:
                      (

                        childItem.timeStamp>=GS_FlightQuery.orgTimestamp?
                          (
                            childItem.timeStamp<=GS_FlightQuery.dstTimestamp?'#f2f2f2':''
                          ):''
                      )}"
                    :data-dateStr="childItem.dateStr" 
                    :data-timeStamp="childItem.timeStamp"
                    @click="setDate(childItem.dateStr,childItem.timeStamp)" 
                    :class="[isDateShow==false?'canBeSelected':(todayTimeStamp>childItem.timeStamp ? 'disabled' : 'canBeSelected'), 'childItem']"
                    
                  >
                        <div class="dateItem">
                          {{childItem.val}}
                        
                          <!-- {{childItem.timeStamp }} -->
                        </div>
                        <div class="lunarDay" v-if="isDateShow==true">
                          {{childItem.lunarDay}}
                        </div>
                        <div class="lowPrice" v-if="islowPrice==true">
                          {{childItem.lowPrice}}
                        </div>
                        <div class="sign" v-if="dateArr.indexOf(childItem.timeStamp)!=-1">
                           <!-- {{dateArr.indexOf(childItem.timeStamp)}} -->
                          <!-- {{childItem.timeStamp}} -->
                           <!-- {{this.aa=dateArr[0]==childItem.timeStamp?'对':'不'}} -->
                        </div>
                        
                    <!--
                      <p v-if="todayTimeStamp==childItem.timeStamp" class="today">
                          <span class="dateItem" @click="setDay(childItem.dateStr)">今</span>
                      </p>
                      <p v-else class="dateItem">
                        <span class="dateItem" @click="setDay(childItem.dateStr)">{{childItem.val}}</span>
                      </p>
                    -->
              </li>
          </ul>
        </div>
      </div>
    </div>
</div>
</transition>
</template>

<script>
import store from 'store';
import { mapGetters } from 'vuex';
import Headers from 'components/Header';
import ZHD from './CNCalendar.js';

var lunar = new ZHD();

export default {
    name:'jetair-calendar',
    props: {
        isDateShow:{
          type:Boolean,
          default:true
        },
        isSign:{
          type:Boolean,
          default:false
        },
        islowPrice:{
          type:Boolean,
          default:true
        },
        isShow: {
            type: Boolean,
            default: false,
            required: false
        },
        isNative: {
            type:Boolean,
            default: false
        },
        orgDst:{
            type: String,
            default: 'org',
        },
        headerName: {
            type:String,
            default:'出发日期',
        },
        tripType: {
            type:String,
            default:'',
        },
        index: {
            type:Number,
            default:0,               
        },
        dateGroup:{
          type:Object,
        },
            /**
                * call bacßk when click cancel button
                */
        close: {
          type: Function
        }
    },
    data() {
        return {
          aa:'',
        pageName:'',
        toPath:'',
        setType:'',
        config:{
            display:12, //显示几个月
        },
        orgDate:'',
        dstDate:'',
        dateArr:[],
        week:[
            {zh:'周日',en:'SUN'},
            {zh:'周一',en:'MON'},
            {zh:'周二',en:'TUE'},
            {zh:'周三',en:'WED'},
            {zh:'周四',en:'THU'},
            {zh:'周五',en:'FRI'},
            {zh:'周六',en:'SAT'}
        ],
        monthDetail:'',
        todayTimeStamp:''
        };
    },
  
  created:function(){
    //获取今天的时间戳
    this.$data.todayTimeStamp = this.getTodayTimeStamp();
    // console.log(this.$data.todayTimeStamp )
    // 初始化日历
    this.init();
    
    console.log(this.dateArr)
  
  },
  updated(){
        this.eachDate()
  },
  // computed: mapGetters({
  //     GS_FlightQuery:'gs_book_FlightQuery',
     
  // }),
  
  computed:{
     ...mapGetters({
              GS_FlightQuery:'gs_book_FlightQuery',
    }),
    // watchClass(){
    //   if(todayTimeStamp>childItem.timeStamp){
    //     return 'disabled'
    //   }else{
    //     return 'canBeSelected'
    //   }
    // }
    
  },
  ready() {},
  attached() {},
  methods: {
      // 遍历日期数组
      eachDate(){
        // this.dateArr = this.dateGroup
        for(var i =0 ;i<=this.dateGroup.length;i++){
          if(this.dateArr.length<this.dateGroup.length){
            this.dateArr.push(Date.parse(this.dateGroup[i].dateTime)/1000)
            console.log(this.dateArr)
          }else{
            // console.log(this.dateArr)
            return false
          }
          
          
        }
      },
    
      /**
        * 隐藏Calendar
      */
      hide(){
        this.close && this.close();
        if(document) document.getElementsByTagName('body')[0].scrollTop = 0;
      },

      //清除返程日期
      clearDstDate(){
        store.dispatch('setDstDate',{date:'',timeStamp:''});
        this.hide();
      },

      /***
        * 选择并设置日期，存储所选日期的时间戳和yy-mm-dd
      */
      setDate(d,t){
        //校验是否可选
        if(this.todayTimeStamp>t) return;
        //签到默认不可选
        if(this.isDateShow==false) return;
        let dateArr = d.split('-');
        let dateStr = (dateArr[1].length<2 ? ('0'+ dateArr[1]) : dateArr[1])+'月'+(dateArr[2].length<2 ? ('0'+ dateArr[2]) : dateArr[2])+'日';

        //校验是否是原生调用
        if(this.isNative){
            this.$bridge.callHandler('setMessage',{
                type:'calendar',
                date:dateStr,
                dateStr:d
            },(res)=>{
                this.$Toast({
                    content: res,
                    duration:5000
                });
            })
          return;
        }

        // 首先判断当前是否为多程，多程的日期存储与往返和单程不同
        if(this.tripType=='MT'){
            store.dispatch('setMTDate',{date:dateStr,timeStamp:t,index:this.index});
        }else{
            //当前选择的类型为单程或者往返
            if(this.orgDst=='org'){
                store.dispatch('setOrgDate',{date:dateStr,timeStamp:t});
                this.orgDate = t
                // console.log(orgDate)
            }else{
                this.dstDate = t;
                if(this.dstDate<this.orgDate){
                  this.$Toast({
                      content: '返程日期不能小于去程日期',
                      duration:1000
                  });
                  return false
                }else{
                  store.dispatch('setDstDate',{date:dateStr,timeStamp:t});
                }
                console.log(this.orgDate)
                console.log(this.dstDate)          
            }
        }
        this.hide();
      },

      /***
      * Calendar初始化
      */

      // var month = d.getMonth() + 1;
      // month = month < 10 ? ("0" + month) : month;
      // var dt = d.getDate();
      // dt = dt < 10 ? ("0" + dt) : dt;
      init(){
          //获取当前日期
          let currentDate = new Date().toLocaleString().substr(0,10),
              //获取当前年
              currentYear = new Date().getFullYear(),
              //获取当前月
              currentMonth = new Date().getMonth()+1,
              //获取当前日
              currentDay = new Date().getDate();
             

          //生成数组year,month用于判断某月有多少天
          let monthCount = this.$data.config.display;
          let monthStr = [];
          // currentMonth = currentMonth < 10?("0"+currentMonth):currentMonth;
          // currentDay = currentDay<10?("0"+currentDay):currentDay;
          for(let i=0;i<monthCount;i++){
            let obj = {};
            if((currentMonth+i)>=13){
              obj.year = Math.floor(currentYear+(currentMonth+i)/12);
              obj.month = (currentMonth+i)%12;
              // console.log(obj.month)
            }else{
              obj.year = currentYear;
              obj.month = currentMonth+i;
              //月份添加为2位数
              obj.month = obj.month < 10?("0"+obj.month):obj.month;
              // console.log(obj.month)
            }
            monthStr.push(obj);
            // console.log(monthStr)
          }
          // console.log(monthStr);
          this.createCalendar(monthStr);
      },

      /**
      * 根据要显示的年份和月份，
      * 拼接所有月精确到日的可遍历的字符串
      **/
      createCalendar(monthStr){
          //定义
          let detailStr = [];

          //循环要显示的几个月的每一个月，默认第一个月是当月
          for(let i=0;i<monthStr.length;i++){
            let obj = {};
            obj.detailTop = monthStr[i].year+"/"+monthStr[i].month+"月";
            obj.detailStr = [];
            //首先判断每个月有多少天，需要传入year,month
            let getMonthNum = this.getDaysOfMonth(monthStr[i].year,monthStr[i].month-1);
            let startDaysNum = this.getWeekForDay(monthStr[i].year+"-"+(monthStr[i].month)+"-"+"1");
            let endDaysNum = Math.ceil((getMonthNum+startDaysNum)/7)*7-(getMonthNum+startDaysNum);
            for(let m=0;m<startDaysNum;m++){
              let childObj = {};
              childObj.val = ' ';
              obj.detailStr.push(childObj);
              
            };
            for(let n=1;n<=getMonthNum;n++){
              let childObj = {};
              n = n<10?("0"+n):n;
              childObj.val = n;
              // console.log(n)
              // childObj.val = childObj.val<10?("0"+childObj.val):childObj.val;
              childObj.timeStamp = Date.parse(new Date(monthStr[i].year+"-"+monthStr[i].month+"-"+n))/1000;
              
              childObj.dateStr = monthStr[i].year+"-"+monthStr[i].month+"-"+n;
              // console.log(childObj.timeStamp)
              childObj.lowPrice = '￥1388';
              childObj.lunarDay = lunar.GetLunarDay(monthStr[i].year,monthStr[i].month,n);
              obj.detailStr.push(childObj);
              
              
              // console.log(childObj.val)
            };
            for(let q=0;q<endDaysNum;q++){
              let childObj = {};
              childObj.val = ' ';
              obj.detailStr.push(childObj);
            };
            detailStr.push(obj);
          }
          this.$data.monthDetail = detailStr;
          // console.log(this.$data.monthDetail);
      },

      //判断是否为闰年
      isLeap(year) {
        var res;return (year%100==0?res=(year%400==0?1:0):res=(year%4==0?1:0));
      },

      //获取每月有多少天，并拼接为一个数组
      getDaysOfMonth(year,mon){
        var m_days=new Array(31,28+this.isLeap(year),31,30,31,30,31,31,30,31,30,31);
        return m_days[mon];
      },

      //计算处理月第一天是星期几
      getWeekForDay(day){
        return new Date(day).getDay();
      },

      //获得每个月需要的行数
      getLineNum(){
        return Math.ceil(getMonthDays(year,mon)+getWeekForDay(day))/7;
      },

      //获取今天的时间戳
      getTodayTimeStamp(){
        var nowMonth = new Date().getMonth()+1;
            nowMonth = nowMonth < 10?("0"+nowMonth):nowMonth;
        var nowDate = new Date().getDate();
            nowDate = nowDate < 10?("0"+nowDate):nowDate;
        // var getTodayDate = new Date().getFullYear()+'/'+(new Date().getMonth()+1)+"/"+new Date().getDate();
        var getTodayDate = new Date().getFullYear()+'-'+nowMonth+"-"+nowDate;
        console.log(getTodayDate)
        return Date.parse(new Date(getTodayDate))/1000;
      },

      //设置日期
      setDay(day){
        this.$emit('resive',{'day':day,'isShow':false});
      }
  },
  components: {
    [Headers.name]:Headers,
  }
};
</script>

<style lang="scss" scoped>
.sign{
  width: .586667rem;
  height: .586667rem;
  position: absolute;
  left: .4rem;
  top: .6rem;
  background:url('../../../../assets/images/base/sign.png') no-repeat left center;
  background-size: .586667rem;
}
.headerBack{
    width:1.16rem;
    height:1.16rem;
    background:url('../../../../assets/images/base/backBlack.png') no-repeat left center;
    background-size:.333333rem;
}
.clearDstDate{
  height:.6rem;
  line-height:.6rem;
  @include font-dpr(14px);
  padding:.1rem .2rem;
  border-radius:8px;
  color:#505050;
  border:1px solid #505050;
}
::-webkit-scrollbar{
    display: none;
}
.calendarWrap{
  -webkit-transition: all .2s ease-out;
  transition: all .2s ease-out;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999999999;
  font-size: .373333rem;
  color: #333;
  -webkit-overflow-scrolling: touch;
  box-shadow: 0 .01rem .06rem rgba(0, 0, 0, .2);
}
.weeks,.weeks ul{
  width: 10rem;
  height:.8rem;
  background-color: #FFF;
  color: #FFF;
}
.weeks ul li{
  list-style-type: none;
  width: 14.2%;
  height: .8rem;
  float: left;
  color:#00acd7;
}
.week-zh,.week-en{
  width: 100%;
  height: .8rem;
  line-height: .8rem;
  float: left;
  text-align: center;
  @include font-dpr(16px);
}
.monthWrap{
  width:10rem;
  height: calc(100% - 1.96rem);
  overflow-y: scroll;
}
.monthItemwrap{
  background:#FFF;
}
.monthItemHead{
  clear: both;
  width: 10rem;
  height:1.2rem;
  line-height: 1.2rem;
  text-align: center;
  background-color: #FFF;
  color: #000;
  @include font-dpr(18px);
}
.monthTable{
  width: 10rem;
  height: auto;
}
.monthTable ul li{
  display: block;
  width: 14.2%;
  height:1.2rem;
  float: left;
  text-align: center;
  line-height: 1.2rem;
  margin-bottom:.4rem;
  background: #FFF;
  position: relative;
}
.canBeSelected{
  color: #00acd7;
}
.disabled{
  color:#c9c9c9;
}
.today{
  display: block;
  width: .6rem;
  height:.6rem;
  border-radius: 45px;
  margin: 0 auto;
  margin-top: 5px;
  text-align: center;
  line-height: .6rem;
}
.dateItem,.lunarDay{
  display: block;
  width: 40%;
  height: 50%;
  float:left;
  line-height: .6rem;
  @include font-dpr(13px);
}
.lunarDay{
  width: 60%;
  @include font-dpr(12px);
  color:#999;
}
.lowPrice{
  display: block;
  width: 100%;
  height: 50%;
  float:left;
  color:#666666;
  line-height: .6rem;
  @include font-dpr(12px);  
}
.slide-enter, .slide-leave-active{
    transform: translateY(100%)!important;
}
.fade-enter, .fade-leave-active{
    opacity: 0;
}
</style>
