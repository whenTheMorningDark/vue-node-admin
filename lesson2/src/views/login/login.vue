<template>
  <div class="login" v-loading="loading">
    <el-form ref="form" :model="form" class="login-form" :rules="rules">
      <div class="login-title">系统登陆</div>
      <el-form-item prop="username">
        <el-input v-model="form.username">
          <template slot="prepend">
            <i class="el-icon-user"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" show-password>
          <template slot="prepend">
            <i class="el-icon-setting"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-button type="primary" style="width:100%" @click="handCickLogin">
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/login'
export default {
  name: 'login',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          {
            required: true,
            message: '输入不能为空!',
            trigger: ['blur', 'change'],
          },
        ],
        password: [
          {
            required: true,
            message: '输入不能为空!',
            trigger: ['blur', 'change'],
          },
        ],
      },
      loading: false,
    }
  },
  methods: {
    handCickLogin() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          login(this.form).then((res) => {
            console.log(res)
            let code = res.code
            if (code === 0) {
              this.$message({
                message: res.message || '成功!',
                type: 'success',
              })
              // let token = res.data.token
              console.log(res.data)
              this.$store.dispatch('user/setBaseInfo', res.data)
              this.$router.push({
                path: '/',
              })
            } else {
              this.$message({
                message: res.message || '失败!',
                type: 'error',
              })
            }
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  .login-form {
    width: 520px;
    margin: 0 auto;
    padding-top: 120px;
    .login-title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      font-size: 20px;
      margin-bottom: 30px;
    }
  }
}
</style>
