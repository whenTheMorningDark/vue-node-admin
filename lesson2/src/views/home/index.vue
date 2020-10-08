<template>
  <div class="home z-h-100">
    <el-button @click="clickFun">a</el-button>
    <el-button @click="clickFun1">b</el-button>
    {{ user }}
    {{ user.username }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { getMenuData } from "@/api/home";
export default {
  name: 'index',
  created() {
    // this.getMenuDataFun();
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    clickFun() {
      this.$router.push({
        path: '/Student/addStudent',
      })
    },
    clickFun1() {
      this.$router.push({
        path: '/Student/delStudent',
      })
    },
  },
}
</script>

<style></style>
