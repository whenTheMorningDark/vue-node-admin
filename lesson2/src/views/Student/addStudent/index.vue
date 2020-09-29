<template>
  <div>add

    <el-button @click="clickFun">home</el-button>
    <el-button @click="clickFun1">b</el-button>
  </div>
</template>

<script>
export default {
  name: "addStudent",
  methods: {
    clickFun () {
      this.$router.push({
        path: "/home"
      });
    },
    clickFun1 () {
      this.$router.push({
        path: "/Student/delStudent"
      });
    }
  }
};
</script>

<style>
</style>