<<template>
  <div class="main">
  <el-form :model="form" :rules="rules" ref="form">
  <el-form-item label="用户名" prop="userName">
    <el-input type="text" v-model="form.userName"></el-input>
  </el-form-item>
  <el-form-item label="手机" prop="phone">
    <el-input type="text" v-model="form.phone"></el-input>
  </el-form-item>
  <el-form-item label="新的密码" prop="newPassword">
    <el-input type="password" v-model="form.newPassword"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="confirmPassword">
    <el-input type="password" v-model="form.confirmPassword"></el-input>
  </el-form-item>
  <el-form-item label="验证码" prop="checkCode">
    <el-input type="text" v-model="form.checkCode" class="checkCode"></el-input>
    <el-button @click="getCheckCode" class="checkCodeButton">获取验证码</el-button>
  </el-form-item>
  <el-form-item class="alterButton">
    <el-button type="primary" @click="submit">修改</el-button>
  </el-form-item>
  </el-form>
  </div>
</template>
>

<<script>
import ajax from "../../../static/js/ajax";
import regs from "../../../static/js/regs";
import validation from "../../../static/js/validation";
export default {
  data() {
      var confirmPassword = (rule, value, callback) =>{
          if (this.form.confirmPassword.trim()!==this.form.newPassword.trim())
          {return callback(new Error(validation.confirmPassword));}
          else{
              callback();
          }
      };
      return {
          form:{
          userName:'',
          phone:'',
          newPassword: '',
          confirmPassword: '',
          checkCode:'',
          },
          rules:{
          userName:[
              {required:true, message:'请输入用户名', trigger:'blur'},
              {pattern:regs.userName, message:validation.userName, trigger:'blur'},
          ],
          phone:[
              {required:true, message:'请输入手机', trigger:'blur'},
              {pattern:regs.mobile, message:validation.mobile, trigger:'blur'},
          ],
          newPassword:[
              {required:true, message:'请输入新密码', trigger:'blur'},
              {pattern:regs.password, message:validation.password, trigger:'blur'},
          ],
          confirmPassword:[
              {required:true, message:'请输入确认密码', trigger:'blur'},
              {validator:confirmPassword, message:validation.confirmPassword, trigger:'blur'},
          ],
          
          }
        };
  },
    mounted(){},  
    methods: {
       getCheckCode(){
           if(!regs.mobile.test(this.form.phone.trim())){
               this.$message.error(validation.mobile);
               return;}
           ajax({
               url:"http://192.168.1.114:8080/mockjs/2/user/getCheckCode",
               type:"post",
               data:{
                   mobileNo: this.form.phone.trim(),
               },
               success:(result)=>{
                   this.$message({
                       message: '成功发送验证码',
                       type: 'success'
                   });
               },
               error:(xhr, errorCode, message)=>{
                   console.log(message);
           }
       })},
       submit(){
           if(!regs.userName.test(this.form.userName.trim())){
               this.$message.error(validation.userName);
               return;
           }
           if(!regs.mobile.test(this.form.phone.trim())){
               this.$message.error(validation.mobile);
               return;
           }
           if(!regs.password.test(this.form.newPassword.trim())){
               this.$message.error(validation.password);
               return;
           }
           if(!this.form.newPassword.trim()===this.form.confirmPassword.trim()){
               this.$message.error(validation.confirmPassword);
               return;
           }
           if(!this.form.checkCode.trim()){
               this.$message.error('请输入验证码');
               return;
           }
        
          ajax({
               url:http.test+"/user/editPassword",
               type:"post",
               data:{
                   userName: this.form.userName.trim(),
                   phone: this.form.phone.trim(),
                   newPassword: this.form.newPassword.trim(),
                   confirmPassword: this.form.confirmPassword.trim(),
                   chekCode: this.form.checkCode.trim(),
               },
               success:(result)=>{
                   this.$message({
                       message: '密码修改成功',
                       type: 'success'
                   });
                   window.location.href="../login";
               },
               error:(xhr, errorCode, message)=>{
                   console.log(message);
               }
           })
       }
       }}
</script>


<style>
body{
    background:whitesmoke;
}
.main {
    border: solid white 1px;
    width: 555px;
    height: 430px;
    left: 35%;
    top: 15%;
    position: absolute;
    background:white;
}
.el-form{
    margin-top:30px;
}
.el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 50%;
    margin-left:40px;
}
.main .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #5a5e66;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 155px;
}

.main .el-input_inner {
    -webkit-appearance: none;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #d8dce5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #5a5e66;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 1;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
    margin-left: 30px;
}
.checkCode{
    width:165px;
    margin-left:40px;
}
.checkCodeButton{
    margin-right:-53px;
    margin-left:-5px;
}
.el-form-item__error {
    color: #fa5555;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 80px;
}
.alterButton .el-button{
    margin-left: 275px;
}
</style>
>