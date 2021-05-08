<template>
  <div class="container">
    <el-container>
      <el-aside width="auto !important;" class="aside"
                :class="$store.state.app.collapse ? 'aside-collapse-width': 'aside-width'">
        <!-- 导航菜单栏 -->
        <nav-bar></nav-bar>
      </el-aside>
      <el-container>
        <el-header class="header">
          <!-- 头部区域 -->
          <head-bar></head-bar>
        </el-header>
        <el-main class="main">
          <!-- 主内容区域 -->
          <main-content></main-content>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import NavBar from '@/views/NavBar';
  import HeadBar from "@/views/HeadBar";
  import MainContent from '@/views/MainContent'

  export default {
    name: 'home',
    components: {
      NavBar,
      HeadBar,
      MainContent
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    height: 100%;

    .aside {
      height: 100%;

      &.aside-collapse-width {
        width: 65px;
      }

      &.aside-width {
        width: 200px;
      }
    }

    .main, .header {
      padding: 0;
    }
  }
</style>
