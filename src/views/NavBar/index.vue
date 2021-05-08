<template>
  <div class="menu-bar-container">
    <!--  logo  -->
    <div class="logo" :style="{'background-color': themeColor}"
         :class="collapse ? 'menu-bar-collapse-width': 'menu-bar-width'"
         @click="$router.push('/')">
      <img :src="this.logo" alt=""/>
      <div> {{ collapse ? '' : appName }}</div>
    </div>
    <!--  导航菜单  -->
    <el-menu ref="nav-menu"  :class="collapse ? 'menu-bar-collapse-width': 'menu-bar-width'"
             :collapse="collapse" :collapse-transition="false" :unique-oppend="true"
             @open="handleOpen" @close="handleClose" @select="handleSelect">
      <menu-tree v-for="item in navTree" :key="item.menuId" :menu="item"></menu-tree>
    </el-menu>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import {SETNAVTREE} from "@/store/mutation_types";
  import MenuTree from '@/components/MenuTree'

  export default {
    name: "NavBar",
    components: {
      MenuTree
    },
    data() {
      return {
        logo: '',
        themeColor: '#4b5f6e'
      }
    },
    methods: {
      handleOpen() {
        console.log('handleOpen')
      },
      handleClose() {
        console.log('handleClose')
      },
      handleSelect(a, b) {
        console.log('handleSelect', a, b)
      }
    },
    computed: {
      ...mapState({
        appName: state => state.app.appName,
        collapse: state => state.app.collapse,
        navTree: state => state.menu.navTree
      })
    },
    mounted() {
      this.sysName = 'I Learn Kitty'
      this.logo = require('@/assets/logo.png')
    }
  }
</script>

<style lang="scss" scoped>
  .menu-bar-container {
    text-align: left;

    .logo {
      height: 60px;
      font-size: 20px;
      color: white;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      img {
        margin: 10px 10px 10px 10px;
        height: 40px;
      }
    }
  }
</style>
