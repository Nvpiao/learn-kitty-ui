<template>
  <!--  <div class="page">-->
  <!--    <h2>Home Page</h2>-->
  <!--    <el-button type="primary" @click="testAxios">测试Axios调用</el-button>-->
  <!--    <el-button type="primary" @click="getUser">获取用户信息</el-button>-->
  <!--    <el-button type="primary" @click="getMenu">获取菜单</el-button>-->
  <!--  </div>-->
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="4" class="logo" :class="isCollapse ? 'logo-collapse-width' : 'logo-width'">
        <img class="image-left" :src="this.logo" alt=""/>
        {{ isCollapse ? sysName : sysName }}
      </el-col>
      <el-col :span="1">
        <div class="tools" @click.prevent="collapse">
          <i class="el-icon-menu"></i>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="headerNavBar">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
                   background-color="#4b5f6e" text-color="#fff" active-text-color="#ffd04b"
                   @select="handleSelectHeaderNavBar">
            <el-menu-item index="1">首页</el-menu-item>
            <el-menu-item index="2">消息中心</el-menu-item>
            <el-menu-item index="3">订单管理</el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="5" class="user-info">
        <span class="el-dropdown-link">
          <theme-picker></theme-picker>
        </span>
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link language-inner">
            {{ language }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">
            {{ userName }}<img class="image-right" :src="this.userAvatar" alt=""/>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <el-col :span="4">
        <aside class="aside">
          <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                   @select="handleSelect" :collapse="isCollapse">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">{{$t('sys.sysMng')}}</span>
              </template>
              <el-menu-item index="1-1" @click="$router.push('/user')">{{ $t("sys.userMng") }}</el-menu-item>
              <el-menu-item index="1-2" @click="$router.push('/menu')">{{ $t("sys.menuMng") }}</el-menu-item>
              <el-menu-item index="1-3" @click="$router.push('/dept')">{{ $t("sys.deptMng") }}</el-menu-item>
              <el-menu-item index="1-4" @click="$router.push('/role')">{{ $t("sys.roleMng") }}</el-menu-item>
              <el-menu-item index="1-5" @click="$router.push('/log')">{{ $t("sys.logMng") }}</el-menu-item>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </aside>
      </el-col>

      <el-col :span="20">
        <section class="content-container">
          <div class="grid-content bg-purple-light">
            <el-col :span="24" class="breadcrumb-container">
              <el-breadcrumb separator="/" class="breadcrumb-inner">
                <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                  {{ item.name }}
                </el-breadcrumb-item>
              </el-breadcrumb>
            </el-col>
            <el-col :span="24" class="content-wrapper">
              <transition name="fade" mode="out-in">
                <router-view></router-view>
              </transition>
            </el-col>
          </div>
        </section>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
  import router from '@/router'
  import ThemePicker from '@/components/ThemePicker'

  export default {
    name: "Home",
    components: {
      ThemePicker
    },
    data() {
      return {
        language: '中文',
        isCollapse: false,
        activeIndex: "1",
        sysName: null,
        logo: null,
        userName: null,
        userAvatar: null
      }
    },
    methods: {
      collapse() {
        this.isCollapse = !this.isCollapse
      },
      logout() {
        let _this = this
        this.$confirm("确认退出吗？", '提示', {
          type: "warning"
        }).then(() => {
          sessionStorage.removeItem('user')
          router.push('/login')
        }).catch(() => {
        })
      },
      handleSelectHeaderNavBar() {

      },
      handleSelect() {

      },
      handleOpen() {

      },
      handleClose() {

      },
      handleCommand(command) {
        let lang = command === '' ? 'zh' : command
        if (lang === 'zh') {
          this.language = '中文'
        } else {
          this.language = 'English'
        }
        this.$i18n.locale = lang
        localStorage.setItem('lang', lang)
      }
      // testAxios() {
      //   axios.get('http://localhost:8888')
      //   .then(res => {
      //     alert(res.data)
      //   }).catch(res => {
      //     alert(res)
      //   })
      // },
      // getUser() {
      //   axios.get('http://localhost:8899/user')
      //   .then(res => {
      //     alert(JSON.stringify(res.data))
      //   }). catch(res => {
      //     alert(res)
      //   })
      // },
      // getMenu() {
      //   axios.get('http://localhost:8899/menu')
      //     .then(res => {
      //       alert(JSON.stringify(res.data))
      //     }). catch(res => {
      //     alert(res)
      //   })
      // }
    },
    mounted() {
      this.sysName = 'Learn-Kitty'
      this.logo = require('@/assets/logo.png')
      let user = sessionStorage.getItem('user')
      if (user) {
        this.userName = user
        this.userAvatar = require('@/assets/user.png')
      }
      this.language = localStorage.getItem('lang') === 'zh' ? '中文' : 'English'
    }
  }
</script>

<style lang="scss" scoped>
  .container {

    .header {
      background-color: #4b5f6e;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .logo {
        height: 60px;
        font-size: 20px;
        color: white;
        border-width: 0 1px 0 0;
        border-style: solid;
        border-color: rgb(230, 230, 230);
        padding-left: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        &:hover {
          background: rgb(60, 76, 88);
        }
      }

      .user-info {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .el-dropdown-link {
          &.userinfo-inner, &.language-inner {
            color: white;
            height: 60px;
            font-size: 20px;
            padding: 0 20px 0 20px;
            display: flex;
            justify-content: flex-end;
            align-items: center;

            &:hover {
              background: rgb(60, 76, 88);
            }
          }

        }
      }

      img {
        margin: 0 10px 0 10px;
        height: 30px;
        border-radius: 10px;
      }
    }

    .main {
      .aside {
        text-align: left;
      }

      .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 226.550px; //宽度自己掌握
        height: 100%;
      }

      .content-container {
        margin: 10px 0 10px 10px
      }
    }
  }
</style>
