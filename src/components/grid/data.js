/**
 * 数据模型
 * @description date:2017-12-09 王志勇
 */
import unit from "../../../static/js/unit.js";
export default {
    data() {
        return { 
            self_data:this.data,
            self_pageIndex:this.pageIndex,
            self_pageSize:this.pageSize,
            self_sortName:this.sortName,
            self_sortOrder:this.sortOrder,
            self_total:this.total,        
           ajaxData:{},//只用于缓存,减少请求次数
        }
      } ,
      computed:{
        /**
         * 自定义样式
         */
        style(){
            return  this.width?"width:"+this.width+"px":"";
        }
    },
}
