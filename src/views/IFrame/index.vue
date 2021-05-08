<template>
  <div class="iframe-container">
    <iframe :src="src" scrolling="auto" frameborder="0" class="frame"></iframe>
  </div>
</template>

<script>
  export default {
    name: "IFrame",
    data() {
      return {
        src: ''
      }
    },
    methods: {
      resetSrc(url) {
        this.src = url
      }
    },
    mounted() {
      this.resetSrc(this.$store.state.iframe.iframeUrl)
    },
    watch: {
      $route: {
        handler(val, oldVal) {
          this.resetSrc(this.$store.state.iframe.iframeUrl);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .iframe-container {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: calc(100% - 34px);

    .frame {
      width: 100%;
      height: 100%;
    }
  }
</style>
