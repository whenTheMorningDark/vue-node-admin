<template>
  <div class="app-wrapper z-h-100">
    <sidebar></sidebar>
    <appMain />
  </div>
</template>

<script>
import sidebar from './components/sidebar'
import appMain from './components/appMain'
export default {
  name: 'Layout',
  components: {
    sidebar,
    appMain,
  },
}
</script>

<style></style>
