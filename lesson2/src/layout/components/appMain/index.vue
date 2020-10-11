<template>
  <div class="app-main">
    <navBar></navBar>
    <!-- <router-view /> -->
    <div class="app-main-container">
      <transition name="fade-transform"
                mode="out-in">
      <!-- <keep-alive> -->
        <router-view :key="key" />
      <!-- </keep-alive> -->
    </transition>
    </div>
  </div>
</template>

<script>
import navBar from '../navBar'
export default {
  name: 'appMain',
  components: {
    navBar
  },
  computed: {
    // cachedViews () {
    //   return this.$store.state.tagsView.cachedViews
    // },
    key () {
      return this.$route.path
    }
  }
}
</script>

<style lang="less" scoped>
.app-main {
  width: calc(100% - 210px);
  height: 100%;
  margin-left: 210px;
  .app-main-container{
    height: calc(100% - 50px);
  }
}
</style>
