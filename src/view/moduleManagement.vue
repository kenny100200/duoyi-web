<template>
 <el-container>
  <el-main>
  <!--顶部搜索框,重置、添加按钮-->
 <div>
 <el-row>
 <el-form :model="model" >
 <el-col :span="10">
 <div style="margin-right:1rem;">
  <el-input placeholder="请输入内容" v-model="moduleSreach.name" class="input-with-select" size="mini">
  <el-button slot="append" icon="el-icon-search" @click="sreach" size="mini"></el-button>
  </el-input>
</div>
 </el-col>
 <el-col :span="2">
 <el-button class="el-icon-refresh" type="info" size="mini" @click="reset">重置</el-button>
 </el-col>
 <el-col :span="2">
 <el-button class="el-icon-plus" type="primary" size="mini" @click="opensavedialog()">添加模块</el-button>
 </el-col>
 </el-form>
 </el-row>
  </div>
  <!--顶部搜索框,重置、添加按钮结束-->
  <!--数据表格-->

  <grid :url="url" style="margin-top:1rem" border :params="params">
  <el-table-column prop="icon" label="图标">
  <template slot-scope="scope">
  <i :class="scope.row.icon" style="font-size:24px; position: relative;
    top: 3px;"></i>
  </template>
  </el-table-column>
  <el-table-column prop="name" label="菜单名称"></el-table-column>
  <el-table-column prop="status" label="状态">
       <template slot-scope="scope">
 {{scope.row.status=="ENABLE"?"启用":"禁用"}}
  </template>
  </el-table-column>
  <el-table-column label="操作">
  <template slot-scope="scope">
  <el-button type="primary" size="mini" @click="opensavedialog(scope.row)">编辑</el-button>
  <el-button size="mini" @click="moduleDelete(scope.row.id)">删除</el-button>
  </template>
  </el-table-column>
  </grid>

<!--数据表格结束-->
<!--添加模块弹出框-->
<el-dialog :title="moduletitle" :visible.sync="addmoduledialog" center>
<el-form :model="model" label-width="100px" :rules="rules">
<el-form-item label="图标:">
<el-button @click="openIconDialog"  v-model="model.icon"  type="primary" size="small">弹出图标选择</el-button>
 <i :class="model.icon" style="position: relative;
    top: 3px; font-size:24px;"></i>
</el-form-item>
<el-form-item label="菜单名称:" prop="name">
<el-input v-model="model.name"></el-input>
</el-form-item>
<el-form-item label="状态:">
<el-switch v-model="model.status">
</el-switch>
</el-form-item>
<el-form-item>
<el-button  @click="addmoduledialog=false">取消</el-button>
<el-button type="primary" @click="save">保存</el-button>
</el-form-item>
</el-form>
</el-dialog>
<!--添加模块弹出框结束-->

<!--图标弹出框-->
<iconChose :dialogVisible="dialogVisible" @cancel="dialogVisible=false"  @ok="chosed" style="margin-top:-7vh"></iconChose>
<!--图标弹出框-->

<!--确定弹出框-->
<el-dialog title="确定删除" :visible.sync="deletedialog" center>
<span slot="footer" class="dialog-footer">
    <el-button @click="deletedialog = false">取 消</el-button>
    <el-button type="primary" @click="deleteConfirm">确 定</el-button>
  </span>
</el-dialog>
<!--确定弹出框结束-->
  </el-main>

</el-container>
</template>

<script>
import ajax from '../../static/js/ajax'
import regs from '../../static/js/regs'
import validation from '../../static/js/validation'
import httpUrl from '../../static/config/http.js'
import grid from "../components/grid/index.vue"
import iconChose from "../components/iconChose/index.vue";//选择图标
import unit from '../../static/js/unit'
export default {
  data() {
    return {
      icon:'',
       url:httpUrl.pro+"/module/page",
       addmoduledialog:false,   //添加模块弹出框
       deletedialog:false,      //确定删除弹出框
       moduleID:null,           //模块临时ID
       dialogVisible:false,//图标选择窗口
       iconName:"",//当前选中的图标
       model:{           //模块管理
       displayOrder:"",  //顺序
       icon:"",          //图标
       id:null,          //模块ID
       name:"",          //模块名称
       status:"",        //状态
       },
       moduletitle:"",  //添加修改标题
       moduleSreach:{    //查询
        name:"",
       },
       params:{
        name:""
      },
      rules:{
        name:[{required: true, message: "必须填写", triggle: "blur"}]
      }
       
    };
  },
   mounted(){
 //this.sreach();  //模块查询
  },
 components: {
    grid: grid,
     'iconChose':iconChose
  },
  methods: {
      /**
      重置
       */
       reset:function(){
           for( var item in this.moduleSreach){
               this.moduleSreach[item]="";
           }
       },


    /**
    查询模块
     */
sreach:function(){
     this.params=unit.clone(this.moduleSreach);
},
/**
添加,编辑弹出框
 */
    opensavedialog:function(oldmodel){
        if(oldmodel){
           this.model = (oldmodel);                        //修改的时候id赋值给model
            this.moduletitle="修改模块";               //title修改
            this.addmoduledialog=true;                //打开弹出框
          

        }else{
            for( var item in this.model){              //新增的时候把model的值清空 
            this.model[item]="";
            if(item=="status")
          {
            this.model[item]=true;
          }
            }
           this.moduletitle="添加模块";                 //title添加
            this.addmoduledialog=true;                  //打开弹出框
        }
    },
    /**
    保存数据
     */
   save:function(event){

       ajax({
           url:httpUrl.pro+"/module/save",
           type:"post",
           data:this.model,
           success:(result)=>{
            if(result.succesds){               
               this.sreach();
                this.addmoduledialog=false;
                
            }
            if(this.model.id){
              this.$message({
            message:'修改成功',
            type:'success'
          });
            }else{
              this.$message({
            message:'添加成功',
            type:'success'
          });
            }

           },
           error:(xhr, errorCode, message)=>{
          alert('发生错误：' + message);
        }
       })
   },
   /**
   删除某一行
    */
    moduleDelete:function(id){
   this.moduleID=id;
   this.deletedialog=true;
    },
    deleteConfirm:function(){
        ajax({
            url:httpUrl.pro+"/module/delete",
            type:"delete",
            data:{id:this.moduleID},
            success:(result)=>{
            this.deletedialog=false;
            this.sreach();          
            },
            error:(xhr, errorCode, message)=>{
          alert('发生错误：' + message);
        }
        })
    },
      /**图标 */
    openIconDialog(){//打开图标
      this.dialogVisible=true;
    },
    chosed(iconName)
    {//选中图标后确定
      //当前选中的图标
      this.model.icon=iconName;

      this.dialogVisible=false;
    }

  }
}
</script>

<style scoped>

</style>
