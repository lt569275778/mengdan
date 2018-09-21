<template>
  <div>
    <div class="pingtai">
      <el-select v-model="value4" clearable placeholder="选择渠道">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </div>
    <div v-if="fromdatass.dateEnable==false" class="block">
      <el-date-picker v-model="value1" type="date" placeholder="选择日期" />
    </div>
    <div v-else class="block">
      <el-date-picker
        v-model="value6"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"/>
    </div>
    <el-button type="success" class="btngreen" @click="submitform">提交</el-button>

    <div class="comment">
      <span>{{ fromdatass.comment }}</span>
    </div>
    <el-button v-if="fromdatass.structrue==1" type="success" class="btngreen" @click="exportExcel">下载excle</el-button>
  </div>
</template>
<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  props: {
    fromdatass: {
      type: null,
      required: true
    }
  },
  data() {
    return {
      value6: '',
      value1: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value4: ''
    }
  },
  methods: {
    exportExcel() {
      this.pagesize = '30' // 表格长度变长
      this.currentPage = '1'
      this.$nextTick(function() {
        const wb = XLSX.utils.table_to_book(document.querySelector('.el-table'))
        /* get binary string as output */
        const wbout = XLSX.write(wb, {
          bookType: 'xlsx',
          bookSST: true,
          type: 'array'
        })
        try {
          FileSaver.saveAs(new Blob([wbout], {
            type: 'application/octet-stream'
          }), '数据.xlsx')
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        this.pagesize = '10' // 表格还原
        return wbout
      })
    },
    submitform() {
      console.log(123)
    }
  }
}
</script>

