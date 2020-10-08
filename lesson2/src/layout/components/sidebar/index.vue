<template>
  <div class="sidebar">
    <el-scrollbar class="z-h-100 scrollCls">
      <el-menu :default-active="activeMenu"
               class="sidebar-menu"
               :background-color="variables.menuBg"
               :text-color="variables.menuText"
               :unique-opened="false"
               :active-text-color="variables.menuActiveText"
               :collapse-transition="false"
               mode="vertical">
        <sidebarItem v-for="route in routes"
                     :key="route.path"
                     :item="route"
                     :base-path="route.path"></sidebarItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import variables from '@/styles/variables.scss'
import sidebarItem from './sidebarItem'
import { mapGetters } from 'vuex'
export default {
  name: 'sidebar',
  components: {
    sidebarItem
  },
  computed: {
    variables () {
      return variables
    },
    ...mapGetters(['routes']),
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
  },
}
</script>

<style lang="scss" scoped>
/* @import "~@/styles/mixin.scss"; */
@import "~@/styles/variables.scss";
.sidebar {
  width: 210px;
  height: 100%;
  float: left;
  background-color: $menuBg;
}
</style>
