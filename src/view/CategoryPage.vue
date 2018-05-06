<template>
  <div class="category-page" ref="scroll">
    <ul class="list" v-show="typeList && typeList.length > 0">
      <li class="item" v-for="(item, idx) in typeList" :key="idx" @click="jumpType(item.shortName, item.cate2Name)">
        <div class="content-wrapper">
          <div class="content">
            <img v-lazy="item.icon" class="image" width="60%" height="60%">
            <br>
            <span class="desc">{{item.cate2Name}}</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="loading" v-show="!typeList">请稍等。。。</div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import {mapGetters, mapMutations} from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'typeList'
    ])
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.scroll, {
      click: true
    })
    this.$nextTick(() => {
      this.scroll.refresh()
    })
  },
  methods: {
    jumpType (type, name) {
      this.selectType([type, name])
      this.$router.push('/roomlist')
    },
    ...mapMutations({
      selectType: 'SET_SELECT_TYPE'
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.category-page
  position: fixed
  width: 100%
  top: 40px
  bottom: 0
  overflow: hidden
  background: #f4f4f4
  ul
    padding: 0
    margin: 0
    list-style: none
  .list
    width: 100%
    font-size: 0
    .item
      display: inline-block
      box-sizing: border-box
      position: relative
      width: 33.333%
      padding-top: 33.3%
      text-align: center
      border: 1px dashed #ddd
      background: #f4f4f4
      .content-wrapper
        position: absolute
        top: 0
        left: 0
        bottom: 0
        right: 0
        .content
          position: absolute
          top: 50%
          left: 50%
          width: 100%
          height: 100%
          transform: translate3d(-50%, -50%, 0)
          .image
            border-radius: 50%
            margin:10% 0 7% 0
          .desc
            font-size: 12px
            line-height: 20px
            white-space: nowrap
            color: #000
            @media screen and (min-width: 768px)
              font-size: 20px
  .loading
    text-align center
    font-size 20px
</style>
