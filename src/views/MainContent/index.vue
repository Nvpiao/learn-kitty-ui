<template>
  <div class="container">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
        {{item.name}}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'Main'
  }
</script>

<style lang="scss" scoped>
  .breadcrumb {
      //margin: 10px 0 10px 10px;
      padding: 10px 0 10px 10px;
    }
</style>
