<template>
  <div class="page">
    <!--    <h2>Login Page</h2>-->
    <!--    <el-button @click="login()" type="primary">登陆</el-button>-->
    <el-card class="loginCard">
      <el-form :model="loginForm" class="loginForm" ref="loginForm" :rule="loginRules">
        <h3 class="title">系统登陆</h3>
        <el-form-item prop="account" class="loginFormItem">
          <el-input v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="loginFormItem">
          <el-input type="password" v-model='loginForm.password' auto-complete="false" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item class="loginFormItem">
          <el-button class="loginFormButton" type="primary" @click.native.prevent="reset">重置</el-button>
          <el-button class="loginFormButton" type="primary" :loading="loading" @click.native.prevent="login">登陆
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import mock from '@/mocks'
  import Cookies from 'js-cookie'
  import router from '@/router'

  export default {
    name: "Login",
    data() {
      return {
        loading: false,
        loginForm: {
          account: 'admin',
          password: '123456'
        },
        loginRules: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      login() {
        let userInfo = {account: this.loginForm.account, password: this.loginForm.password}
        this.$api.login.login(JSON.stringify(userInfo)).then(res => {
          Cookies.set('token', res.data.token)
          sessionStorage.setItem('user', userInfo.account)
          router.push('/')
        }).catch(err => {
          alert(err)
        })
      },
      reset() {
        this.$refs.loginForm.resetFields()
      }
      // login() {
      //   this.$api.login.login().then( res => {
      //     alert(res.data.token)
      //     Cookies.set('token', res.data.token)
      //     router.push('/')
      //   }).catch(res => {
      //     alert(res)
      //   })
      // }
    }
  }
</script>

<style lang="scss" scoped>
  .loginCard {
    text-align: center;
    width: 30%;
    margin: 0 auto;

    h3 {
      font-size: 40px;
    }

    .loginFormItem {
      margin: 20px 20px;
    }

    .loginFormButton {
      width: 46%;
    }
  }
</style>
