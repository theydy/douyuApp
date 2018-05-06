<template>
  <div class="home-page" ref="scroll">
    <div class="scroll-wrapper">
      <div v-if="isLoading" class="slilder-wrapper">
        <v-slider :banner="banner"></v-slider>
      </div>
      <div class="block"></div>
      <div v-if="isLoading" class="list-item-wrapper">
        <v-list-item :liveList="liveList"></v-list-item>
      </div>
    </div>
    <div v-if="!banner.length && !liveList.length" class="loading"><loading></loading></div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import slider from '@/components/slider/slider'
import itemList from '@/components/itemList/itemList'
import loading from '@/components/loading/loading'
import {getHomePage, getLive, ERROR_OK} from '@/apis/apis'
export default {
  data () {
    return {
      banner: [],
      liveList: [],
      flag: [false, false]
    }
  },
  computed: {
    isLoading () {
      return this.banner.length && this.liveList.length
    }
  },
  created () {
    this._getHomePage()
    this._getLive()
  },
  methods: {
    _getHomePage () {
      getHomePage().then((res) => {
        this.banner = res.banner
        if (this.isLoading) {
          this._initScroll()
        }
      })
    },
    _getLive () {
      getLive().then((res) => {
        if (res.error === ERROR_OK) {
          this.liveList = res.data
          if (this.isLoading) {
            this._initScroll()
          }
        }
      })
    },
    _initScroll () {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.scroll, {
          click: true
        })
      })
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  },
  components: {
    'v-slider': slider,
    'v-list-item': itemList,
    loading
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~@/common/stylus/base'
.home-page
  position: fixed
  width: 100%
  top: 40px
  bottom: 0
  background: #fff
  .slilder-wrapper
    width: 100%
    position: relative
    overflow: hidden
  .list-item-wrapper
    width: 100%
    position: relative
    overflow: hidden
</style>
