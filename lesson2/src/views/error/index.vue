<template>
  <div>
    error
    <el-button @click="clickFun">a</el-button>
    <el-button @click="clickFun1">b</el-button>
  </div>
</template>

<script>
export default {
  name: "error",
  methods: {
    clickFun () {
      this.$router.push({
        path: "/Student/addStudent"
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