<template>
  <div class="dashboard-container">
    <div class="dashboard-text">姓名:{{ personinfo.name }}</div>
    <div class="dashboard-text">权限:<span>{{ personinfo.role }}</span></div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Dashboard',
  data() {
    return {
    }
  },
  computed: {
    ...mapState(
      {
        personinfo: state => state.page.personinfo
      }
    )
  },
  created() {
    this.GetInfo()
  },
  methods: {
    ...mapActions([
      'GetInfo'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
