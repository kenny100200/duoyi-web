import grid from "../../../components/grid/index.vue";
import http from "../../../../static/config/http.js";
export default {
    data()
    {
     return{
        params:{
            companyName:"",//公司名称
            status:"",//状态
        },
        searchModel:{
            companyName:"",//公司名称
            status:"",//状态
         },
         url:http.company+"/company/page",//后台地址
         columns:[
             { name:"realName",label:"申请人姓名"},
             { name:"mobileNo",label:"申请人手机号"},
             { name:"companyName",label:"公司名称"},
             { name:"business",label:"经营范围"},
             { name:"address",label:"公司地址"},
             { name:"legalName",label:"法人姓名"},
             { name:"fund",label:"注册资金"}, 
             { name:"financeName",label:"财税公司名称"},
             { name:"salesmanName",label:"销售员姓名"},
             { name:"status",label:"处理状态"}, 
         ],
         status:[
            {value:"SUBMIT",label:"提交"},
            {value:"CANCEL",label:"取消"},
            {value:"CHECK",label:"审核通过"},
            {value:"PAY",label:"已支付"},
            {value:" HANDING",label:"处理中"},
            {value:"FINISH",label:"完成"},
           
         ]
     }
    },
    components: {
        grid: grid
      },
}