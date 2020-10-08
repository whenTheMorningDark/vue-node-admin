<template>
  <div>
    <template v-if="!item.children||item.children.length === 0">
      <router-link :to="item.path">
        <el-menu-item :index="item.path">
          {{item.meta.title}}
          <!-- <item :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
                :title="generateTitle(onlyOneChild.meta.title)" /> -->
        </el-menu-item>
      </router-link>
    </template>
    <template v-else>
      <el-submenu ref="subMenu"
                  :index="item.path"
                  popper-append-to-body>
        <template slot="title">
          {{item.meta.title}}
          <!-- <item v-if="item.meta"
                :icon="item.meta && item.meta.icon"
                :title="generateTitle(item.meta.title)" /> -->
        </template>
        <sidebar-item v-for="child in item.children"
                      :key="child.path"
                      :is-nest="true"
                      :item="child"
                      :base-path="child.path" />
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'sidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
</style>