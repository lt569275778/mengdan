<template>
  <div id="myChart" style="width：600px;height:600px"/>
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

    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
    // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: { text: '报表' },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true
        }]
      })
    }
  }
}
</script>

