<<template>
  <div class="alterUserInform">
    
      <el-form :model="alterUserInform" :rules="userInformRules" ref="alterUserInform">
        <el-row>
        <el-col :span="12">
          <el-form-item label="id">
              <el-input type="text" v-model="alterUserInform.id" disabled></el-input>
          </el-form-item>
         <!-- <el-form-item label="公众号">
              <el-input type="text" v-model="alterUserInform.openid" disabled></el-input>
          </el-form-item>-->
          <el-form-item label="姓名" prop="realName">
              <el-input type="text" v-model="alterUserInform.realName" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别">
              <template>
                <el-radio v-model="alterUserInform.sex" label="male">男</el-radio>
                <el-radio v-model="alterUserInform.sex" label="female">女</el-radio>
              </template>  
          </el-form-item>
          <el-form-item label="生日" prop="birthDate">
              <el-date-picker v-model="alterUserInform.birthDate" type="date" placeholder="选择日期" class="datePicker" value-format="yyyy-MM-dd">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="用户名" prop="userName">
              <el-input type="text" v-model="alterUserInform.userName" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="用户类型" prop="userType">
              <el-input type="text" v-model="alterUserInform.userType" disabled></el-input>
          </el-form-item>
          <!--<el-form-item label="角色" prop="roles">
              <el-input type="text" v-model="alterUserInform.roles" disabled></el-input>
          </el-form-item>-->
           
              </el-col>
              <el-col :span="12">
          <el-form-item label="工号" prop="userNo">
              <el-input type="text" v-model="alterUserInform.userNo" disabled></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="mobileNo">
              <el-input type="text" v-model="alterUserInform.mobileNo" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="座机" prop="linkTele">
              <el-input type="text" v-model="alterUserInform.linkTele" placeholder="请输入座机号码"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
              <el-input type="text" v-model="alterUserInform.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="微信" prop="weixin">
              <el-input type="text" v-model="alterUserInform.weixin" placeholder="请输入微信账号"></el-input>
          </el-form-item>
          <el-form-item label="qq" prop="qq">
              <el-input type="text" v-model="alterUserInform.qq" placeholder="请输入qq账号"></el-input>
          </el-form-item>
          </el-col>
    </el-row>
          <el-form-item label="角色" class="roles">
                <el-checkbox :indeterminate="alterUserInform.isIndeterminate" v-model="alterUserInform.checkAll" @change="handleCheckAllChange" disabled>全选</el-checkbox>
                <el-checkbox-group v-model="alterUserInform.checkedRoles" @change="handleCheckedRolesChange" disabled>
                <el-checkbox v-for="role in alterUserInform.roles" :label="role" :key="role.id" style="margin-left:5px" disabled>{{role.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
      </el-form>
    
  </div>
</template>

<<script>
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
          alterUserInform:{
              id:'',
              openid:'',
              realName:'',
              sex:'',
              birthDate:'',
              userName:'',
              userType:'',
              roles:[],
              userNo:'',
              mobileNo:'',
              linkTele:'',
              email:'',
              weixin:'',
              qq:'',
              checkAll:false,
              checkedRoles:[],
              roles:[],
              isIndeterminate:true,
          },
          userInformRules:{
            realName:[
              {required:true, message:'请输入姓名', trigger:'blur'},
            ],
            birthDate:[
              {type:'date', message:validation.date, trigger:'blur'}
            ],
            userName:[
              {required:true, message:'请输入用户名', trigger:'blur'},
            ],
            mobileNo:[
              {required:true, message:'请输入手机号码', trigger:'blur'},
              {pattern:regs.mobile, message:validation.mobile, trigger:'blur'}
            ],
            linkTele:[
              {pattern:/^0[0-9]{2,3}-[0-9]{8}/, message:'请输入正确的座机号码(四位区号+八位座机号码)', trigger:'blur'}
            ],
            email:[
              {pattern:regs.email, message:validation.email, trigger:'blur'}
            ],
            weixin:[
              {pattern:/^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/, message:'微信号为6-20个字母、数字、下划线或减号，以字母开头', trigger:'blur'}
            ],
            qq:[
              {pattern:/[1-9][0-9]{4,14}/, message:'qq号为第1位1-9之间，第2位0-9之间，长度为4-14位', trigger:'blur'}
            ]
          }
      }
  },
  mounted:function(){
    console.log(window.localStorage.getItem('uid'))
      this.$nextTick(function(){
          ajax({
              url:http.test+'/user/detail',
              type:'get',
              data:{
                  id:window.localStorage.getItem('uid')
              },
              success:(result)=>{
                  this.alterUserInform=unit.clone(result.data)
              },
              error:(xhr, errorCode, message)=>{
                  console.log(message)
              }
          })
      })
  },
  methods:{
    handleCheckAllChange(val) {
        this.alterUserInform.checkedRoles = val ? this.alterUserInform.roles : [];
        this.alterUserInform.isIndeterminate = false;
      },

     handleCheckedRolesChange(value) {
        let checkedCount = value.length;
        this.alterUserInform.checkAll = checkedCount === this.alterUserInform.roles.length;
        this.alterUserInform.isIndeterminate = checkedCount > 0 && checkedCount < this.alterUserInform.roles.length;
      },
    save:function(){
       if(!this.alterUserInform.realName.trim()){
         this.$message.error('请输入姓名');
         return;
       }
       if(!this.alterUserInform.userName.trim()){
         this.$message.error('请输入用户名');
         return;
       }
       if(!regs.mobile.test(this.alterUserInform.mobileNo.trim())){
         this.$message.error(validation.mobile);
         return;
       }
       if(this.alterUserInform.linkTele.trim()&&!/^0[0-9]{2,3}-[0-9]{8}/.test(this.alterUserInform.linkTele.trim())){
         this.$message.error('请输入正确的座机号码(四位区号+八位座机号码)');
         return;
       }
       if(this.alterUserInform.email.trim()&&!regs.email.test(this.alterUserInform.email.trim())){
         this.$message.error(validation.email);
         return;
       }
       if(this.alterUserInform.weixin.trim()&&!/^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/.test(this.alterUserInform.weixin.trim())){
         this.$message.error('微信号为6-20个字母、数字、下划线或减号，以字母开头');
         return;
       }
       if(this.alterUserInform.qq.trim()&&!/[1-9][0-9]{4,14}/.test(this.alterUserInform.qq.trim())){
         this.$message.error('qq号为第1位1-9之间，第2位0-9之间，长度为4-14位');
         return;
       }
       ajax({
         url:http.test+'#',
         type:'post',
         data:{
           data:this.alterUserInform,
         },
         success:(result)=>{
           this.$message({
             message:'保存成功',
             type:'success'
           })},
         error:(xhr, errorCode, message)=>{
            console.log(message)
          }
         
       })
    }
  }
}
</script>

<<style>
.alterUserInform .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 200px;
}
.alterUserInform .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #5a5e66;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 90px;
}
.alterUserInform{
  margin-left:30%;
  margin-top:2%;
  width:800px;
}
.alterUserInform .el-button {
    margin-left: 40%;
}
.alterUserInform .el-checkbox-group {
    font-size: 0;
    margin-left: 85px;
}
</style>
