/**
 * 对外接口
 * @description date:2017-12-09 王志勇
 * @description date:2017-12-17 修改
 */

export default {
    props: {
        /**
         *样式
         */
       width:{
           type:[String,Number],
           default:""
       },
        /**
         *高度
         */
        height:{
               type:[String,Number],
           default:"440"
        },
        /**
         * 是否显示边框 
         */
        border:{
            type:Boolean,
            default:true,
        },
        /**
         * 是否允许获取焦点
         */
            focusAble:{
                   type: Boolean,
             default: true,
        },
        /**
         * 是否可选择
         */
        selectAble:{
             type: Boolean,
             default: false,
        },
        /**
         * 是否选择序号 
         */
        rowNumber:{
               type: Boolean,
             default: true,
        },
        /**
         * 后台url
         */
        url:{
        type:String,
        default:""
        },
        /**
         *列
         */
        columns:{
            type:Array,
            default:function(){
                return [ ]
            }
        },
        /**
         * 默认数据 
         */
        data:{
           type:Array,
           default:function(){
               return [];
           }
        },
        total:{
            type:Number,
            default:0
        },
        /**
         * 是否分页
         */
        pagination:
        {
          type:Boolean,
          default:true,
        },
        /**
         * 默认页号
         * */
        pageIndex:{
            type:Number,
            default:1,
        },
        /**
         * 默认分页大小 
         * */
        pageSize:{
            type:Number,
            default:10,
        },
        /**
         * 排序字段
         */
        sortName:{
            type:String,
            default:"id",
        },
        /**
         * 排序方式
         */
        sortOrder:{
          type:String,
          default:"desc",
        },
        /**
         *默认后台数据源
         */
        dataSource:{
         type:String,
         default:"data",
        },
        /**
         * 默认总记录数据源
         */
        totalSource:{
         type:String,
         default:"total",
        },
        /**
         * 参数
         */
        params:{
            type:Object,
            default:function(){
                return {};
            }
          
        }
        

    }
}