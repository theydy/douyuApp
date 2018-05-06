<template>
  <div class="item-list">
    <div class="content-wrapper">
      <div v-for="(item, idx) in liveList" :key="idx" class="item-room" @click="goto(item.room_id)">
        <div class="wrapper">
          <img v-lazy="item.room_src">
          <div class="online">{{item.online}}</div>
          <div class="desc">
            <div class="nickname">{{item.nickname}}</div>
            <div class="name">{{item.room_name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    liveList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    goto (id) {
      this.$router.push({
        path: `/detail/${id}`
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.item-list
  font-size: 0
  width: 100%
  background: white
  .content-wrapper
    width: 100%
    &:after
      content: ''
      display: table
      clear: both
    .item-room
      position: relative
      box-sizing: border-box
      background: white
      width: 50vw
      float: left
      .wrapper
        padding: 0 5px
        overflow: hidden
        img
          border-radius: 10px
          width: 100%
          height: 30vw
        .online
          position: absolute
          top: 3px
          right: 10px
          font-size: 10px
          color: #fff
        .desc
          position: relative
          margin-bottom: 10px
          .nickname
            position: absolute
            top: -20px
            left: 10px
            font-size: 10px
            color: #fff
          .name
            margin: 4px 0 0 1px
            width: 100%
            font-size: 10px
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
</style>
