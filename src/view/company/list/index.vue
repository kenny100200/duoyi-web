<template>
  <div>
<el-form :inline="true" :model="searchModel" class="demo-form-inline">
  <el-form-item label="公司名称" >
    <el-input v-model="searchModel.companyName" size="mini" placeholder="公司名称"></el-input>
  </el-form-item>
   <el-form-item label="状态">
    <el-select v-model="searchModel.status" placeholder="" size="mini">
      <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value"></el-option>
   
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" size="mini" @click="onSearch">查询</el-button>
  </el-form-item>
</el-form>
  <grid :url="url" :columns="columns" >

       <el-table-column label="操作" >
      <template slot-scope="scope">
        <el-button size="mini" >分配</el-button>
        <el-button size="mini" type="danger" >审核</el-button>
        
      </template>
    </el-table-column>
  </grid>
  </div>
</template>
<script>
import data from "./data";
import methods from "./methods";
export default {
   mixins:[methods,data]
 
}
</script>
<style scoped>

</style>

