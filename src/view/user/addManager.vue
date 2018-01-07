<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="date"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="province"
      label="省份"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="市区"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="邮编"
      width="120">
    </el-table-column>
    
    <el-table-column prop="option" label="操作" fixed="right" width="150" >
          <template slot-scope="scope">
            <el-button type="primary" class="el-button el-button--default el-button--mini" @click="dialog(scope.row.id)"><span>编辑</span></el-button>
            <el-button type="primary" class="el-button el-button--danger el-button--mini" @click="openDel(scope.row.id)"><span>删除</span></el-button><br/>
            <el-button type="primary" class="el-button el-icon-refresh el-button--info el-button--mini" @click="openRstPsw(scope.row.id)" style="10px"><span>重置密码</span></el-button>
            <el-switch style="display: block" v-model="scope.row.status" :on-value="true" :off-value="false" active-color="#13ce66" inactive-color="#ff4949" active-text="启用" inactive-text="禁用" @change="a(scope.row.id)">
           </el-switch>
          </template>
        </el-table-column>
  </el-table>
</template>

<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

    data() {
      return {
        tableData: [{
            id:1,
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          status:'0'
        }, {
            id:2,
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          status:'0'
        }, {
            id:3,
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          status:'0'
        }, {
            id:4,
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          status:'0'
        }]
      }
    },
    mounted(){console.log(this.tableData.status)},
    methods:{
        a:function(id){
            
            //console.log(event)
            console.log(this.tableData[id-1].status)
        }
    }
  }
</script>

<<style scoped>

</style>
