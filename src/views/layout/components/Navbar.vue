<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb />
    <div class="navselect">
      <el-select v-model="value" clearable placeholder="选择项目" size="small" @change="changesubject">
        <el-option
          v-for="item in subject"
          :key="item.value"
          :label="item.nameZH"
          :value="item.id"
        />
      </el-select>
      <div class="twoselect">
        <el-select v-model="value1" clearable placeholder="选择环境" size="small" @change="changeScience " >
          <el-option
            v-for="item in ids"
            :key="item.value"
            :label="item.nameZH"
            :value="item.id"/>
        </el-select>
      </div>
      <el-select v-model="value2" clearable placeholder="选择平台" size="small" @change="changeplatform">
        <el-option
          v-for="item in platform"
          :key="item.value"
          :label="item.nameZH"
          :value="item.id"/>
      </el-select>
    </div>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img src="../../../../static/timg.jpg" class="user-avatar">
        <i class="el-icon-caret-bottom"/>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">注销</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>

</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { constantRouterMap, asyncRouterMap } from '../../../router/index.js'
// import * as api from '@/api/api'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      value: '',
      value1: '',
      value2: '',
      objs: ''
      // platform: []
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ]),
    ...mapState({
      subject: state => state.page.subject,
      ids: state => state.page.ids,
      platform: state => state.page.platform
    })
  },
  mounted() {
    this.getSubject()
    // if (this.value1 !== '') {
    //   this.changeplatform()
    // }
  },
  methods: {
    ...mapActions([
      'getSubject'
    ]),
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LOGOT').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
        sessionStorage.removeItem('menu')
        this.$router.push('/dashboard')
      })
    },
    // 切换项目
    changesubject(e) {
      this.$store.dispatch('subproject', this.value)
      if (this.value !== '') {
        this.changeScience()
      }
    },
    // 切换环境
    changeScience(e) {
      const obj = {
        subid: this.value,
        envid: this.value1
      }
      localStorage.setItem('twoid', JSON.stringify(obj))
      this.objs = obj
      this.$store.dispatch('getplatform', obj)
      this.$store.dispatch('getpageform', obj)
      this.$store.dispatch('getgrourplist', obj)
    },
    // 切换平台
    changeplatform(e) {
      var threeid = {}
      threeid.platformid = this.value2
      Object.assign(threeid, this.objs)
      this.$store.dispatch('getmenulists', threeid)
      const newrouter = constantRouterMap.concat(asyncRouterMap)
      sessionStorage.setItem('menu', JSON.stringify(newrouter))
      // this.$store.state.menu1 = newrouter
      // sessionStorage.setItem('menu', JSON.stringify({ 'path': '/secondRouter', 'component': 'kk' }))// 保存路由

      console.log(this.$store.state.menu1)

      this.$router.addRoutes(newrouter)
      this.$store.commit('MEUN_LIST', newrouter)
      // this.$router.push({ path: '/dashboard' })
      this.$router.push({ path: '/permiss' })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .navselect{
    display: inline-block;
   position: absolute;
   top:0px;
   right: 0px;
   margin-right: 150px;
  }
  .twoselect{
    display: inline-block;
    margin-left:25px;
    margin-right:25px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

