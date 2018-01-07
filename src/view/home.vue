<template>
  <div>
<header>
    <span class="logo">后台管理系统</span>
    <el-menu class="admin" mode="horizontal" >

  <el-submenu index="1" >
    <template slot="title">超级管理员</template>
    <el-menu-item index="2-1">个人信息</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
  </el-submenu>
</el-menu>
</header>
<el-row class="body">
  <el-col :span="3" style="height:100%;background:rgba(238,238,238,0.98);" >
      <el-menu
     
       style="background:rgba(238,238,238,0.98);"
      
     >
      <el-submenu  v-for="item in modules" v-bind:index="item.name" :key="item.name">
        <template slot="title">
          <i v-bind:class="item.icon"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item-group>
         
          <el-menu-item v-for="subitem in item.menus" v-bind:index="subitem.name"  :key="subitem.name"  v-on:click="addTab(subitem)">
              <i v-bind:class="subitem.icon" ></i>
           <span>{{subitem.name}}</span> </el-menu-item>
       
        </el-menu-item-group>
      </el-submenu>
     
    </el-menu>
  </el-col>
  <el-col :span="21" style="height:100%;">
    <el-tabs type="card" style="width:100%;height:100%;" closable   @tab-remove="removeTab" :value="activeTab">
  <el-tab-pane
    v-for="item in tabs"
    :key="item.name"
    :label="item.title"
    :name="item.name"
    closable
style="width:100%;height:100%;"
  >
   <span slot="label"><i v-bind:class="item.icon"></i> {{item.title}}</span>
   <iframe style="height:100%;width:100%;" v-bind:src="item.formUrl">

   </iframe>
  </el-tab-pane>
</el-tabs>
  </el-col>
</el-row>
  </div>
</template>

<script>
/**
 * @file 主页
 * @description 王志勇 2017-12-07 
 *  
 */


export default {

 data(){
   return {
     activeTab:"",
     modules:[],
     tabs:[]
   }
 },
 mounted(){
   let userInfo=window.localStorage.getItem("userInfo");
     
   if(userInfo)
   {
    
    
    this. modules=JSON.parse(JSON.parse(userInfo).modules);
   
    
   }
   else {
     if(window.parent)
     {
       window.parent.location.href="/login";
     }
     else {
         window.location.href="/login";
     }
   }

 },
 methods:{
     /**
    * 添加标签
    * 
    */
    addTab(menu)
    {
   
    let filter=this.tabs.filter((item)=>{
      return item.name==menu.name;
    })
    if(filter.length==0)
    {
      this.tabs.push({
        title:menu.name,
        name:menu.name,
        formUrl:menu.formUrl,
        icon:menu.icon,
      })
      this.activeTab=menu.name;
    }
    },
   /**
    * 移除标签
    * 
    */
   removeTab(targetName) {
      let newTabs=this.tabs.filter((item)=>{
        return item.name!=targetName;
      })
   
      this.tabs=newTabs;
   }
 }
}
</script>

<style >

header{
  height: 45px;
  width: 100%;
  background-color: #2d6dcc;
}
iframe{
  border: none;
}
.body{
  position: absolute;
  top:45px;
  bottom: 0px;
  width: 100%;
  overflow: hidden;
}
.admin{
  float: right;
  height:45px;
  margin-right: 40px;
  background-color:transparent;
  color:#fff;
}
.admin .el-submenu__title{
  color:#fff!important;
  height: 45px!important;
  line-height: 45px!important;
}
.admin .el-submenu__title:hover{
      background-color: rgba(255,255,255,0.2)!important;
}
.admin .el-submenu__title i{
  color:#fff!important;
}
.admin .el-menu{
      border: solid 1px #cccccc!important;
      width:65px!important;
      top:45px!important;
      box-shadow:none!important;
      overflow: hidden;
}
.el-menu li
{
      border-bottom: 1px solid #e5e5e5;
}
.el-menu-item-group__title{
  display: none;
}
.el-submenu .el-menu-item{
  min-width: 100px;
}
.logo{
      height: 44px;
    line-height: 44px;
    margin-left: 30px;
    display: inline-block;
    text-decoration: none;
    cursor: pointer;
    background-repeat: no-repeat;
    background-position: left center;
    background-size: auto 100%;
    color: #fff;
    font-size: 20px;
    position: relative;
  
}

.el-tabs__content {
  height: 100%!important;
}
.el-tabs__header{
  margin: 0px;
}
</style>
