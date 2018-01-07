<template>
<div>
   <el-button @click="openIconDialog"    type="primary" size="small">弹出图标选择</el-button>
  <grid :columns="columns" :url="url" :params="params" >
 <el-table-column
      label="操作"
    >
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </grid>
 <iconChose :dialogVisible="dialogVisible" @cancel="dialogVisible=false" @ok="chosed"></iconChose>
  
  </div>
</template>
<script>
import grid from "../../components/grid/index.vue";
import iconChose from "../../components/iconChose/index.vue";//选择图标
import columns from "./virtualColumns.js";// 
import http from "../../../static/config/http"
export default {
  data(){
    return {
      dialogVisible:false,//图标选择窗口
      iconName:"",//当前选中的图标
      url:http.test+"/menu/page",//后台请求地址
      params:{//筛选参数
        name:"test"
      },
  columns:columns,//列
  
    }
  
  },
  methods:{
    openIconDialog(){//打开图标
      this.dialogVisible=true;
    },
    chosed(iconName)
    {//选中图标后确定
      //当前选中的图标
        this.iconName=iconName;
        console.log("选择的图标",this.iconName);
      this.dialogVisible=false;
    }
  },
  components: {
   
    'grid': grid,
    'iconChose':iconChose
  }
}
</script>
<style scoped>

</style>


