<template>
  <div class="site-wrapper site-page--not-found">
    <div class="site-content__wrapper">
      <div class="site-content">
        <h2 class="not-found-title">角色管理</h2>
        <p class="not-found-desc">这是角色管理页面</p>
        <el-button @click="$router.go(-1)">返回上一页</el-button>
        <el-button type="primary" class="not-found-btn-gohome" @click="$router.push('/')">进入首页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Role'
  }
</script>

<style lang="scss">
  .site-wrapper.site-page--not-found {

    .site-content {
      padding: 30px;
      text-align: center;
    }

    .not-found-title {
      margin: 0;
      font-size: 8em;
    }

    .not-found-desc {
      margin: 0 0 30px;
      font-size: 26px;
    }

    .not-found-btn-gohome {
      margin-left: 30px;
    }
  }
</style>
