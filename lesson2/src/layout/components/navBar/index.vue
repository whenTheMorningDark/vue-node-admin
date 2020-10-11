<template>
  <div class="navBar">
    <Hamburger class="hamburger-container"></Hamburger>
    <breadcrumb id="breadcrumb-container"
                class="breadcrumb-container" />
    <div class="info">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          设置<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="layout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Hamburger from '@/components/hamburger'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'navBar',
  components: {
    Hamburger,
    Breadcrumb
  },
  methods: {
    layout() {
      this.$store.dispatch('user/setBaseInfo', {})
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.navBar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .info{
    position: absolute;
    right: 10px;
    top: 18px;
    cursor: pointer;
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .breadcrumb-container {
    float: left;
  }
}
</style>

