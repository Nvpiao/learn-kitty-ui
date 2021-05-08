<template>
  <div class="head-bar">
    <div class="header-left">
      <!--  导航菜单隐藏显示切换  -->
      <span class="collapse-switcher" @click.prevent="collapse">
        <i class="el-icon-menu"/>
      </span>

<!--      <span class="hamburger-container">-->
<!--        <hamburger :toggleClick="collapse" :isActive="collapse"></hamburger>-->
<!--      </span>-->

      <!--  导航菜单  -->
      <span class="nav-bar">
        <el-menu :default-active="activeIndex" class="el-menu-demo"
                 background-color="#4b5f6e" text-color="#fff" active-text-color="#ffd04b"
                 mode="horizontal" @select="selectNavBar">
          <el-menu-item index="1" @click="$router.push('/')">{{ $t('common.home') }}</el-menu-item>
          <el-menu-item index="2">{{ $t('common.doc') }}</el-menu-item>
          <el-menu-item index="3">{{ $t('common.msgCenter') }}</el-menu-item>
        </el-menu>
      </span>
    </div>


    <div class="header-right">
      <span class="tool-bar">
        <!-- 主题切换 -->
        <theme-picker class="theme-picker"></theme-picker>
        <!--   语言切换   -->
        <lang-selector class="lang-selector"></lang-selector>
        <!--   用户信息   -->
        <el-dropdown class="user-info-dropdown" trigger="hover">
          <span class="el-dropdown-link">
            {{ username }}
            <img :src="this.userAvatar" alt=""/>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>{{ $t('common.myMsg') }}</el-dropdown-item>
            <el-dropdown-item>{{ $t('common.config') }}</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">{{ $t('common.logout') }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </div>
  </div>
</template>

<script>
  import mock from '@/mocks/index'
  import router from '@/router'
  import Cookies from 'js-cookie'
  import ThemePicker from '@/components/ThemePicker'
  import LangSelector from '@/components/LangSelector'
  import {COLLAPSE} from "@/store/mutation_types";
  import Hamburger from "@/components/Hamburger";

  export default {
    name: "HomeBar",
    components: {
      Hamburger,
      ThemePicker,
      LangSelector
    },
    data() {
      return {
        username: 'Ming',
        userAvatar: '',
        activeIndex: "1"
      }
    },
    methods: {
      selectNavBar(key, keyPath) {
        console.log(key, keyPath)
      },
      collapse() {
        this.$store.commit(COLLAPSE)
      },
      logout() {
        this.$confirm('确认退出么？', '退出提示', {
          type: "warning"
        }).then(() => {
          Cookies.remove('token')
          sessionStorage.removeItem('user')
          router.push('/login')
        }).catch(() => {
        })
      }
    },
    mounted() {
      let user = sessionStorage.getItem('user')
      if (user) {
        this.username = user
        this.userAvatar = require('@/assets/user.png')
      }
    }
  }
</script>

<style lang="scss" scoped>

  @mixin flex-center-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @mixin flex-start-center {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  @mixin hover-pointer-darker {
    background: rgb(60, 76, 88);
    cursor: pointer;
  }

  .head-bar {
    height: 60px;
    background-color: #4b5f6e;
    width: 100%;
    @include flex-start-center;
    justify-content: space-between;

    .header-left{
      @include flex-start-center;

      .collapse-switcher {
        @include flex-center-center;
        :hover {
          @include hover-pointer-darker
        }

        height: 60px;
        width: 40px;
        border: solid 1px #d3d4d6;
      }
    }

    .tool-bar {
      @include flex-start-center;

      .lang-selector:hover {
        @include hover-pointer-darker
      }

      .theme-picker {
        margin: 0 0 0 10px;
      }

      .user-info-dropdown {
        height: 60px;
        padding: 0 0 0 10px;
        @include flex-center-center;

        :hover {
          @include hover-pointer-darker
        }

        .el-dropdown-link{
          @include flex-center-center;
          height: 60px;
          color: white;
          img {
            margin: 10px 10px 10px 10px;
            height: 40px;
            border-radius: 10px;
          }
        }
      }
    }
  }

</style>
