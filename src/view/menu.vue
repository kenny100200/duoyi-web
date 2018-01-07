<template>
 <el-container>
 

  <el-main>
  <el-form ref="model" :model="model" size="mini">
  <div class="menu_top">

<el-form-item>
<el-col :span="10">
<div style="margin-right:1rem;">
  <el-input placeholder="请输入内容" v-model="searchModel.name" class="input-with-select">
    <el-button slot="append" icon="el-icon-search"  @click="search"></el-button>
  </el-input>
  </div>
</el-col>

      <el-col :span="2">
    <el-button class="el-icon-refresh" @click="reset" type="info">重置</el-button>
    </el-col>
      <el-col :span="2">
  <el-button class="el-icon-plus" v-model="model.id" @click="openSaveDialog()" type="primary" >添加</el-button>
  </el-col>
  </el-form-item>
<!--添加弹出框-->
  <el-dialog :title="dialogTitle" :visible.sync="addEditDialog" width="80%" center>
  <el-form :model="model"  label-width="90px" :rules="rules">
  <el-form-item label="图标:" >
 <el-button @click="openIconDialog" v-model="model.icon" type="primary" size="small">弹出图标选择</el-button>
   <i :class="model.icon" style="position: relative;
    top: 3px; font-size:24px;"></i>
    </el-form-item>
    <el-form-item label="模块:" prop="moduleId" >
  <el-select  placeholder="请选择模块" v-model="model.moduleId" style="width:100%;" @change="selectChecked">
      <el-option
       v-for="item in moduleSelect"      
        :key="item.name"
        :label="item.name"
        :value="item.id">
         </el-option>
    </el-select>
    <div class="selectChecked">{{selectTitle}}</div>
    </el-form-item>
  <el-form-item label="菜单名称:" prop="name">
  <el-input v-model="model.name"  placeholder="请输入菜单名称"></el-input>
    </el-form-item>
  <el-form-item label="菜单地址:" prop="formUrl">
  <el-input v-model="model.formUrl" placeholder="请输入URL地址"></el-input>
    </el-form-item>
    <el-form-item label="菜单顺序:" prop="displayOrder">
  <el-input-number v-model="model.displayOrder" placeholder=""></el-input-number>
    </el-form-item>
    <el-form-item label="备注:" >
  <el-input type="textarea" v-model="model.remark" placeholder="备注"></el-input>
    </el-form-item>
    <el-form-item label="状态:">
    <el-switch v-model="model.status"  >
</el-switch>
    </el-form-item>
    <el-form-item>
    <el-button @click="addEditDialog=false">取消</el-button>
  <el-button type="primary" @click="save">确 定</el-button>
  </el-form-item>
</el-form>
</el-dialog>
<!--添加弹出框结束-->

<!--图标弹出框-->
<iconChose :dialogVisible="dialogVisible" @cancel="dialogVisible=false"  @ok="chosed" style="margin-top:-7vh"></iconChose>
<!--图标弹出框-->

<!--删除弹出框-->
  <el-dialog title="确定删除？" :visible.sync="dialogComfirm" width="30%" center>
  <span slot="footer" class="dialog-footer">
  <el-button >取 消</el-button>
    <el-button type="primary" @click="deleteComfirm">确 定</el-button>
  </span>
</el-dialog>
<!--删除弹出框结束-->
  </div>
  </el-form>

<grid :url="url" :params="params" >
<el-table-column prop="iconName" label="图标">
  <template slot-scope="scope">
  <i :class="scope.row.icon" style="font-size:24px;"></i>
  </template>
</el-table-column>
<el-table-column prop="moduleId" label="模块名称">
  <template slot-scope="scope">
    <span>{{getModuleName(scope.row.moduleId)}}</span>
    </template>
</el-table-column>
<el-table-column prop="name" label="菜单名称" ></el-table-column>
<el-table-column prop="formUrl" label="菜单地址" ></el-table-column>
<el-table-column prop="remark" label="备注"></el-table-column>
<el-table-column prop="status" label="状态">
   <template slot-scope="scope">
 {{scope.row.status=="ENABLE"?"启用":"禁用"}}
  </template>
</el-table-column>
    <el-table-column label="操作" >
      <template slot-scope="scope">
        <el-button size="mini" @click="openSaveDialog(scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="deleteRow(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </grid>
  </el-main>

</el-container>
</template>


<script>
import ajax from "../../static/js/ajax";
import regs from "../../static/js/regs";
import unit from "../../static/js/unit";
import validation from "../../static/js/validation";
import httpUrl from "../../static/config/http.js";
import grid from "../components/grid/index.vue";
import iconChose from "../components/iconChose/index.vue"; //选择图标
export default {
  data() {
    return {
      params: {
        name: ""
      },
      url: httpUrl.pro + "/menu/page",
      templateid: null, //临时的id
      dialogComfirm: false, //确定删除弹出框
      dialogTitle: "",
      addEditDialog: false, //添加编辑弹出框
      dialogVisible: false, //图标选择窗口

      searchModel: {
        name: ""
      },
      model: {
        id: null,
        displayOrder: "", //序号
        status: true, //状态
        moduleId: "", //模块ID,这里是id
        icon: "", //图标
        name: "", //菜单名称
        formUrl: "", //菜单地址
        remark: "" //备注
      },
      moduleSelect: [],
      selectTitle:"",

      rules: {
        name: [{ required: true, message: "必须填写", triggle: "blur" }],
        moduleId: [{type:'number', required: true, message: "必须填写", trigger: "blur" }],
        formUrl: [{ required: true, message: "url必需填写", triggle: "blur" }]
      }
    };
  },
  mounted() {
    this.modulesSelectSearch(); //模块查询
  },
  components: {
    grid: grid,
    iconChose: iconChose
  },
  methods: {
    /**
     * 重置
     */
    reset: function() {
      for (let item in this.searchModel) {
        this.searchModel[item] = "";
      }
    },

    /**查询 */
    search() {
      this.params = unit.clone(this.searchModel);
    },
    /**模块查询 */
    modulesSelectSearch: function() {
      ajax({
        url: httpUrl.pro + "/power/menuList",
        type: "get",
        success: result => {
          this.moduleSelect = result.data;
        },
        error: (xhr, errorCode, message) => {
          alert("发生错误：" + message);
        }
      });
    },

/** 查询模块验证*/
searchSelect:function(){
  if(this.model.moduleId==""){
      this.selectTitle="必填";
  }
},
/** 模块选中*/
selectChecked:function(){
  this.selectTitle="";
},
   
/**
 *获取模块名称
 */
    getModuleName(moduleId){
    
   let module=  this.moduleSelect.find(item=>{
     return item.id==moduleId;
    })

return module? module.name:"";
    },

    /**添加修改 */
    openSaveDialog: function(oldmodel) {
      if (oldmodel) {
        //修改的时候将原来的数据模型赋值给model
        this.model =(oldmodel);
        this.dialogTitle = "修改信息";
        this.addEditDialog = true;
         this.searchSelect();
      } else {
        //新增的时候将model中的值清空
        for (var key in this.model) {
          this.model[key] = ""; //清空
          if(key=="status")
          {
            this.model[key]=true;
          }
        }
        this.searchSelect();
        this.dialogTitle = "添加信息";
        this.addEditDialog = true;
      }
    },


    /**
  保存数据
 */
    save: function(evnet) {
 
      ajax({
        url: httpUrl.pro + "/menu/save",
        type: "post",
        data: this.model,
        success: result => {
          if (result.success) {
            this.search();
            this.addEditDialog = false;
          }
          if (this.model.id) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
          } else {
            this.$message({
              message: "添加成功",
              type: "success"
            });
          }
        },
        error: (xhr, errorCode, message) => {
          alert("发生错误：" + message);
        }
      });
    },
    /**
   删除某一行
    */
    deleteRow: function(id) {
      this.templateid = id;
      this.dialogComfirm = true;
    },

    deleteComfirm: function() {
      ajax({
        url: httpUrl.pro + "/menu/delete",
        type: "delete",
        data: { id: this.templateid },
        success: resilt => {
          this.dialogComfirm = false;
          this.search();
        },
        error: (xhr, errorCode, message) => {
          alert("发生错误：" + message);
        }
      });
    },
    /**图标 */
    openIconDialog() {
      //打开图标
      this.dialogVisible = true;
    },
    chosed(iconName) {
      //选中图标后确定
      //当前选中的图标
      this.model.icon = iconName;

      this.dialogVisible = false;
    }
  }
};
</script>

<style scoped>
.menu_top {
  width: 100%;
  float: left;
}
.table_title {
  background: #dedede;
  width: 100%;
  float: left;
  margin: 0;
  padding: 0;
}
.table_title2 {
  width: 100%;
  float: left;
  margin: 0;
  padding: 0;
}
.table_title li,
.table_title2 li {
  float: left;
  width: 100%;
  list-style: none;
}
.table_title div,
.table_title2 div {
  float: left;
  width: 30%;
}
.selectChecked{
  color: #fa5555;
    font-size: 12px;
    height: 0px;
    margin-top: -10px;
}
</style>
