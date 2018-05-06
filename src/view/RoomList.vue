<template>
  <div class="room-list" ref="scroll">
    <div v-if="roomList.length" class="scroll-wrapper">
      <div class="title">标签分类: {{selectType[1]}}</div>
      <div class="list-item-wrapper">
        <v-list-item :liveList="roomList"></v-list-item>
      </div>
      <div class="load-more"><loading></loading></div>
    </div>
    <div v-if="!roomList.length" class="loading"><loading></loading></div>
  </div>
</template>

<script type="text/ecmascript-6">
import loading from '@/components/loading/loading'
import itemList from '@/components/itemList/itemList'
import BScroll from 'better-scroll'
import {getLiveByType, ERROR_OK} from '@/apis/apis'
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      roomList: [],
      isLoading: false,
      offset: 0,
      limit: 30
    }
  },
  computed: {
    ...mapGetters([
      'selectType'
    ])
  },
  components: {
    'v-list-item': itemList,
    loading
  },
  activated () {
    this.roomList = []
    this._getLiveByType()
  },
  methods: {
    _getLiveByType () {
      getLiveByType(this.selectType[0]).then((res) => {
        if (res.error === ERROR_OK) {
          this.roomList = res.data
          this.$nextTick(() => {
            this._initScroll()
          })
        }
      })
    },
    _initScroll () {
      this.scroll = new BScroll(this.$refs.scroll, {
        click: true
      })
      this.scroll.on('scrollEnd', (pos) => {
        // 下拉动作
        if (Math.abs(this.scroll.y) > Math.abs(this.scroll.maxScrollY) - 50) {
          this.loadData()
        }
      })
    },
    getMoreData () {
      this.offset = this.roomList.length
      getLiveByType(this.selectType[0], this.offset, this.limit).then((res) => {
        if (res.error === ERROR_OK) {
          this.roomList = this.roomList.concat(res.data)
          this.scroll.finishPullDown()
          this.$nextTick(() => {
            this.scroll.refresh()
            this.isLoading = false
          })
        }
      })
    },
    loadData () {
      if (!this.isLoading) {
        this.isLoading = true
        this.getMoreData()
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.room-list
  position: fixed
  width: 100%
  top: 40px
  bottom: 0
  background: #fff
  .scroll-wrapper
    width: 100%
    position: relative
    overflow: hidden
    .title
      font-size: 14px
      line-height: 20px
      margin: 4px
      font-weight 700
      color: brown
    .list-item-wrapper
      width: 100%
      position: relative
      overflow: hidden
    .load-more
      border-radius: 30px
      width: 100%
      height: 24px
      line-height: 24px
      text-align: center
      font-size: 20px
      color: lightskyblue
      background: #eee
      font-weight: 700
</style>
