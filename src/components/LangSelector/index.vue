<template>
  <el-dropdown class="lang-selector" @command="handleCommand">
    <span class="el-dropdown-link">
      <span id="language">中文</span><i class="el-icon-arrow-down el-icon--right"/>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh:中文">中文</el-dropdown-item>
      <el-dropdown-item command="en:English">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  export default {
    name: "LangSelector",
    methods: {
      handleCommand(command) {
        let comds = command.split(':')
        let lang = comds[0] === '' ? 'zh' : comds[0]
        document.getElementById('language').innerHTML = comds[1]
        this.$i18n.locale = lang
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

  .lang-selector {
    @include flex-center-center;
    width: 65px;
    height: 60px;
    color: white;
    margin: 0 0 0 10px;
  }
</style>
