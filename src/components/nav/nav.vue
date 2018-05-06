<template>
  <div class="nav">
    <div class="logo-wrapper" @click="returnHomePage">
      <div class="logo"></div>
    </div>
    <div class="right-tab">
      <div class="search"  @click="toggleSearchCover">
        <span class="fa-search">搜索</span>
      </div>
      <div class="aside" @click="toggleAsideCover">
        <span class="fa-aside">分类</span>
      </div>
    </div>
    <transition name="search-fade">
      <div class="search-cover" v-show="search" @click="toggleSearchCover">
        <div class="input-wrapper">
          <input v-model="inputValue" @click.stop class="search-input" type="text" placeholder="通过房间号跳转">
          <button @click.stop="searchRoom" class="search-submit">搜索</button>
        </div>
      </div>
    </transition>
    <transition name="aside-fade">
      <div class="aside-cover" v-show="aside && cate1Info.length" @click="toggleAsideCover">
        <div class="aside-type">
          <ul>
            <li @click.stop="selectedType('0')" class="aside-cate border-1px">
              <span>全部</span>
              <span class="icon"></span>
            </li>
            <li v-for="(item, idx) in cate1Info" :key="idx" @click.stop="selectedType(item.cate1Id)" class="aside-cate border-1px">
              <span>{{item.cate1Name}}</span>
              <span class="icon"></span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import {getCategory} from '@/apis/apis'
import {mapMutations} from 'vuex'
const ALL = '0'
export default {
  data () {
    return {
      search: false,
      aside: false,
      inputValue: '',
      selectType: ALL,
      typeList: [],
      cate1Info: [],
      cate2Info: []
    }
  },
  created () {
    this._getCategory()
  },
  methods: {
    _getCategory () {
      getCategory().then((res) => {
        this.cate1Info = res.cate1Info
        this.cate2Info = res.cate2Info
        this.setTypeList(this.cate2Info)
      })
    },
    selectedType (cate1Id) {
      this.selectType = cate1Id
      this.typeList = this.filterTypeList()
      this.setTypeList(this.typeList)
      this.setSelectType(['LOL', '英雄联盟'])
      this.$router.push('/category')
    },
    filterTypeList () {
      if (this.selectType === ALL) {
        return this.cate2Info
      }
      let result = []
      this.cate2Info.forEach((item) => {
        if (item.cate1Id === this.selectType) {
          result.push(item)
        }
      })
      return result
    },
    toggleSearchCover () {
      this.search = !this.search
      this.inputValue = ''
    },
    toggleAsideCover () {
      this.aside = !this.aside
    },
    searchRoom () {
      if (!this.inputValue) {
        alert('输入不能为空。')
        return false
      }
      if (isNaN(Number(this.inputValue))) {
        alert('输入只能为数字。')
        return false
      }
      this.search = !this.search
      this.$router.push('/detail/' + this.inputValue)
    },
    returnHomePage () {
      this.$router.push('/home')
    },
    ...mapMutations({
      setTypeList: 'SET_TYPE_LIST',
      setSelectType: 'SET_SELECT_TYPE'
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~@/common/stylus/base'
.nav
  box-sizing: border-box
  width: 100%
  height: 40px
  padding: 0 3px
  font-size: 0
  background: #000
  overflow: hidden
  .logo-wrapper
    float: left
    margin-top: 7px
    width: 50px
    height: 40px
    vertical-align: top
    .logo
      background: url("./douyu.png") left top no-repeat
      width: 60px
      height: 25px
      background-size 173px 111px
  .right-tab
    float: right
    height: 40px
    .search
      display: inline-block
      margin-right: 16px
      height: 40px
      .fa-search
        position: relative
        text-align: center
        margin-left: 25px
        line-height: 40px
        font-size: 16px
        color: #efefef
        &:before
          content: ''
          position: absolute
          left: -27px
          top: -2px
          width: 30px
          height: 30px
          background: url(./douyu-icon.png) -260px top no-repeat
          background-size: 284px 25px
    .aside
      display: inline-block
      margin-right: 16px
      height: 40px
      .fa-aside
        position: relative
        text-align: center
        margin-left: 25px
        line-height: 40px
        font-size: 16px
        color: #efefef
        &:before
          content: ''
          position: absolute
          left: -27px
          top: -2px
          width: 24px
          height: 30px
          background: url(./douyu-icon.png) -237px top no-repeat
          background-size: 284px 25px
  .search-cover
    position: fixed
    z-index: 20
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: rgba(7, 17, 27, .6)
    opacity: 1
    .input-wrapper
      position: absolute
      top: 100px
      left: 10%
      width: 80%
      text-align center
      .search-input
        display: inline-block
        width: 180px
        height: 28px
        outline: none
        padding-left: 5px
        vertical-align: top
        border: none
        color: rgba(83, 148, 236, .8)
        font-size: 16px
      .search-submit
        width: 60px
        height: 30px
        outline: none
        vertical-align: top
        border: none
        font-size: 14px
        color: #fff
        background: rgba(83, 148, 236, .4)
    &.search-fade-enter-active, &.search-fade-leave-active
      transition: all .3s
    &.search-fade-enter, &.search-fade-leave-to
      opacity: 0
  .aside-cover
    position: fixed
    z-index: 20
    top: 0
    left: 0
    width: 100%
    height: 100%
    opacity: 1
    .aside-type
      float: right
      height: 100%
      width: 220px
      background: #000
      ul
        list-style: none
        margin: 5px 0 0 0
        padding: 0 12px
        .aside-cate
          position: relative;
          line-height: 60px
          text-align: left
          color: #eee
          border-1px(rgba(255, 255, 255, .3))
          .icon
            position: absolute
            right: 20px
            top: 20px
            width: 18px
            height: 18px
            border-radius: 50%
            background: lightcoral
            &:after
              content: ''
              position: absolute
              left: 2px
              top: 4px
              width: 8px
              height: 8px
              border-top: 1px solid black
              border-left: 1px solid black
              border-right: 1px solid transparent
              border-bottom: 1px solid transparent
              transform: rotate(135deg)
    .aside-type
      font-size :12px
    &.aside-fade-enter-active, &.aside-fade-leave-active
      transition: all .3s
    &.aside-fade-enter, &.aside-fade-leave-to
      opacity: 0
      transform: translate3d(100%, 0, 0)
</style>
