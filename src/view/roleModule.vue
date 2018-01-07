<template>
 <el-container>

   
  <el-main>
  <el-form ref="model" :model="model" size="mini">
  <div>
  <el-row>
 <el-col :span="24">
 <ul class="modulerow">
 <li>所有角色:</li>
 <li v-for="(item,index) in Charactergrid" :key="index" :model="model">
 <div>
 <el-tag >
 {{item.name}} 
 <i class="el-icon-edit" @click="addRole(item)"></i>
 <i class="el-icon-delete" @click="deleteModule(item.id)"></i>
 </el-tag>
</div>
 </li>
 </ul>
 </el-col>
 </el-row>
 <el-row>
 <el-col :span="6">
  <div style="margin-right:10px;">

  <el-input placeholder="请输入内容" v-model="CharacterSearch.name" size="mini">    
  <el-button slot="append" icon="el-icon-search"  @click="searchRole"></el-button>
  </el-input>

 </div>
 </el-col>
 <el-col :span="4">   
    <el-button type="info"  size="mini" @click="addRole()">添加角色</el-button>
 </el-col>
 </el-row>
 <!--添加角色弹出框-->
<el-dialog :title="addRoleDialogTitle" :visible.sync="addRoleDialog" width="35%" center>

  <el-form :model="model"  label-width="100px" :rules="rules">
<el-form-item label="角色名称:" prop="name">
<el-input v-model="model.name" placeholder="请输入角色名称"></el-input>
</el-form-item>


<el-form-item label="状态:">
<el-switch v-model="model.status" >
</el-switch>
</el-form-item>
</el-form>
<el-form-item style="margin-left:100px;">
<el-button @click="addRoleDialog=false">取消</el-button>
<el-button type="primary" @click="addEDitRoleSave">保存</el-button>
</el-form-item>

</el-dialog>

<!--表格-->

  <grid  :url="url" :params="params" style="width: 100%; margin-top:20px;" >
   <el-table-column prop="name" label="角色名称"></el-table-column>
  <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="primary" @click="roleDetailSearch(scope.row.id)">权限分配</el-button>
      </template>
    </el-table-column>
  </grid>

<!--表格结束-->

 <!--添加角色弹出框结束-->
 
  </div>
  <!--添加权限分配弹出框-->
  <el-dialog :visible.sync="powerDistributionDialog" width="90%" center>
  <el-form :model="model" label-width="90px">
<!--数据表格-->

  <grid  ref="grid" :url="urlPowerMenuList" :pagination="false" :params="paramsPowerMenu">
   <el-table-column label="模块"  >
  <template slot-scope="scope">
     <el-checkbox border :label="scope.row.name" v-model="scope.row.checked"  ></el-checkbox>
  </template>
   </el-table-column>
  <el-table-column label="菜单"  >
  <template slot-scope="scope">
     
     <el-checkbox border 
     v-for="menu in scope.row.menus" 
     v-model="menu.checked" 
     :name="scope.row.name"  
     size="mini"  
     :key="menu.name"  
     :label="menu.name">
     </el-checkbox>
  
  
  </template>
  </el-table-column>
  </grid>
<!--数据表格结束-->
  <el-button @click="powerDistributionDialog=false">取消</el-button>
  <el-button type="primary" @click="poweDistributionAddr" >保存</el-button>
</el-form>
</el-dialog>
<!--添加权限分配弹出框结束-->

<!--确定删除弹出框-->
  <el-dialog title="确定删除" center  :visible.sync="deleteDialog" width="30%" >
  <el-form>
  <div style="padding-left:100px;">
  <el-form-item>
  <el-button type="primary" @click="confirmDelete">确定删除</el-button>
  </el-form-item>
  </div>
</el-form>
</el-dialog>
<!--确定删除弹出框结束-->

  </el-form>
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
export default {
  data() {
    return {
      url:httpUrl.pro+"/role/page",
      urlPowerMenuList:httpUrl.pro+"/power/menuList",
      addRoleDialog: false, //添加角色弹出框
      addRoleDialogTitle: "", //添加角色弹出框标题
      powerDistributionDialog: false, //权限分配弹出框
      deleteDialog: false, //删除弹出框
      deleteID: null, //删除临时ID
      model: {
        //角色管理(添加)
        name: "", //角色名称
        id: null, //角色ID
        remark: "", //角色备注
        status: true, //角色状态
        users: "" //用户列表
      },
      CharacterSearch: {
        //角色分页查询
        name: ""
      },
      rolePermissions: {
        roleid: null
      },
       params:{
        name:""
      },
      paramsPowerMenu:{
        name:""
      },
      Charactergrid: [], //添加角色数组
      //roleTable: [], //角色表格
      childrenChecked: [],
        moduleMenuData:[],//查询所有模块和菜单  
      roleDetail: {}, //当前角色详情，包含模块菜单权限
      rules:{
        name:[{ required: true, message: "必须填写", triggle: "blur"}]
      },
      
    };
  },
  mounted() {
    this.search();//角色查询
    this.modulesMenusSearch();//模块与菜单查询
  },
  methods: {
      /**查询角色 */
    searchRole:function(){
      this.params=unit.clone(this.CharacterSearch);
    },
    

    /**
      添加模块
       */
    addRole: function(id) {
      console.log(this.model.id);
      if (id) {
        //修改的时候将原来的数据模型赋值给model
        this.model = id;
        this.addRoleDialogTitle = "修改角色";
        this.addRoleDialog = true;
      } else {
        //新增的时候将model中的值清空
        for (var key in this.model) {
          this.model[key] = "";
          if(key=="status"){
            this.model[key]=true;
          }
        }
        this.addRoleDialogTitle = "添加角色";
        this.addRoleDialog = true;
      }
    },

    /** 
    添加修改角色保存
    */
    addEDitRoleSave: function() {
      ajax({
        url: httpUrl.pro + "/role/save",
        type: "post",
        data: this.model,
        success: result => {
          this.addRoleDialog = false;
          this.search();
          this.$message({
            message: "添加成功",
            type: "success"
          });
        },
        error: (xhr, errorCode, message) => {
          alert("发生错误：" + message);
        }
      });
    },

    /**
    删除其中一个模块
     */
    deleteModule: function(id) {
      this.deleteID = id;
      this.deleteDialog = true;
    },
    confirmDelete: function() {
      console.log(this.deleteID);
      ajax({
        url: httpUrl.pro + "/role/delete",
        type: "delete",
        data: {
          id: this.deleteID
        },
        success: result => {
          this.deleteDialog = false;
        },
        error: (xhr, errorCode, message) => {
          alert("发生错误：" + message);
        }
      });
    },

    /**
    角色查询
     */
    search: function() {
      ajax({
        url: httpUrl.pro + "/role/page",
        type: "post",
        data: {
          name: this.CharacterSearch.name,
          pageIndex: 1,
          pageSize: 20,
          sortName: "id",
          sortOrder: "desc"
        },
        success: result => {
          this.Charactergrid = result.data;
        }
      });
    },

    /**
    保存数据,修改
     */
    poweDistributionAddr: function(event) {

  //拿this.moduleMenuData放到roleDetail中保存到后台
    
       
      this.roleDetail.modules=this.moduleMenuData.filter(item=>{
           
           if(item.checked)
           {
              item.menus = item.menus.filter(subitem=>{

                return subitem.checked;
                })
            return true;
           }
           else {
             return false;
           }

       })
      
      ajax({
        url: httpUrl.pro + "/role/save",
        type: "post",
        data: {
          modules:  this.roleDetail
        },
        success: result => {
          if (result.success) {
             this.powerDistributionDialog = false;
            this.search();
          }
          this.$message({
            message: "添加成功",
            type: "success"
          });
        },
        error: (xhr, errorCode, message) => {
          alert("发生错误：" + message);
        }
      });
    }, 
    /**模块与菜单查询 */
  modulesMenusSearch(){
      ajax({
          url: httpUrl.pro + "/power/menuList", //
          type:"get",
          success:(result)=>{
              this.moduleMenuData=result.data;
              
          }
      })
  },
 
    /**
 * 角色详情查询
 * @param {*} id 角色id
 */
    roleDetailSearch(id) { 
      ajax({
        url: httpUrl.pro + "/role/detail",
        type: "get",
        data: {
          id: id
        },
        success: result => {
          this.roleDetail = result.data;
          this.modulesIndex();//处理权限的问题
          this.powerDistributionDialog = true;
        }
      });
    },

    /**
     * 判断是否存在这个模块权限
 
     */
    modulesIndex() { 
      this.moduleMenuData.forEach(moduleItem=>{
        
        if (this.roleDetail.modules) {
          //先判断是不是空的
          for(let i=0;i<this.roleDetail.modules.length;i++)
          {
            //得到当前的模块是否被选中
            moduleItem.checked=this.roleDetail.modules[i].id == moduleItem.id;
            //判断菜单
            moduleItem.menus.forEach(menuItem=>{
             
              for(let j=0;j<this.roleDetail.modules[i].menus.length;j++)
              {
                   menuItem.checked=this.roleDetail.modules[i].menus[j].id == menuItem.id;
                   break;//已经找到这个菜单，中断
              }
            })
            break;//已经找到这个模块，中断
          }
      }
      })
      //复制，一定要
      this.moduleMenuData=unit.clone(this.moduleMenuData);
      
    },
  },
  components: {
    grid: grid
  }
};
</script>

<style scoped>
.modulerow {
  float: left;
  padding: 0;
}
.modulerow li {
  float: left;
  list-style: none;
  margin-right: 1rem;
  line-height: 27px;
}
.modulerow div {
  float: left;
}
iframe {
  border: none;
}
.tableLI li {
  list-style: none;
  float: left;
  margin: 0 5px;
}
</style>
