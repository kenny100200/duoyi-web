<template>
 <div>
   <el-container>
     <el-header class="head">
     <el-form :model="searchData" ref="searchData" :rules="searchDataRules"  class="searchBox">
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
             style="width:310px;height:30px;float:left;valign-align:middle;top:5px;margin-right:25px">
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
       <button data-v-f9e7f2c0="" type="button" class="el-button el-button--default el-button--mini" @click="search"><!----><i class="el-icon-search"></i><!----><span>搜索</span></button>
       <button data-v-f9e7f2c0="" type="button" class="el-button el-icon-refresh el-button--info el-button--mini" @click="reset()" style="margin-left:-5px"><!----><!----><span>重置</span></button>
       <button data-v-f9e7f2c0="" type="button" class="el-button el-icon-plus el-button--primary el-button--mini" @click="dialog()" style="margin-left:50px"><!----><!----><span>添加</span></button>
     </el-header>
     <el-main>
<!--添加/修改弹出框开始-->
       <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" class="dialog">
         <el-row>
             <el-form :model="dialogData" :rules="dialogDataRules" ref="dialogData">
             <el-col :span="12"><div class="grid-content bg-purple"></div>
           <el-form-item label="姓名" prop="realName">
              <el-input type="text" v-model="dialogData.realName" placeholder="请输入用户姓名"></el-input>
           </el-form-item>
           <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="dialogData.password" placeholder="请输入密码"></el-input>
           </el-form-item>
           <el-form-item label="确认密码" prop="confirmPassword">
              <el-input type="password" v-model="dialogData.confirmPassword" placeholder="请再次输入密码"></el-input>
           </el-form-item>
           <el-form-item label="性别" prop="sex">
              <template>
                <el-radio v-model="dialogData.sex" label="male">男</el-radio>
                <el-radio v-model="dialogData.sex" label="female">女</el-radio>
              </template>  
           </el-form-item>
           <el-form-item label="出生日期" prop="birthDate">
              <el-date-picker v-model="dialogData.birthDate" type="date" placeholder="选择日期" class="datePicker">
              </el-date-picker>
           </el-form-item>
           <el-form-item label="固定电话" prop="linkTele">
              <el-input type="text" v-model="dialogData.linkTele" placeholder="请输入用户固定电话"></el-input>
           </el-form-item>
           <!--<el-form-item label="手机号" prop="mobileNo">
              <el-input type="text" v-model="dialogData.mobileNo" placeholder="请输入用户手机号"></el-input>
           </el-form-item>-->
           
             </el-col>
             <el-col :span="12"><div class="grid-content bg-purple-light"></div>
               <el-form-item label="邮箱" prop="email">
              <el-input type="email" v-model="dialogData.email" placeholder="请输入用户邮箱"></el-input>
           </el-form-item>
             <el-form-item label="用户id" prop="id">
              <el-input type="text" v-model="dialogData.id" placeholder="请输入用户id"></el-input>
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
              <el-form-item label="用户类型" prop="userType">
                <el-select v-model="dialogData.userType" placeholder="请选择用户类型">
                   <el-option label="职能部门" value="admin"></el-option>
                   <el-option label="业务管理员" value="manager"></el-option>
                   <el-option label="客户" value="customer"></el-option>
                   <el-option label="其他" value="unknow"></el-option>
                </el-select>
              </el-form-item>
             </el-col>
         </el-form>
         </el-row>
         <span slot="footer" class="dialog-footer">
               <el-button @click="closeDialog">取消</el-button>
               <el-button @click="saveContent">保存内容</el-button>
              </span>
       </el-dialog>
<!--添加/修改弹出框结束-->
       <!--<el-dialog title="更改信息" :visible.sync="dialogSet" width="30%" :before-close="handleClose" class="add">
         <el-form :model="formSet"  ref="formAdd">
           <el-form-item label="登录名" prop="userName">
              <el-input type="text" v-model="formSet.userName"></el-input>
           </el-form-item>
           <el-form-item label="用户姓名" prop="name">
              <el-input type="text" v-model="formSet.name"></el-input>
           </el-form-item>
           <el-form-item label="手机号码" prop="phone">
              <el-input type="text" v-model="formSet.phone"></el-input>
           </el-form-item>
           <el-form-item label="邮箱" prop="email"  class="email">
              <el-input type="email" v-model="formSet.email" class="email"><template slot="append" class="append">.com</template></el-input>
           </el-form-item><hr size=1 style="border-style:dotted;width:90%;"/>
           <el-form-item label="角色" prop="role">
              <el-select v-model="formSet.role" placeholder="请选择角色类型">
                 <el-option label="系统管理员" value="系统管理员"></el-option>
                 <el-option label="客户经理" value="客户经理"></el-option>
                 <el-option label="运营" value="运营"></el-option>
              </el-select>
           </el-form-item>
         </el-form>
         <span slot="footer" class="dialog-footer">
           <el-button @click="closeAdd">取消</el-button>
           <el-button @click="saveContent">保存内容</el-button>
         </span>
       </el-dialog>-->
      <el-table :data="tableData" border style="width:100%">
        <el-table-column prop="id" label="用户ID" type="index" width="100px">
        </el-table-column>
        <el-table-column prop="creator" label="创建人" >
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" >
        </el-table-column>
        <el-table-column prop="realName" label="用户姓名" >
        </el-table-column>
        <el-table-column prop="sex" label="性别" >
        </el-table-column>
        <el-table-column prop="birthDate" label="出生日期" >
        </el-table-column>
        <el-table-column prop="mobileNo" label="手机号" >
        </el-table-column>
        <el-table-column prop="linkTele" label="固定电话" >
        </el-table-column>
        <el-table-column prop="email" label="邮箱" >
        </el-table-column>
        <el-table-column prop="qq" label="qq" >
        </el-table-column>
        <el-table-column prop="weixin" label="微信号" >
        </el-table-column>
        <el-table-column prop="userNo" label="工号" >
        </el-table-column>
        <el-table-column prop="userType" label="用户类型" >
        </el-table-column>
        <el-table-column prop="updator" label="修改人" >
        </el-table-column>
        <el-table-column prop="updateTime" label="修改时间" >
        </el-table-column>
        <el-table-column prop="option" label="操作" >
          <template slot-scope="scope">
            <button data-v-f9e7f2c0="" type="button" class="el-button el-button--default el-button--mini" @click="del"><!----><!----><span>编辑</span></button>|
            <button data-v-f9e7f2c0="" type="button" class="el-button el-button--danger el-button--mini" @click="dialog(scope.$index+1)"><!----><!----><span>删除</span></button>|
            <el-switch style="display: block" v-model="tableData.enable" inactive-color="#13ce66" active-color="#ff4949"
            inactive-text="禁用" active-text="启用" @change="isEnable">
            </el-switch>          
          </template>
          </el-table-column>        
         <!--       
        <tr v-cloak v-for="(item, index) of list" :key="index">
          <td>{{index+1}}</td>
          <td>{{item.userName}}</td>
          <td>{{item.name}}</td>
          <td>{{item.email}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.role}}</td>
          <td><i class="el-icon-delete" @click="del"></i>|<i class="el-icon-setting" @click="dialog(this.index)"></i></td>
        </tr>-->
      </el-table>
     </el-main>
     <el-footer>

     </el-footer>
   </el-container>
   </div>
</template>


<script>
/* author:yt; changeDate:2017.12,03; finished:false; */ 
import ajax from '../../../static/js/ajax'
import regs from '../../../static/js/regs'
import validation from '../../../static/js/validation'
import httpHeader from '../../../static/js/httpHeader'
import http from '../../../static/config/http'
export default {
  data(){
    var confirmPassword = (rule, value, callback) =>{
      if (this.dialogData.confirmPassword.trim()!==this.dialogData.password.trim()){
        return callback(new Error(validation.confirmPassword));
      }else{
        callback();
      }
    };
    return{
       title:'',
       dialogVisible: false,
       searchData:{
         realName:'',
         sex:'',
         birthRange:'',
         mobileNo:'',
         email:'',
         userType:'',
       },
       dialogData:{
         realName:'',
         password:'',
         confirmPassword:'',
         sex:'male',
         birthDate:'',
         linkTele:'',
         email:'',
         qq:'',
         weixin:'',
         userId:'',
         userNo:'',
         userType:'',
         },
       tableData:[],//表格数据
       searchDataRules:{
              realName:[
                  {pattern:/\w{1,}/, message:'姓名至少一个字符', trigger:'blur'},
              ],
              /*birthDateBegin:[
                  {pattern:regs.date, message:validation.date, trigger:'blur'},
              ],
              birthDateEnd:[
                  {pattern:regs.date, message:validation.date, trigger:'blur'},
              ],*/
              mobileNo:[
                  {pattern:regs.mobile, message:validation.mobileNo, trigger:'blur'},
              ],
              email:[
                  {pattern:regs.email, message:validation.email, trigger:'blur'},
              ],
       } ,
       dialogDataRules:{
             realName:[
                  {required:true, message:'请输入用户姓名', trigger:'blur'},
                  {pattern:/\w{1,}/, message:'姓名至少一个字符', trigger:'blur'}
             ],
             birthDate:[
                  {type:"date", message:validation.date, trigger:'blur'}
             ],
             userId:[
                  {required:true, message:'请输入用户id', trigger:'blur'}, 
             ],
             password:[
                  {required:true, message:'请输入密码', trigger:'blur'},
                  {pattern:regs.password, message:validation.password, trigger:'blur'},
             ],
             confirmPassword:[
                  {required:true, message:'请输入确认密码', trigger:'blur'},
                  {validator:confirmPassword, message:validation.confirmPassword, trigger:'blur'},
             ],
             /*mobileNo:[
                  {pattern:regs.mobile, message:validation.mobile, trigger:'blur'}
             ],*/
             linkTele:[
                  {pattern:/^0[0-9]{2,3}-[0-9]{8}/, message:'请输入正确的座机号码(四位区号+八位座机号码)', trigger:'blur'} 
             ],
             email:[
                  {required:true, message:'请输入邮箱', trigger:'blur'},
                  {pattern:regs.email, message:validation.email, trigger:'blur'},
             ],
             qq:[
                  {pattern:/[1-9][0-9]{4,14}/, message:'qq号为第1位1-9之间，第2位0-9之间，长度为4-14位', trigger:'blur'} 
             ],
             weixin:[
                  {pattern:/^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/, message:'微信号为6-20个字母、数字、下划线或减号，以字母开头', trigger:'blur'},
             ],

       }
    }
  },
  mounted(){
    this.search();
  },
  methods:{
    /*重置搜索列表内容开始 */
    reset:function(){
       for(let item in this.searchData){
         this.searchData[item]='';
       }
    },
    /*重置搜索列表内容结束 */

    /*添加/修改弹出框开始*/
    dialog(index){
      if(!index)//当前索引值为空则为添加，不为空则为修改
      {
        this.dialogVisible=true;
        this.title='添加管理员';
        //this.model.$reset();
      }
      else
      {
       this.dialogVisible=true;
       this.title='更改信息';
       ajax({
         url:'',
         type:'get',
         data:{
           id:this.index
         }
       })
      }
    },
    /*添加/修改弹出框结束*/

   isEnable(){
       ajax({
          url:http.test+'/user/status',
          type:'post',
          data:{
            id:this.tableData.userId,
            status:this.tableData.enable,
          },
          success:(result)=>{
            this.$message({
              type:'success'
            })
          },
          error:(xhr, errorCode, message)=>{
            console.log(message);
          }  
        })
      },

    /*搜索功能开始 */
    search(){
       ajax({//向后台发送搜索输入框的内容，为空则为刷新表格，不为空则为搜索
         url:http.test+'/user/adminPage',
         type:'post',
         data:{
           realName:this.searchData.realName,
           sex:this.searchData.sex,
           birthDateBegin:this.searchData.birthRange[0],
           birthDareEnd:this.searchData.birthRange[1],
           mobileNo:this.searchData.mobileNo,
           email:this.searchData.email,
           userType:this.searchData.userType,
           pageIndex:1,
           pageSize:20,
           sortName:'id',
           sortOrder:'desc',
         },
         success:(result)=>{
           //this.dialogVisible=false;
           this.list=result.data;
         },
         error:(xhr, errorCode, message)=>{
           console.log(message)
         }
       })
    },
    /*搜索功能结束 */

    /*add(){
     this.dialogVisible=true;
     this.model.$reset();
    },*/
    handleClose(done){
      this.$confirm('确认关闭？')
        .then(_=>{
          done();
      })
        .catch(_=> {});
    },
    closeDialog(){
      this.dialogVisible=false;
      //this.$refs['moedel'].resetFields();
    },

    /*保存内容功能开始 */
    saveContent:function(){
            
          if(!/\w{1,}/.test(this.dialogData.realName.trim())){
              this.$message.error("姓名为长度至少为1的字符串");
              return;
          }
          if(!regs.password.test(this.dialogData.password.trim())){
              this.$message.error(validation.password);
              return;
          }
          if(this.dialogData.confirmPassword.trim()!==this.dialogData.password.trim()){
              this.$message.error(validation.confirmPassword);
              return;
          }
          if(this.dialogData.linkTele&&!/^0[0-9]{2,3}-[0-9]{8}/.test(this.dialogData.linkTele.trim())){
              this.$message.error('请输入正确的座机号码(四位区号+八位座机号码)');
              return;
          }
          if(!regs.email.test(this.dialogData.email.trim())){
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
              url: http.test+"/user/save",
              type:"post",
              data:{
                realName:this.dialogData.realName.trim(),
                password:this.dialogData.password.trim(),
                confirmPassword:this.dialogData.confirmPassword.trim(),
                sex:this.dialogData.sex,
                birthDate:this.dialogData.birthDate,
                linkTele:this.dialogData.linkTele.trim(),
                email:this.dialogData.email.trim(),
                userId:this.dialogData.userId.trim(),
                qq:this.dialogData.qq.trim(),
                weixin:this.dialogData.weixin.trim(),
                userNo:this.dialogData.userNo.trim(),
                userType:this.dialogData.userType,
              },
              success:(result)=>{
                this.$message({
                       message: '成功保存数据',
                       type: 'success'
                   });
                this.search();//成功添加或修改后刷新表格
                this.dialogVisible=false;
                this.$refs['dialogData'].resetFields();
              },
              error:(xhr, errorCode, message)=>{
                console.log(message);
                }
              }
            )    
            /*this.dialogVisible=false;   
            let obj={
              userName:this.model.userName,
              name:this.model.name,
              phone:this.model.phone,
              email:this.model.email,
              role:this.model.role
            }
            this.list.push(obj);
            this.$refs['dialogData'].resetFields();*/
    },
    /*保存内容功能结束 */

    /*删除功能开始 */
    del:function(){
      this.$confirm('确认删除？')
        .then(_=>{
         ajax({//向后台发送需要删除的表格元素索引
        url:http.test + '/',
        type:'post',
        data:{
          id:this.tableData.index,
        },
        success:(result)=>{
          this.$message({
            message:'删除成功',
            type:'success'
          });
          this.search();//删除成功后刷新表格
        },
        error:(xhr, errorCode, message)=>{
          console.log(message)
        }
      })
      })
        .catch(_=> {}); 
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
.el-form-item {
    margin-bottom: 22px;
    float: left;
    margin-right: 25px;
    display: inline-flex;
}
.el-dialog {
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
    height: 560px;
}
.dialog label{
    width:80px!important;
}
.dialog input{
  margin-left:20px!important;
  width: 195px;
}
.el-input-group__append, .el-input-group__prepend {
    background-color: #f5f7fa;
    color: #878d99;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: 1px solid #d8dce5;
    border-radius: 4px;
    padding: 0 20px;
    width: 25px;
    white-space: nowrap;
    padding-left: 12px;
    padding-top: 10px;
}
.head{
  width:1865px;
}
.head button{
  margin-top:0px;
  margin-left:0px;
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
.el-dialog__footer {
    padding: 10px 15px 15px;
    text-align: right;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-top: -55px;
}
.el-form-item {
    margin-bottom: 22px;
    float: left;
    margin-right: 0px;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
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
</style>

