<template>
 <div>
   <el-container>
     <el-header class="head">
     <el-form :model="searchData" ref="searchData" class="searchBox">
       <el-form-item label="姓名" prop="realName">
          <el-input v-model="searchData.realName" placeholder="请输入姓名" type="text"></el-input>
       </el-form-item>
       <el-form-item label="性别" prop="sex">
                <el-select v-model="searchData.sex" placeholder="请选择用户性别" size="small">
                   <el-option label="男" value="male"></el-option>
                   <el-option label="女" value="female"></el-option>
                </el-select>
       </el-form-item>
       <!--<el-form-item label="生日开始" prop="birthDateBegin">
              <el-date-picker v-model="dialogData.birthDateBegin" size="small" type="date" placeholder="选择日期" class="datePicker">
              </el-date-picker>
       </el-form-item>
       <el-form-item label="生日结束" prop="birthDateEnd">
              <el-date-picker v-model="dialogData.birthDateEnd" size="small" type="date" placeholder="选择日期" class="datePicker">
              </el-date-picker>
       </el-form-item>-->
       <el-form-item label="生日范围" prop="birthRange" style="margin-left:10px">
             <el-date-picker v-model="searchData.birthRange" type="daterange" range-separator="至" 
             start-placeholder="开始日期" end-placeholder="结束日期" size="small" 
             format="yyyy-MM-dd" value-format="yyyy-MM-dd" 
             style="width:320px;height:30px;float:left;valign-align:middle;top:5px;margin-right:25px">
             </el-date-picker> 
       </el-form-item>
       <el-form-item label="手机号" prop="mobileNo">
          <el-input v-model="searchData.mobileNo" size="small" placeholder="请输入目标手机" type="text"></el-input>
       </el-form-item>
       <el-form-item label="邮箱" prop="email">
          <el-input v-model="searchData.email" size="small" placeholder="请输入目标邮箱" type="text"></el-input>
       </el-form-item>
       <el-form-item label="用户类型" prop="userType">
                <el-select v-model="searchData.userType" placeholder="请选择用户类型" size="small">
                   <el-option label="系统管理员" value="systemManager"></el-option>
                   <el-option label="客户经理" value="customerManager"></el-option>
                   <el-option label="运营" value="operation"></el-option>
                </el-select>
       </el-form-item>
     </el-form>
       <button type="button" class="el-button el-button--default el-button--mini" @click="search"><i class="el-icon-search"></i><span>搜索</span></button>
       <button type="button" class="el-button el-icon-refresh el-button--info el-button--mini" @click="reset()" style="margin-left:-5px"><span>重置</span></button>
       <button type="button" class="el-button el-icon-plus el-button--primary el-button--mini" @click="dialog()" style="margin-left:50px"><span>添加</span></button>
     </el-header>
     <el-main>

<!--添加/修改弹出框开始-->
     <div class="addChangeDialog">
       <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" class="dialog">
         <el-row>
             <el-form :model="dialogData" :rules="dialogDataRules" ref="dialogData">
             <el-col :span="12"><div class="grid-content bg-purple"></div>
           <el-form-item label="姓名" prop="realName">
              <el-input type="text" v-model="dialogData.realName" placeholder="请输入用户姓名"></el-input>
           </el-form-item>
        <!--<el-form-item label="密码" prop="password">
              <el-input type="password" v-model="dialogData.password" placeholder="请输入密码"></el-input>
           </el-form-item>
           <el-form-item label="确认密码" prop="confirmPassword">
              <el-input type="password" v-model="dialogData.confirmPassword" placeholder="请再次输入密码"></el-input>
           </el-form-item>-->
           <el-form-item label="性别" prop="sex" class="sex">
              <template>
                <el-radio v-model="dialogData.sex" label="male">男</el-radio>
                <el-radio v-model="dialogData.sex" label="female">女</el-radio>
              </template>  
           </el-form-item>
           <el-form-item label="出生日期" prop="birthDate">
              <el-date-picker v-model="dialogData.birthDate" type="date" placeholder="选择日期" class="datePicker">
              </el-date-picker>
           </el-form-item>
           <el-form-item label="手机号" prop="mobileNo">
              <el-input type="text" v-model="dialogData.mobileNo" placeholder="请输入用户手机号" :readonly="dialogData.readonly"></el-input>
           </el-form-item>
           <el-form-item label="固定电话" prop="linkTele">
              <el-input type="text" v-model="dialogData.linkTele" placeholder="请输入用户固定电话"></el-input>
           </el-form-item>
           
           
             </el-col>
             <el-col :span="12"><div class="grid-content bg-purple-light"></div>
               <el-form-item label="邮箱" prop="email">
              <el-input type="email" v-model="dialogData.email" placeholder="请输入用户邮箱"></el-input>
           </el-form-item>
             <el-form-item prop="qq" label="qq" >
                <el-input type="text" v-model="dialogData.qq"  placeholder="请输入用户qq"></el-input>
           </el-form-item>
           <el-form-item prop="weixin" label="微信号" >
                <el-input type="text" v-model="dialogData.weixin" placeholder="请输入用户微信"></el-input>
           </el-form-item>
           <el-form-item prop="userNo" label="工号" >
                <el-input type="text" v-model="dialogData.userNo" placeholder="请输入用户公众号账号"></el-input>
           </el-form-item>
              
             </el-col>
              <el-form-item label="用户类型" class="userType">
                <el-checkbox v-model="dialogData.isAdmin" true-label="yes" false-label="no">管理员</el-checkbox>
                <el-checkbox v-model="dialogData.isBusinesser" true-label="yes" false-label="no">业务员</el-checkbox>
                <el-checkbox v-model="dialogData.isCustomer" true-label="yes" false-label="no">客户</el-checkbox>
                <el-checkbox v-model="dialogData.isSaler" true-label="yes" false-label="no">销售人员</el-checkbox>
              </el-form-item>
             <el-form-item label="角色" class="roles">
                <el-checkbox-group v-model="dialogData.checkedRoles">
                <el-checkbox v-for="role in dialogData.roles" :label="role" :key="role.id" style="margin-left:5px">{{role.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
         </el-form>
         </el-row>
         <span slot="footer" class="dialog-footer">
               <el-button @click="closeDialog">取消</el-button>
               <el-button @click="saveContent('dialogData')">保存内容</el-button>
              </span>
       </el-dialog>
     </div>
<!--添加/修改弹出框结束-->

<!--重置密码出框结束-->
    <div class="rstPsw">
      <el-dialog title="重置密码" :visible.sync="rstPswVisible" width="30%" :before-close="handleClose">
          <el-form :model="rstPswData" :rules="rstPswDataRules" ref="rstPswData">
           <el-form-item label="新密码" prop="newPassword">
             <el-input type="password" v-model="rstPswData.newPassword" placeholder="请输入新密码"></el-input>
           </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
               <el-button @click="closeRstPsw" style="margin-top:20px">取消</el-button>
               <el-button @click="resetPassword">提交</el-button>
          </span>
      </el-dialog>  
    </div>
<!--重置密码弹出框结束-->
    
<!--删除询问弹出框开始-->
     <div class="delAsk">
       <el-dialog title="提示" :visible.sync="delVisible" width="30%" :before-close="handleClose">
         <span>确认删除吗？</span>
         <span slot="footer" class="dialog-footer">
               <el-button @click="closeDel" style="margin-top:20px">取消</el-button>
               <el-button @click="del">确认</el-button>
          </span>
       </el-dialog>
     </div>
<!--删除询问弹出框结束-->


      <grid :url="url" border style="width:100%" :params="params"> 
        <el-table-column prop="realName" label="用户姓名" width="120" fixed="left">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="60">
        </el-table-column>
        <el-table-column prop="birthDate" label="出生日期" width="120">
        </el-table-column>
        <el-table-column prop="mobileNo" label="手机号" width="130">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="210">
        </el-table-column>
        <el-table-column prop="qq" label="qq" width="150">
        </el-table-column>
        <el-table-column prop="weixin" label="微信号" width="150">
        </el-table-column>
        <el-table-column prop="openId" label="公众号账号" width="120">
        </el-table-column>
        <el-table-column prop="creator" label="创建人" width="120">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="120">
        </el-table-column>
        <el-table-column prop="updator" label="修改人" width="120">
        </el-table-column>
        <el-table-column prop="updateTime" label="修改时间" width="120">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="140" fixed="right">
          <template slot-scope="scope">
           <el-switch style="display: block" v-model="status[scope.$index]" active-value="ENABLE" inactive-value="DISABLE" active-color="#13ce66" inactive-color="#ff4949" active-text="启用" inactive-text="禁用" @change="statusChange(scope.row.id,scope.row.status, scope.$index)">
           </el-switch>
           </template>
        </el-table-column>
        <el-table-column prop="option" label="操作" fixed="right" width="150" >
          <template slot-scope="scope">
            <el-button type="primary" class="el-button el-button--default el-button--mini" @click="dialog(scope.row.id)"><span>编辑</span></el-button>
            <el-button type="primary" class="el-button el-button--danger el-button--mini" @click="openDel(scope.row.id)"><span>删除</span></el-button><br/>
            <el-button type="primary" class="el-button el-icon-refresh el-button--info el-button--mini" @click="openRstPsw(scope.row.id)" style="margin-top:10px; width:128px"><span>重置密码</span></el-button>
          </template>
        </el-table-column>
      </grid>
     </el-main>
     <el-footer>

     </el-footer>
   </el-container>
   </div>
</template>


<script>
/* author:yt; changeDate:2017.12,03; finished:false; */ 
import grid from "../../components/grid/index";
import ajax from '../../../static/js/ajax'
import regs from '../../../static/js/regs'
import validation from '../../../static/js/validation'
import httpHeader from '../../../static/js/httpHeader'
import http from '../../../static/config/http'
import unit from '../../../static//js/unit';
export default {
  data(){
    return{
      status:[],
       params:{},
       title:'',//规定弹出对话框名称——“添加用户”或者“修改用户信息”
       dialogVisible: false,
       rstPswVisible:false,
       delVisible:false,
       resetId:'',//重置密码的用户ID
       delId:'',//删除的用户ID
       searchData:{
         realName:'',//需要搜索的用户姓名
         sex:'',//需要检索的用户性别
         birthRange:'',//需要检索的用户出生日期范围
         mobileNo:'',//需要检索的用户手机号码
         email:'',//需要检索的用户邮箱
         userType:'',//需要检索的用户类型
       },
       dialogData:{
         realName:'',//需要添加/修改的用户姓名
         sex:'male',//需要添加/修改的用户性别
         birthDate:'',//需要添加/修改的用户出生日期
         linkTele:'',//需要添加/修改的用户座机
         email:'',//需要添加/修改的用户邮箱
         qq:'',//需要添加/修改的用户qq
         weixin:'',//需要添加/修改的用户微信
         id:'',//需要添加/修改的用户ID
         userNo:'',//需要添加/修改的用户工号
         readonly:false,//输入框是否只读
         mobileNo:'',//需要添加/修改的用户手机号
         checkedRoles:[],//选中的角色
         roles:[],//所有角色
         isAdmin:'no',//需要添加/修改的用户类型是否为管理员
         isBusinesser:'no',//需要添加/修改的用户类型是否为业务员
         isCustomer:'no',//需要添加/修改的用户类型是否为客户
         isSaler:'no',//需要添加/修改的用户类型是否为销售员
         },
         rstPswData:{
           newPassword:'',//新密码
         },
       url:http.public+'/user/managePage',//表格数据
       dialogDataRules:{
             realName:[
                  {required:true, message:'请输入用户姓名', trigger:'blur'},
                  {pattern:/\w{1,}/, message:'姓名至少一个字符', trigger:'change blur'}
             ],
             birthDate:[
                  {type:'date', message:validation.date, trigger:'change'}
             ],
             mobileNo:[
                  {required:true, message:'请输入手机号', trigger:'blur'},
                  {pattern:regs.mobile, message:validation.mobile, trigger:'change blur'},
              ],
             linkTele:[
                  {pattern:/^0[0-9]{2,3}-[0-9]{8}$/, message:'请输入正确的座机号码(四位区号+八位座机号码)', trigger:'change'} 
             ],
             email:[
                  {pattern:regs.email, message:validation.email, trigger:'change'},
             ],
             qq:[
                  {pattern:/[1-9][0-9]{4,14}/, message:'qq号为第1位1-9之间，第2位0-9之间，长度为4-14位', trigger:'change'} 
             ],
             weixin:[
                  {pattern:/^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/, message:'微信号为6-20个字母、数字、下划线或减号，以字母开头', trigger:'change'},
             ],

       },
       rstPswDataRules:{
         newPassword:[
           {pattern:regs.password, message:validation.password, trigger:'change'}
         ]
       }
    }
  },
  components:{
    grid:grid
  },
  methods:{

    /*重置搜索列表内容开始 */
    reset:function(){
       for(let item in this.searchData){
         this.searchData[item]='';
       }
    },
    /*重置搜索列表内容结束 */

    /*打开重置密码对话框开始 */
    openRstPsw(id){
      this.rstPswVisible=true;
      this.resetId=id;
    },
    /*打开重置密码对话框开始 */
    
    /*关闭重置密码对话框开始 */
    closeRstPsw(){
      this.rstPswVisible=false;
    },
    /*关闭重置密码对话框开始 */



    /*重置密码开始 */
       resetPassword(){
         if(!regs.password.test(this.rstPswData.newPassword.trim())){
           this.$message.error(validation.password);
           return;
         }
         ajax({
           url:http.pro+'/user/password',
           type:'post',
           data:{
              id:this.resetId,
              password:this.rstPswData.newPassword.trim(),
           },
           success:(result)=>{
             this.$message({
               message:'密码重置成功',
               type:'success'
             })
            
           },
           error:(xhr, errorCode, message)=>{
             var info = this.$alert(message);
             this.$message.error(info);
           }
         })
         this.rstPswVisible=false;
         this.$refs['rstPswData'].resetFields();
       },

    /*重置密码结束 */
    

    /*添加/修改弹出框开始*/
    dialog(id){
       if (this.$refs['dialogData']!==undefined) {
         this.$refs['dialogData'].resetFields();
     }
      ajax({
        url:http.pro+'/power/roleList',
        type:'get',
        success:(result)=>{
         this.dialogData.roles=result.data;
      },
        error:(xhr, errorCode, message)=>{
             var info = this.$alert(message);
             this.$message.error(info);
        }}) 
      if(!id)//无id号则为添加
      {
        this.dialogVisible=true;
        this.title='添加用户';
        //this.model.$reset();
      }
      else
      {
       this.dialogVisible=true;
       this.title='更改用户信息';
       this.dialogData.readonly=true;
       this.dialogData.id=id;

       ajax({
         url:http.pro+'/user/detail',
         type:'get',
         data:{
           id:id,
         },
         success:(result)=>{
           this.dialogData=result.data;
           this.dialogData.checkedRoles=result.data.roles;
           //this.dialogData.checkedRoles=result.roles;
         },
         error:(xhr, errorCode, message)=>{
             var info = this.$alert(message);
             this.$message.error(info);
         }
       })
      }
      
    },
    /*添加/修改弹出框结束*/
  statusChange(id,status,index){//是否禁用状态改变
  console.log(index)
  console.log(this.status[index])
      ajax({
        url:http.pro+'/user/status',
        type:'post',
        data:{
          id:id,
          status:this.status[index],
        },
        success:(result)=>{
          this.$message({
            type:'success'
          })
        },
        error:(xhr, errorCode, message)=>{
             var info = this.$alert(message);
             this.$message.error(info);
        }
      })
    },

    /*搜索功能开始 */
   search:function(){
     this.params=unit.clone( this.searchData);
    
   },
    /*搜索功能结束 */

    handleClose(done){
      this.$confirm('确认关闭？')
        .then(_=>{
          done();
      })
        .catch(_=> {});
    },
    closeDialog(){
      this.dialogVisible=false;
    },

    /*保存内容功能开始 */
    saveContent:function(){
        if(!/\w{1,}/.test(this.dialogData.realName.trim())){
              this.$message.error("姓名为长度至少为1的字符串");
              return;
          }
          if(!regs.mobile.test(this.dialogData.mobileNo)){
              this.$message.error(validation.mobile);
              return;
          }
          if(this.dialogData.linkTele&&!/^0[0-9]{2,3}-[0-9]{8}/.test(this.dialogData.linkTele.trim())){
              this.$message.error('请输入正确的座机号码(四位区号+八位座机号码)');
              return;
          }
          if(this.dialogData.email.trim()&&!regs.email.test(this.dialogData.email.trim())){
              this.$message.error(validation.email);
              return;
          }
          if(this.dialogData.qq.trim()&&!/[1-9][0-9]{4,14}/.test(this.dialogData.qq.trim())){
              this.$message.error('qq号为第1位1-9之间，第2位0-9之间，长度为4-14位');
              return;
          }
          if(this.dialogData.weixin.trim()&&!/^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/.test(this.dialogData.weixin.trim())){
              this.$message.error('微信号为6-20个字母、数字、下划线或减号，以字母开头');
              return;
          }
          
            ajax({
              url: http.pro+"/user/save",
              type:"post",
              data:{
                realName:this.dialogData.realName.trim(),
                sex:this.dialogData.sex,
                birthDate:this.dialogData.birthDate,
                mobileNo:this.dialogData.mobileNo,
                linkTele:this.dialogData.linkTele.trim(),
                email:this.dialogData.email.trim(),
                id:this.dialogData.id,
                qq:this.dialogData.qq.trim(),
                weixin:this.dialogData.weixin.trim(),
                userNo:this.dialogData.userNo.trim(),
                isAdmin:this.dialogData.isAdmin,
                isBusinesser:this.dialogData.isBusinesser,
                isCustomer:this.dialogData.isCustomer,
                isSaler:this.dialogData.isSaler,
                roles:this.dialogData.checkedRoles,
                id:this.dialogData.id,
              },
              success:(result)=>{
                this.$message({
                       message: '成功保存数据',
                       type: 'success'
                   });
                this.dialogVisible=false;
                this.$refs['dialogData'].resetFields();
                this.search();//成功添加或修改后刷新表格
                
              },
              error:(xhr, errorCode, message)=>{
             var info = this.$alert(message);
             this.$message.error(info);
                }
              }
            )    
    },
    /*保存内容功能结束 */

    /*打开删除对话框 */
    openDel:function(id){
      this.delId=id;
      this.delVisible=true;
    },
    /*打开删除对话框 */
    /*关闭删除对话框 */    
    closeDel:function(){
      this.delVisible=false;
    },
    /*关闭删除对话框 */


    /*删除功能开始 */
    del:function(){
         ajax({//向后台发送需要删除的表格元素索引
        url:http.pro + '/user/delete',
        type:'delect',
        data:{
          id:this.delId,
        },
        success:(result)=>{
          this.$message({
            message:'删除成功',
            type:'success'
          });
          this.delVisible=false;
          this.search();//删除成功后刷新表格
        },
        error:(xhr, errorCode, message)=>{
             var info = this.$alert(message);
             this.$message.error(info);
        }
      })
        
    },
    /*删除功能结束 */


    }
    }

</script>

<style>
.el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 180px;
    float: left;
}
.el-main{
  margin-top:100px;
}
.userType{
  display: inline block;
  margin-top: -5px;
}
.userType .el-form-item__label{
  margin-right: 5px;
}
.el-form-item {
    margin-bottom: 22px;
    float: left;
    margin-right: 25px;
    display: inline-flex;
}
.addChangeDialog .el-dialog {
    position: relative;
    margin: 0 auto 50px;
    border-radius: 2px;
    -webkit-box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 690px!important;
    left: 0px;
    margin-top: 16px!important;
}
.dialog label{
    width:80px!important;
}
.dialog input{
  margin-left:20px!important;
  width: 195px;
}
.head{
  width:1865px;
}
.head button{
  margin-top:0px;
  margin-left: 0px;

}
.el-form-item__error {
    color: #fa5555;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    /* left: -79px; */
    width: 470px;
    left: -82px;
    text-align: left;
}
.datePicker input{
  width:185px!important;
  margin-left: 30px!important;
}
.addChangeDialog .el-dialog__footer {
    padding: 10px 15px 15px;
    text-align: right;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-top: -20px;
}
.el-form-item {
    margin-bottom: 22px;
    float: left;
    margin-right: 0px;
    display: inline-flex;
}
.searchBox{
  margin-top: 70px;
  overflow: hidden;
}
.searchBox input{
  height: 25px!important;
  width: 150px;
}
.el-range__close-icon{
  width: 10px;
  height: 10px;
}
.rstPsw .el-dialog{
  width: 500px!important;
  margin-left:600px; 
  margin-top: 50px;
}
.rstPsw .el-dialog-footer{
  margin-left:10px; 
  margin-top: 50px!important;
}
.rstPsw .el-form-item__error{
  margin-left: 15px;
  width: 500px;
}
.rstPsw .el-dialog{
  margin-left: 30%;
}
.sex .el-radio {
    color: #5a5e66;
    font-weight: 500;
    line-height: 1;
    cursor: pointer;
    white-space: nowrap;
    outline: 0;
    margin-left: 25px;
}
/*.roles .el-form-item__label{
  margin-left: -8px;
  margin-right: 23px;
}*/
.roles{
  margin-top:-20px;
}
</style>
