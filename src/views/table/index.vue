<template>
  <div class="app-container">
    <div class="block">
      <span>页面结构</span>
      <el-select v-model="value1" clearable placeholder="请选择">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </div>
    <div class="block">
      <span>页面名</span>
      <el-select v-model="value2" clearable placeholder="请选择">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </div>
    <div class="block">
      <span>页面状态</span>
      <el-select v-model="value3" clearable placeholder="请选择">
        <el-option
          v-for="item in options3"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </div>
    <div class="block">
      <span>是否被连接</span>
      <el-select v-model="value4" clearable placeholder="请选择">
        <el-option
          v-for="item in options4"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </div>
    <div class="block">
      <span>分组</span>
      <el-cascader
        :options="options5"
        placeholder="试试搜索：指南"
        clearable
        filterable
        change-on-select
      />
    </div>
    <div class="block">
      <el-button type="success">搜索</el-button>
    </div>
    <div class="btnadd">
      <el-button type="success" @click="addpage">添加页面</el-button>
    </div>
    <div>
      <el-table
        ref="singleTable"
        :data="pageform"
        border
        resizable
        highlight-current-row
        style="width: 100%"
        @current-change="handleCurrentChange">
        <el-table-column
          prop="id"
          label="序号"/>
        <el-table-column
          property="structrue"
          label="页面结构">
          <template slot-scope="scope">
            <a href="javascript:;">{{ scope.row.structrue===1?'表格':'图表' }}</a>
          </template>
        </el-table-column>
        <el-table-column
          property="title"
          label="标题"/>
        <el-table-column
          property="onlineStatus"
          label="页面状态">
          <template slot-scope="scope">
            <a href="javascript:;">{{ scope.row.onlineStatus===false?'未上线':'上线' }}</a>
          </template>
        </el-table-column>
        <el-table-column
          property="linkedStatus"
          label="是否被连接">
          <template slot-scope="scope">
            <a href="javascript:;">{{ scope.row.linkedStatus===false?'未连接':'已连接' }}</a>
          </template>
        </el-table-column>
        <el-table-column
          property="menu_id"
          label="页面分组"/>
        <el-table-column
          property="created_at"
          label="创建时间"/>
        <el-table-column
          property="modified_at"
          label="修改时间"/>
        <el-table-column
          property="comment"
          label="备注"/>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click.native.prevent="modifyRow(scope.row.id, pageform)">
              编辑
            </el-button>
            <el-button
              type="text"
              size="small"
              @click.native.prevent="deleteRow(scope.row.id)">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <addpages :show="show" :formdata="formdata" :title="title" @listencancle="listenchilren"/>
  </div>
</template>
<script>
import '../../styles/page.scss'
import addpages from './addpage.vue'

import { deletepageid } from '@/api/api'
import { mapState } from 'vuex'
export default {
  components: {
    addpages
  },
  data() {
    return {
      // dialog 状态
      show: false,
      title: '添加页面',
      objs: '',
      formdata: {},
      options1: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }],
      value1: '',
      options2: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }],
      value2: '',
      options3: [{}],
      value3: '',
      options4: [{}],
      value4: '',
      options5: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }],
      currentRow: null,
      tableData: []
    }
  },
  computed: {
    ...mapState({
      pageform: state => state.page.pageform
    })
  },
  methods: {
    handleCurrentChange(val) {
      console.log(val)
      this.currentRow = val
    },
    addpage() {
      this.show = true
      this.formdata = {}
      this.title = '添加页面'
      console.log(this.show)
    },
    listenchilren(data) {
      if (data === true) {
        this.show = false
      }
    },

    // 修改
    modifyRow(data) {
      this.formdata = {
        name: '1234'
      }
      this.title = '编辑页面'
      this.show = true
    },
    // 删除
    deleteRow(data) {
      console.log(data)
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletepageid(data).then(res => {
          console.log(res.data)
        })
        // this.$store.dispatch('deletepageidlist', data).then(res => {
        //   if (res.code === 200) {
        //     this.$message({
        //       type: 'success',
        //       message: '删除成功!'
        //     })
        //   } else {
        //     this.$message({
        //       type: 'success',
        //       message: res.msg
        //     })
        //   }
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
