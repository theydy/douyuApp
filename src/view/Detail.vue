<template>
  <iframe class="dy-inframe" frameborder="0" :src="roomId"></iframe>
</template>

<script type="text/ecmascript-6">
export default {
  computed: {
    roomId () {
      return '//m.douyu.com/' + this.$route.params.id
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.dy-inframe
  width: 100%
  height: 1050px
  overflow-x: hidden
  overflow-y: auto
</style>
