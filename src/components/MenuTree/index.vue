<template>
  <el-submenu v-if="menu.children && menu.children.length >= 1" :index="menu.id + ''">
    <template slot="title">
      <i :class="menu.icon"/>
      <span slot="title">{{ menu.name }}</span>
    </template>
    <menu-tree v-for="item in menu.children" :key="item.id" :menu="item"></menu-tree>
  </el-submenu>
  <el-menu-item v-else :index="menu.id + ''" @click.native="handleRoute(menu)">
    <!--    <template slot="title">-->
    <i :class="menu.icon"/>
    <span slot="title">{{ menu.name }}</span>
    <!--    </template>-->
  </el-menu-item>
</template>

<script>
  import {getIFramePath} from '@/utils/iframe'
  export default {
    name: "MenuTree",
    props: {
      menu: {
        type: Object,
        required: true
      }
    },
    methods: {
      handleRoute(menu) {
        let url = getIFramePath(menu.url)
        if (!url) {
          url = menu.url
        }
        this.$router.push('/' + url)
      }
    }
  }
</script>

<style scoped>

</style>
