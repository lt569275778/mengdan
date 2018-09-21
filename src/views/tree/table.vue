<template>
  <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" border>
    <el-table-column v-for="( item, index) in fromdatass.columns" :label="item.nameZH" :key="index" >
      <template slot-scope="scope">
        {{ scope.row.address }}
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    fromdatass: {
      type: null,
      required: true
    }
  },
  data() {
    return {
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        tag: '家'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 15123 弄',
        tag: '家'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        tag: '公司'
      }]
    }
  },
  methods: {
    formatter(row, column) {
      return row.address
    },
    filterTag(value, row) {
      return row.tag === value
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    filterc() {
      console.log(1234)
    }
  }
}
</script>
