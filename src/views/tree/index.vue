<template>
  <div class="app-container">
    <forms :fromdatass="pagestructure"/>
    <tables v-if="pagestructure.structrue==1" :fromdatass="pagestructure" />
    <echarts v-if="pagestructure.structrue==2" :fromdatass="pagestructure"/>
  </div>
</template>

<script>
import '../../styles/tree.scss'
import echarts from './echart.vue'
import forms from './form.vue'
import tables from './table.vue'
import { mapState } from 'vuex'
import { constantRouterMap, asyncRouterMap } from '../../router/index.js'

export default {
  components: {
    echarts,
    forms,
    tables
  },
  data() {
    return {
      fromdata: {
        'id': 0, // 0为新增，其他为修改对应id的页面
        'title': '标题',
        'comment': '注释，可以写一些页面功能方面的解释，也可以不写',
        'structrue': 2, // 1是form+table(基本)，2是form+chart（基本）
        'channelEnable': 3, // 可填0-3，channel采用多级联动方式，0表示不要，3表示3级别联动
        'dateEnable': false,
        'dateRangeEnable': true,
        'defaultDateRange': 30,
        'table': 'r_active_crelogin',
        'columnFilter': [
          ['type', '=', 1],
          ['device', '!=', 'ios']
        ],
        'columns': [{
          'nameEN': 'fdate',
          'nameZH': '日期',
          'webFilter': false,
          'linkFilter': false
        }, // bgFilter是后台过滤的意思，使用bgFilter会使该列不展示在前端
        {
          'nameEN': 'dau',
          'nameZH': '日活',
          'webFilter': true,
          'linkFilter': false
        },
        {
          'nameEN': 'register_cnt',
          'nameZH': '注册人数',
          'webFilter': false,
          'linkFilter': true,
          'link': {
            'id': 10,
            'params': ['fdate']
          }
        }
        ],
        'proccess': []
      }
    }
  },
  computed: {
    ...mapState({
      pagestructure: status => status.page.pagestructure
    })
  },
  created() {
    const pageid = 2
    this.$store.dispatch('getpagestructure', pageid)
    console.log(this.pagestructure)
  },
  mounted() {
    const newrouter = constantRouterMap.concat(asyncRouterMap)
    sessionStorage.setItem('menu', JSON.stringify(newrouter))
  },
  methods: {

  }
}

</script>
