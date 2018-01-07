<template>
<div>
   <el-table
   
    :style="style"
    :border="border"  
    :height="height"
    :highlight-current-row="focusAble"
  
     :data="self_data"
    @current-change="focus"
    @sort-change="sort"
    >
     <el-table-column
     fixed
      type="index"
      :index="indexMethod"
      v-if="rowNumber"
      >
    </el-table-column>

       <el-table-column
       fixed 
      type="selection"
      width="55"
      v-if="selectAble"
      >
    </el-table-column>
     <el-table-column v-for="(column,index) in columns" :key="index"
      :fixed="column.fixed"
      :prop="column.name"
      :label="column.label"
      :sortable="column.sortable?'custom':false"
      :width="column.width">
    </el-table-column>
    <slot></slot>
  </el-table>
    <div class="pagination">
   
    <el-pagination 
    v-if="pagination"
      @size-change="pageSizeChange"
      @current-change="pageIndexChange"
      :current-page="self_pageIndex"
      :page-sizes="[10, 15, 20, 40,50,100]"
      :page-size="self_pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="self_total">
    </el-pagination>
  </div>
</div>
</template>
<script>
/**
 * @description 王志勇 2017-12-07 分页表格控件
 */
import methods from "./methods.js";
import data from "./data.js";
import props from "./props.js";
export default {
    
    mixins:[methods,data,props]
  }
</script>
<style scoped>
.pagination{
  text-align: right;
  margin-right: 15px;
}
</style>


