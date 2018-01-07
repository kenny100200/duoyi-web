<<template>
  <div class="main">
  <el-form :model="form" :rules="rules" ref="form">
  <el-form-item label="登陆账号" prop="userName">
    <el-input type="text" v-model="form.userName"></el-input>
  </el-form-item>
  <el-form-item label="手机号" prop="mobileNo">
    <el-input type="text" v-model="form.mobileNo"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="form.password"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="confirmPassword">
    <el-input type="password" v-model="form.confirmPassword"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input type="email" v-model="form.email" class="email"></el-input>
  </el-form-item>
  <el-form-item label="真实姓名" prop="realName">
    <el-input type="text" v-model="form.realName"></el-input>
  </el-form-item>
  <el-form-item label="性别" prop="sex">
    <template>
      <el-radio v-model="form.sex" label="male" class="male">男</el-radio>
      <el-radio v-model="form.sex" label="female" class="female">女</el-radio>
    </template>  
  </el-form-item>
  <el-form-item label="出生日期"  prop="birthday">
       <el-date-picker
      v-model="form.birthday"
      type="date"
      placeholder="选择日期" class="datePicker">
    </el-date-picker>
    <!-- <el-input type="date" v-model="form.birthday"></el-input> -->
    <!-- <el-input type="text" v-model="form.birthday"></el-input> -->
  </el-form-item>
  <el-form-item label="固定电话" prop="linkTele">
    <el-input type="text" v-model="form.linkTele"></el-input>
  </el-form-item>
  <el-form-item label="工号" prop="userNo">
    <el-input type="text" v-model="form.userNo"></el-input>
  </el-form-item>
  <el-form-item label="qq号" prop="qq">
    <el-input type="text" v-model="form.qq"></el-input>
  </el-form-item>
  <el-form-item label="微信号" prop="weixin">
    <el-input type="text" v-model="form.weixin"></el-input>
  </el-form-item>
  <el-form-item class="button">
    <el-button type="primary" @click="submit">注册</el-button>
  </el-form-item>
  </el-form>
  </div>
</template>


<script>
import ajax from "../../../static/js/ajax";
import regs from "../../../static/js/regs";
import validation from "../../../static/js/validation";
export default {
  data() {
      var confirmPassword = (rule, value, callback) =>{
          if (this.form.confirmPassword.trim()!==this.form.password.trim())
          {return callback(new Error(validation.confirmPassword));}
          else{
              callback();
          }
      };
      return {
        
        form:{
          userName:'',
          linkTele:'',
          password: '',
          confirmPassword: '',
          birthday:'',
          email:'',
          mobileNo:'',
          qq:'',
          realName:'',
          sex:'male',
          userNo:'',
          weixin:''
        },
        rules:{
            userName:[
              {required:true, message:'请输入登陆账号', trigger:'blur'},
              {pattern:regs.userName, message:validation.userName, trigger:'blur'},
          ],
            mobileNo:[
              {required:true, message:'请输入手机', trigger:'blur'},
              {pattern:regs.mobile, message:validation.mobile, trigger:'blur'},
          ],
          password:[
              {required:true, message:'请输入密码', trigger:'blur'},
              {pattern:regs.password, message:validation.password, trigger:'blur'},
          ],
          confirmPassword:[
              {required:true, message:'请输入确认密码', trigger:'blur'},
              {validator:confirmPassword, message:validation.confirmPassword, trigger:'blur'},
          ],
          email:[
              {required:true, message:'请输入邮箱', trigger:'blur'},
              {pattern:regs.email, message:validation.email, trigger:'blur'},
          ],
          linkTele:[
              {required:false},
              {pattern:/^0[0-9]{2,3}-[0-9]{8}/, message:'请输入正确的座机号码(四位区号+八位座机号码)', trigger:'blur'},
          ],
          qq:[
              {required:false},
              {pattern:/[1-9][0-9]{4,14}/, message:'qq号为第1位1-9之间，第2位0-9之间，长度为4-14位', trigger:'blur'},
          ],
          realName:[
              {required:true, message:'请输入真实姓名', trigger:'blur'},
              {pattern:/\w{1,}/, message:'姓名为至少一个字符', trigger:'blur'}, 
          ],
          weixin:[
              {required:false},
              {pattern:/^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/, message:'微信号为6-20个字母、数字、下划线或减号，以字母开头', trigger:'blur'},
          ],
          birthday:[
              {required:false},
              {type:"date", message:validation.date, trigger:'blur'},
          ]
        }  
        }
        ;
  },
    mounted(){},  
    methods: {
      
       submit(){
           if(!regs.userName.test(this.form.userName.trim())){
               this.$message.error(validation.userName);
               return;
           }
           if(!regs.mobile.test(this.form.mobileNo.trim())){
               this.$message.error(validation.mobile);
               return;
           }  
           if(!regs.password.test(this.form.password.trim())){
               this.$message.error(validation.password);
               return;
           }
           if(this.form.password.trim()!==this.form.confirmPassword.trim()){
               this.$message.error(validation.confirmPassword);
               return;
           }
           if(!regs.email.test(this.form.email.trim())){
               this.$message.error(validation.email);
               return;
           }
           if(this.form.linkTele.trim()&&!/^0[0-9]{2,3}-[0-9]{8}/.test(this.form.linkTele.trim())){
               this.$message.error('请输入正确的座机号码(四位区号+八位座机号码)');
               return;
           }
           if(this.form.qq.trim()&&!/[1-9][0-9]{4,14}/.test(this.form.qq.trim())){
               this.$message.error('qq号为第1位1-9之间，第2位0-9之间，长度为4-14位');
               return;
           }
           if(!/\w{1,}/.test(this.form.realName.trim())){
               this.$message.error('姓名为至少一个字符');
               return;
           }
           if(this.form.userNo.trim()&&!/\d{1,}/.test(this.form.userNo.trim())){
               this.$message.error('工号为至少1位数字');
               return;
           }
           if(this.form.weixin.trim()&&!/^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/.test(this.form.weixin.trim())){
               this.$message.error('微信号为6-20个字母、数字、下划线或减号，以字母开头');
               return;
           }
           ajax({
               url:"http://192.168.1.114:8080/mockjs/2/user/register",
               type:"post",
               data:{
                   userName: this.form.userName.trim(),
                   mobileNo: this.form.mobileNo.trim(),
                   password: this.form.password.trim(),
                   confirmPassword: this.form.confirmPassword.trim(),
                   birthday: this.form.birthday,
                   email:    this.form.email.trim(),
                   linkTele: this.form.linkTele.trim(),
                   qq:       this.form.qq.trim(),
                   realName: this.form.realName.trim(),
                   sex:      this.form.sex.trim(),
                   userNo:   this.form.userNo.trim(),
                   weixin:   this.form.weixin.trim(),
               },
               success:(result)=>{
                   this.$message({
                       message: '注册成功',
                       type: 'success'
                   });
                   window.location.herf="../login";
               },
               error:(xhr, errorCode, message)=>{
                   alert('发生错误：' + errorCode);
                   console.log(message);
               }
           })
       
       }     }}
</script>
>


<<style>
body{
    background:whitesmoke;
}
.main {
    border: solid white 1px;
    width: 555px;
    height: 832px;
    left: 35%;
    top: 5%;
    position: absolute;
    background:white;
}
.main label{
    width:100px;
    text-align:right;
    margin-right:60px;
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
.el-form-item__label {
    text-align: center;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #5a5e66;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    left: 82px;
    position: absolute;
}
.main .el-input__inner {
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
    margin-left: 145px;
}
.block input{
    width:259px;
}
.checkCodeButton{
    margin-right:-53px;
    margin-left:23px;
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
.datePicker{
    left:20px;
    width:260px!important;
}
.male{
    margin-left:135px;
}
.female{
    margin-left:10px;
}
.main .el-radio+.el-radio {
    margin-left: -45px;
}
.main .el-input__icon {
    height: 100%;
    width: 25px;
    text-align: center;
    -webkit-transition: all .3s;
    transition: all .3s;
    line-height: 40px;
    margin-left: 115px;
}
.el-picker-panel {
    color: #5a5e66;
    border: 1px solid #dfe4ed;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    background: #fff;
    border-radius: 4px;
    line-height: 30px;
    margin: 5px 0;
    margin-left: 115px;
}
.button .el-button {
    margin-left: 255px;
}
</style>
>