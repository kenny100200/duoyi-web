import { ajax,secretAjax } from "wasabi-api";
import httpHeader from "./httpHeader";//客户端信息
import  status from "../config/status";//状态码
export default (setting)=>{

    if(setting.url.indexOf("mockjs")<=-1)
    {//正式环境
        setting.headers=httpHeader;
        setting.contentType="application/json;charset=UTF-8";
     setting.cors=true;
        if(setting.data)
        {
            setting.data=JSON.stringify(setting.data);
        }
    }
    
    let oldsuccess=setting.success;
    //重置成功信息
    setting.success=(result)=>{
        if(result.status==status.logout)
        {//用户登陆失败
        
          if(  window.parent){
            window.parent.location.href="/login";
          }else{
            window.location.href="/login";
          }
         
        }
        else {
            oldsuccess(result);
        }
    }
    setting.error=setting.error?setting.error:(xhr,errorCode,message)=>{

        if(this.$message)
        {
            this.$message.error(message);
        }
    }
    
     ajax(setting);
}
