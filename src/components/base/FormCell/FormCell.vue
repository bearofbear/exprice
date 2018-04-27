<template>
    <div class="formCell">
        <div class="leftWrapper">
            <div :class="enName==''?'cnName onlyCnName':'cnName'">{{cnName}}</div>
            <div class="enName" v-if="enName!=''">{{enName}}</div>
        </div>
        <div 
            :class="toIcon 
                ? 'rightWrapper toIcon' 
                :'rightWrapper'" 
                :style="rightWrapperStyle"   
                @click="callFunc"
        >
            <input 
                v-if="rightIsInput" 
                type="text" 
                :placeholder="placeholder" 
                v-model="value"
                @change="changValue"
               
            >
           <div 
                :class="cameraIcon
                    ? 'cameraIcon'
                    :(bookIcon?'bookIcon':'')"
                @click="oncameraOrBookClick">
           </div>
            <span v-if="!rightIsInput && rightContent!=''">{{rightContent}}</span>
        </div>
       
    </div>
</template>

<script>
export default {
    name:'jetair-formCell',
    props:{
        cnName: {
            type:String,
            default:'',
        },
        enName: {
            type:String,
            default:''
        },
        rightIsInput:{
            type:Boolean,
            default:true
        },
        placeholder:{
            type:String,
            default:''
        },
        rightContent:{
            type:String,
            default:''
        },
        toIcon:{
            type:Boolean,
            default:false
        },
        cameraIcon:{
            type:Boolean,
            default:false
        },
        bookIcon:{
            type:Boolean,
            default:false
        },
        swtich:{
            type:Boolean,
            default:false
        },
        callBack:{
            type:Function,
        },
        currentValue:{
            type:String,
            default:''            
        }

    },
    computed:{
        leftWrapperStyle(){
            if(this.enName!=''){
                return {

                }
            }else{
                return {
                    lineHeight:'1.466667rem',
                }
            }
        },
        rightWrapperStyle(){
            return { width: this.swtich? '4rem' :(this.cameraIcon || this.bookIcon ? '5.29rem' : '6.09rem')}
        }
    },
    data(){
        return {
           value:''
        }
    },
    activated(){
        this.value = this.currentValue;
    },
    created(){
        this.value = this.currentValue;
    },
    methods:{
        //绑定相机和通讯录点击事件
        oncameraOrBookClick(){
            let cameraOrBook  = this.cameraIcon?'camera':(this.bookIcon?'addressList':'');
            this.$emit('bindcameraClick', cameraOrBook)
        },
        changValue() {
            this.$emit('input', this.value)
        },
        callFunc(){
            this.callBack && this.callBack();
        }
    }
}
</script>
<style lang="scss" scoped>
.formCell{
    width:10rem;
    height:1.466667rem;
    border-bottom:1px solid #e0e0e0;
    padding-left:.4rem;
    box-sizing:border-box;
    background: #FFF;
    .leftWrapper{
        width:3.066667rem;
        height:1.466667rem;
        float:left;
        .cnName,.enName{
            width:2.466667rem;
            height:.5rem;   
            color:#666;
            line-height:.5rem;
            @include font-dpr(14px);       
        }
        .cnName{
            margin-top:0.25rem;
        }
        .onlyCnName{
            width:3.066667rem;
            height:1.466667rem;  
            color:#666;
            margin-top:0rem;
            line-height:1.466667rem;
            @include font-dpr(16px);             
        }
    }
    .rightWrapper{
        width:6.09rem;
        height:1.466667rem;
        position:relative;
        line-height:1.466667rem;
        @include font-dpr(16px);
        float:left;
        text-align:right;
        input{
            width:100%;
            height:0.8rem;
            line-height:0.8rem;
            @include font-dpr(16px);
            outline:none;
            text-align:right;
            border:0px solid #FFF;
        }
    }
    .toIcon{
        padding-right:0.4rem;
        box-sizing:border-box;
        background:url('../../../assets/images/base/more.png') no-repeat right center;
        background-size:.2rem;
    }
    .cameraIcon{
        position:absolute;
        width:1rem;
        height:1.466667rem;
        right:-1rem;
        top:0rem;
        background:url('../../../assets/images/ps/cammerIcon.png') no-repeat center center;
        background-size:.4rem;
    }
    .bookIcon{
        position:absolute;
        width:1rem;
        height:1.466667rem;
        right:-1rem;
        top:0rem;
        background:url('../../../assets/images/ps/telbooks.png') no-repeat center center;
        background-size:.4rem;
    }
}
</style>