<template>
  <div class="slider" @touchstart="start($event)" @touchend="end($event)">
    <van-swipe class="slider-group" :autoplay="3000">
      <van-swipe-item v-for="(item, idx) in banner" :key="idx" class="slider-item">
        <img v-lazy="item.pic_url" :data-idx="item.id">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script type="text/ecmascript-6">
import {Swipe, SwipeItem} from 'vant'
import Vue from 'vue'
Vue.use(Swipe).use(SwipeItem)
export default {
  data () {
    return {
      pageX: 0
    }
  },
  props: {
    banner: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    goto (event) {
      this.$router.push(`/detail/${event.target.dataset.idx}`)
    },
    start (event) {
      this.pageX = event.touches[0].pageX
    },
    end (event) {
      let offset = Math.abs(event.changedTouches[0].pageX - this.pageX)
      if (!(offset >= 10)) {
        this.goto(event)
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.slider
  width: 100%
  font-size: 0
  overflow: hidden
  position: relative
  .slider-group
    width: 100%
    white-space: nowrap
    display: inline-block
    .slider-item
      float: left
      box-sizing: border-box
      a
        display: block
        width: 100%
        overflow: hidden
        text-decoration: none
      img
        display: block
        width: 100%
</style>
