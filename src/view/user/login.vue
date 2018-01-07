<template>
  <div class="main">
 <el-form>
  <el-form-item label="账号">
    <el-input type="text" v-model="userName"></el-input>
  </el-form-item>
<el-form-item label="密码">
    <el-input type="password" v-model="password"></el-input>
  </el-form-item>
  <router-link to="/forgetPassword" class="fgt">忘记密码？</router-link>
  <el-button class="lgin"  v-on:click="login">登陆</el-button>
  <router-link to="/register" class="rgst">注册</router-link>
 </el-form>
  </div>
</template>


<script>
import ajax from "../../../static/js/ajax";
import regs from "../../../static/js/regs";
import validation from "../../../static/js/validation";
import http from "../../../static/config/http";
import { on } from "../../../static/js/event.js";
import unit from "../../../static/js/unit";
export default {
  data() {
    return {
      userName: "",
      password: ""
    };
  },
  mounted() {
    //先
    on(document, "keyup", event => {
      if (event.keyCode == 13) {
        this.login();
      }
    });
  },
  methods: {
    login() {
      //TOTO
      // if (!regs.userName.test(this.userName.trim())) {
      //   this.$message.error(validation.userName);
      //   return;
      // }
      // if (!regs.password.test(this.password.trim())) {
      //   this.$message.error(validation.password);
      //   return;
      // }

      if (this.userName.trim() && this.password.trim()) {
        ajax({
           url: http.pro + "/login.htm",
        
          type: "post",
          data: {
            userName: this.userName.trim(),
            password: this.password.trim()
          },
          success: result => {
            this.$message({
              message: "登陆成功",
              type: "success"
            });
            window.localStorage.setItem(
              "userInfo",
              JSON.stringify(result.data)
            );
            window.localStorage.setItem("shiroId",result.data.shiroId); 
            window.localStorage.setItem("uid",result.data.uid);
unit.cookies.set("shiroId",result.data.shiroId);
            window.location.href = "/";
          },
          error:(xhr, status, message)=> {
            this.$message({
              message: message,
              type: "error"
            });
          }
        });
      }
      else {
        this.$message({
              message: "不能为空",
              type: "error"
            });
      }
    }
  }
};
</script>

<style>
body {
  background-color: whitesmoke;
}
.el-form-item__content {
  float: left;
  padding-left: 0;
  font-size: 22px;
}
.el-input__inner {
  width: 100%;
}
.main {
  position: absolute;
  top: 20%;
  left: 35%;
  width: 400px;
  height: 300px;
  text-align: center;
  background-color: white;
  margin: auto;
  border-radius: 10px;
  border: solid white 1px;
}
.el-input {
  width: 100%;
  display: inline;
}
.lgin {
  margin-top: 20px;
  float: left;
  left: 173px;
  position: absolute;
}
.rgst {
  border: none;
  margin-top: 60px;
  background: none;
  font-size: 3px;
  margin-left: 10px;
  display: inline block;
  position: absolute;
  left: 270px;
  color: grey;
}
.rgst:hover,
.rgst:visited,
.rgst:focus,
.fgt:hover,
.fgt:visited,
.fgt:focus {
  background: none;
}
.el-form-item {
  margin-bottom: 22px;
  margin-left: 20%;
  margin-top: 10%;
}
.el-button + .el-button {
  margin-left: 40px;
}
.fgt {
  border: none;
  margin-top: -20px;
  background: none;
  font-size: 3px;
  margin-left: 10px;
  display: inline block;
  position: absolute;
  left: 235px;
  color: grey;
  float: left;
}
.el-button {
  line-height: 1;
}
</style>
