<template>
  <div class="app-main">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'appMain',
}
</script>

<style lang="less" scoped>
.app-main {
  width: calc(100% - 210px);
  height: 200px;
  background: red;
  margin-left: 210px;
}
</style>
