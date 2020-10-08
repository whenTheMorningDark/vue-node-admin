<template>
  <div class="navBar">
    <Hamburger class="hamburger-container"></Hamburger>
    <breadcrumb id="breadcrumb-container"
                class="breadcrumb-container" />
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

