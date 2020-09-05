<template>
  <div class="home z-h-100">
    home
  </div>
</template>

<script>
import { getHomeData } from '@/api/home'
export default {
  name: 'home',
  created() {
    getHomeData().then((res) => {
      console.log(res)
    })
  },
}
</script>

<style></style>
