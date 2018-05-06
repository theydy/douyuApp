<template>
  <div id="app">
    <v-nav></v-nav>
    <keep-alive>
      <router-view class="view"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import nav from '@/components/nav/nav'
export default {
  name: 'App',
  components: {
    'v-nav': nav
  }
}
</script>

<style lang="stylus">
.view
  overflow: hidden
</style>
