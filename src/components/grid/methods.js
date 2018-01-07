/**
 * 处理事件
 * @description date:2017-12-09 王志勇
 */
import ajax from "../../../static/js/ajax.js";
import unit from "../../../static/js/unit.js";
export default {
    mounted(){
    this.reload();//查询数据,
    },
    updated(){
    this.update();//更新数据，要先判断
    },
    methods:{   
        /**
          *列表序号计算
               * @param {number}  index 当前行号
          */
          indexMethod(index) 
          {  
              return ((this.self_pageIndex-1)*this.self_pageSize+index+1);
           
          },

            /**
             * 页号改变
             * @param {*} val 
             */
          pageIndexChange(val){
          this.self_pageIndex=val;
          this.reload();
          },
          /**
           * 分页大小
           * @param {*} val 
           */
          pageSizeChange(val)
          {
            this.self_pageSize=val;
          },
          
            /**
             * 当前行被选中
             * @param {Object}  row 当前行数据
             */
            focus(row){
              //获取得焦点
               this.$emit('focus',{...row})
              
            },
            /**
             * 排序
             * @param {*} sortArgs 排序参数
             */
            sort(sortArgs)
            {
              if(sortArgs.prop)
              {//如果返回排序字段，则
               
                this.self_sortName=sortArgs.prop;
                this.self_sortOrder=sortArgs.order==="ascending"?"asc":"desc";
                this.reload();
              }
             
            },
            /**
             * 刷新，等于查询数据
             * 
             */
            reload(){
                if(this.url){
                  //有url
                  if(this.pagination)
                  {//分页
                    //保存本次查询条件，方便下次更新的时比较
                    this.ajaxdata={
                      pageIndex:this.self_pageIndex,//分页号
                      pageSize:this.self_pageSize,//分页大小
                      sortName:this.self_sortName,//排序字段
                      sortOrder:this.self_sortOrder,//排序方式
                     data:unit.clone(this.params),//参数
                  }
                  }else 
                  {
                    this.ajaxdata=this.params;
                  }
               console.log("开始查询",this.ajaxdata);
                
                   ajax({
                     url:this.url,
                     type:"post",
                     data:this.ajaxdata,
                     success:(result)=>{    
                         this. self_data=unit.getSource(result,this.dataSource);
                         this.self_total=unit.getSource(result,this.totalSource); 
                     },
                     
                   })
                }
                else {
                  this.$emit('reload', {self_pageIndex:this.self_pageIndex,self_pageSize:this.self_pageSize,self_sortName:this.self_sortName,self_sortOrder:this.self_sortOrder});
                }
                
            },
              /**
               * 更新数据
               */
            update(){
              if(this.diff())
              {
                this.reload();
              }
            },
            /**
             * 对比参数是否有变化
             */
            diff(){
             
              let ajaxdata={};//取得当前查询条件
              if(this.pagination)
              {//分页
                 ajaxdata={
                  pageIndex:this.self_pageIndex,//分页号
                  pageSize:this.self_pageSize,//分页大小
                  sortName:this.self_sortName,//排序字段
                 sortOrder:this.self_sortOrder,//排序方式
                  data:this.params//参数
                   };
              }
              else {
                ajaxdata=this.params;
              }
            
             
               for(let item in ajaxdata)
               {
                if(typeof ajaxdata[item] !=="object")
                {
                  if(this.ajaxdata&&ajaxdata[item]!=this.ajaxdata[item]){
                  
                    return true;
 
                  }
                }
                else {
                  for(let subitem in ajaxdata[item])
                  {
                    if(ajaxdata[item][subitem]!=this.ajaxdata[item][subitem])
                    {
                      return true;
                    }
                  }
                }
                 
               }
               return false;
            }

           

  }
}