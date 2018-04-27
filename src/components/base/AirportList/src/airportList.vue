<template>
	<transition name="slide">
    <div class="jetair-widget-citys animated" v-if="isShow">
        <!--  头部信息 -->
        <jt-header
            :title="headerName"
            :InvokedByComponent="true"
            :fixed="true"
            v-if="!isNative"
        >
            <div slot="left" @click="hide" class="headerBack"></div>
        </jt-header>
        <div 
            class="jetair-widget-citys-content" 
        >
            <!--  搜索框 -->
            <div class="jetair-widget-citys-header bdb">
                <div class="jetair-widget-citys-iptbox">
                    <input type="text" placeholder="城市中文名或拼音" v-model="input">
                    <div class="searchIcon"></div>
                </div>
            </div>
            <!--  选项卡 -->
            <div class="jetair-widget-citys-tabItemWrap ">
                <div :class="tabCur=='domestic'?'jetair-widget-citys-tabItem tabCur':'jetair-widget-citys-tabItem'"
                    @click="bindClickTab('domestic')"
                    style="border-top-left-radius:15px;border-bottom-left-radius:15px;">
                    国内城市
                </div>
                <div :class="tabCur=='international'?'jetair-widget-citys-tabItem tabCur':'jetair-widget-citys-tabItem'"
                    @click="bindClickTab('international')"
                    style="border-left:0px solid #CCC;border-right:0px solid #CCC;">
                    国际/港澳台
                </div>
                <div :class="tabCur=='area'?'jetair-widget-citys-tabItem tabCur':'jetair-widget-citys-tabItem'"
                    @click="bindClickTab('area')"
                    style="border-top-right-radius:15px;border-bottom-right-radius:15px;">
                    城市区域
                </div>
            </div>
            <!--  热门城市 -->
            <div class="jetair-widget-airport-citys" v-if="input == ''">
                <div class="star-citys-header">热门城市</div>
                <div class="star-citys-item-wrap">
                    <div class="star-citys-item" v-for="item in (curCityData.hotAirports || curCityData.hotAreas)"  @click="_chooseOne(item)">
                        {{item.name}}
                    </div>
                </div>
            </div>
            <!--  城市列表 -->
            <div class="jetair-widget-airport-citys" v-if="input == '' && item.length>0" v-for="(item,index) in (curCityData.airports || curCityData.areas)">
                <div class="star-citys-header">{{index.toUpperCase()}}</div>
                <div class="star-citys-item-wrap">
                    <div class="star-citys-item" v-for="airport in item"  @click="_chooseOne(airport)">
                        {{airport.name}}
                    </div>
                </div>
            </div>
            <!--  搜索信息 -->
            <div class="jetair-widget-citys-searchlist" v-if="input !== ''">
                <ul v-if="searchList.length!==0">
                    <li class="bdb" v-for="item in searchList" @click="_chooseOne(item)">{{item.cityName}}</li>
                </ul>
                <div v-else class="nomatch">没有匹配城市</div>
            </div>
        </div>
    </div>
	</transition>
</template>

<script>
    import Headers from 'components/Header';
    export default {
        name:'jetair-airportList',
        props: {
            headerName: {
                type:String,
                default:'出发城市',
            },
            tripType: {
                type:String,
                default:'',
            },
            index: {
                type:Number,
                default:0,               
            },
            margin:{
                type:Boolean,
                default:true,
            },
            isNative:{
                type:Boolean,
                default:false
            },
            isShow: {
                type: Boolean,
                default: false,
                required: false
            },
            simple: {
                type: Boolean,
                default: false
            },
            localCity: {
                type: Object
            },
            starCity: {
                type: Array
            },
            cityData: {
                type: Object
            },
            onChoose: {
                type: Function
            },
            initCity: {
    		    type: Function,
                default: null
    		},
            orgDst: {
                type:String,
                default:'org'
            },
            /**
                * call back when click cancel button
                */
            close: {
                type: Function
            }
        },
        data(){
            return {
                input: '',
                list: '',
                targetLetter: '',
                searchList: [], //搜索结果
                hotList: [],
                letterList: [],
                result: '',
                defaultTrigger: true,
                tabCur:'domestic'
            }
        },
        computed:{
            curCityData(){
                console.log(this.cityData)
                return this.cityData[this.tabCur];
            }
        },
        components:{
            [Headers.name]:Headers,
        },
        watch: {
            cityData: function(){
                if(this.cityData && this.cityData.length > 0){
                    this._formatCityList(this.cityData);
                }
            },
            input: function() {
                this._search();
            },
            targetLetter: function() {
                this._scrollView();
            }
        },
        activated: function(done) {
            console.log(this.cityData)
            // console.log(this.curCityData())
            var _this = this;
            // done();
            // if(this.cityData){
            //     this._formatCityList(this.cityData);
            // }
        },
        methods: {
            show(){
                // this.isShow = true;
            },
            hide(){
                // this.isShow = false;
                this.input = '';
                this.searchList = [];
				this.close && this.close()
                if(document) document.getElementsByTagName('body')[0].scrollTop = 0;
            },
            bindClickTab(type){
                this.tabCur = type;
            },
            _chooseDefault(){
                let _this = this;
                let arr = this.list.filter(function(item) {
                    return _this.localCity.cityId == item.cityId
                })
                if(arr.length > 0){
                    _this._chooseOne(arr[0]);
                }else{
                    _this._chooseOne(this.list[0]);
                }
            },
            /**
             * 滚动可视区 - Triggered by '_chooseLetter'
             */
            _scrollView(){
                let dtList = document.querySelectorAll('.jetair-widget-citys-list dt'),
                    _this = this,
                    _dtList = Array.prototype.slice.call(dtList)

                if (_dtList){
                    _dtList.forEach((value, index, array) => {
                        if(value.innerText === _this.targetLetter) {
                            let wrapper = document.querySelector('.jetair-widget-citys')
                            let scrollTop = document.querySelector('.jetair-widget-citys-list').offsetTop + value.offsetTop

                            wrapper.scrollTop = scrollTop

                            // setTimeout(function() {
                            //     // 解决ios下 元素滚动的bug  现象是触发scroll时会导致部分滚动元素消失到二次元
                            //     wrapper.style.width = (100 + (Math.round(Math.random() * 1000)) / 1000) + '%';
                            // }, 0);
                            return false;
                        }
                    })
                }
            },
            /**
             * search city
             */
            _search(){
                var reg = new RegExp(this.input == '' ? 'xxyy' :
                    this.input, 'ig');

                var _arr = [];
                for(var i in this.letterList){
                    for(var j = 0; j < this.letterList[i].length; j++){
                        if(
                            reg.test(this.letterList[i][j][
                                'cityName'
                            ]) ||
                            reg.test(this.letterList[i][j][
                                'cityFirstLetter'
                            ]) ||
                            reg.test(this.letterList[i][j][
                                'citySpell'
                            ])
                        ){
                            _arr.push(this.letterList[i][j]);
                        }
                    }
                }
                this.searchList = _arr;
            },
            /**
             * format data of city
             * @param  {[Object]} obj [cityList]
             */
            _formatCityList(obj){
                let formatCityObj = {
                    "domestic":{
                        "airports":{
                            'abcdef':[],
                            'ghijklmn':[],
                            'opqrst':[],
                            'uvwxyz':[]
                        }
                    },
                    "international":{
                        "airports":{
                            'abcdef':[],
                            'ghijklmn':[],
                            'opqrst':[],
                            'uvwxyz':[]
                        }
                    },
                    "areas":{
                        "area":{
                            'abcdef':[],
                            'ghijklmn':[],
                            'opqrst':[],
                            'uvwxyz':[]
                        }
                    }
                }
                for(let item in this.cityData){
                    // console.log(item);
                }

            },
            _chooseOne(obj){
                console.log(obj);
                //判断是否嵌入到原生
                if(this.isNative){
                    this.$bridge.callHandler('setMessage',{
                        type:'airportlist',
                        ...obj
                    },(res)=>{
                        // this.$Toast({
                        //     content: res,
                        //     duration:5000
                        // });
                    })
                }else{
                    this.onChoose && this.onChoose({
                            'index':this.index,
                            'type':this.orgDst,
                            'airport':JSON.parse(JSON.stringify(obj))
                        });
                    this.hide();
                }
            },
            goBack(){
                this.$router.go(-1);
            }
        }
    }
</script>
<style lang="scss" scoped>
    .headerBack{
        width:1.16rem;
        height:1.16rem;
        background:url('../../../../assets/images/base/backBlack.png') no-repeat left center;
        background-size:.333333rem;
    }
    ::-webkit-scrollbar{
        display: none;
    }
    .jetair-widget-citys{
        -webkit-transition: all .2s ease-out;
        transition: all .2s ease-out;
        font-size: .373333rem;
        color: #333;
        position:fixed;
        top: 0;
        width:10rem;
        height:100%;
        z-index:999999999;
        -webkit-overflow-scrolling: touch;
        /**
		box-shadow: 0 .01rem .06rem rgba(0, 0, 0, .2);
        **/
        .jetair-widget-citys-content{
            width: 100%;
            height: calc(100% - 1.16rem); //完成后更改为auto
            background: #fff;
			border-radius: 0.03rem;
            overflow-y: scroll;
            .jetair-widget-citys-header{
                width:10rem;
                height: 1.866667rem;
                display: -webkit-box;
                background: #FFF;
                .jetair-widget-citys-iptbox{
                    -webkit-box-flex: 1.0;
                    height: .8rem;
                    margin-top:.466667rem;
                    padding:0rem .4rem;
                    box-sizing:border-box;
                    position:relative;
                    .searchIcon{
                        width:.8rem;
                        height:.8rem;
                        position:absolute;
                        background:url('../../../../assets/images/base/searchIcon.png') no-repeat center center;
                        background-size:.4rem;
                        top:0;
                        left:.4rem;
                    }
                    input{
                        width: 100%;
                        height: 100%;
                        line-height:.8rem;
                        display: block;
                        border: none;
                        @include font-dpr(12px);
                        background: none;
                        box-sizing: border-box;
                        background:#f2f2f2;
                        border-radius:45px;
                        outline:none;
                        padding-left:.8rem;
                    }
                    input::-webkit-input-placeholder{
                        color: #cdcdcd;
                        text-align: left;
                    }
                }
                a{
                    width: 1rem;
                    height: 100%;
                    line-height: 1.38rem;
                    text-align: center;
                    color: #999999;
                    display: block;
                }
            }
            .jetair-widget-citys-tabItemWrap{
                width:9.2rem;
                height: .866667rem;
                line-height: .866667rem;
                margin-left:.4rem;
                .jetair-widget-citys-tabItem{
                    width:3rem;
                    height:.866667rem;
                    float:left;
                    border:1px solid #fc4c02;
                    @include font-dpr(12px);
                    text-align:center;
                    line-height:.866667rem;
                    color:#fc4c02;
                }
                .tabCur{
                    background:#fc4c02;
                    color:#FFF;
                }
            }
            .jetair-widget-airport-citys{
                clear:both;
                position: relative;
                padding-top:.4rem;
                .star-citys-header{
                    width:9.2rem;
                    height:1.066667rem;
                    line-height:1.066667rem;
                    @include font-dpr(14px);
                    margin-left:.4rem;
                }
                .star-citys-item-wrap{
                    width:9.5rem;
                    height:auto;
                    margin-left: .4rem;
                    .star-citys-item{
                        // width:2rem;
                        height:.8rem;
                        line-height:.8rem;
                        text-align:center;
                        padding: 0 .4rem;
                        border:1px solid #ccc;
                        float:left;
                        margin:0rem .3rem .3rem 0rem;
                    }
                }

            }
        }
        .jetair-widget-citys-searchlist{
            position: absolute;
            top: 1.38rem;
            width: 100%;
            bottom: 0;
            z-index: 10001;
            background: #fff;
            overflow: auto;
            li{
                margin: 0 0.3rem;
                height: 1.38rem;
                line-height: 1.38rem;
            }
            .nomatch{
                line-height: 1.38rem;
                text-align: center;
                font-size: .37rem;
                color: #aaa;
            }
        }
        /***** 1px border *****/
        .bdt, .bdb, .bdtb, .bdl, .bdr, .bdlr{
            position: relative;
        }
        .bdl:before, .bdr:after, .bdlr:before, .bdlr:after,.bdt:before, .bdb:after, .bdtb:before, .bdtb:after{
            background-size: 100% 100%;
            position: absolute;
            content: '';
            z-index: 10
        }
        .bdl:before, .bdr:after, .bdlr:before, .bdlr:after{
            top: 0;
            width: 1px;
            height: 100%;
        }
        .bdt:before, .bdb:after, .bdtb:before, .bdtb:after{
            left: 0;
            height: 1px;
            width: 100%;
        }
        // 下边框
        .bdb:after{
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0MwNUE4NEVENjJEMTFFNTk0MzA4M0I3N0Q3NjAwQUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0MwNUE4NEZENjJEMTFFNTk0MzA4M0I3N0Q3NjAwQUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozQzA1QTg0Q0Q2MkQxMUU1OTQzMDgzQjc3RDc2MDBBQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozQzA1QTg0REQ2MkQxMUU1OTQzMDgzQjc3RDc2MDBBQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsGoW24AAAAVSURBVHjaYvjw4QMDEwMDw3+AAAMAF5MD0jmBIYUAAAAASUVORK5CYII=');
            bottom: 0;
        }
    }
	.slide-enter, .slide-leave-active{
		transform: translateY(100%)!important;
	}
	.fade-enter, .fade-leave-active{
		opacity: 0;
	}
 </style>
