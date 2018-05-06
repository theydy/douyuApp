import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    typeList: [],
    selectType: ['LOL', '英雄联盟']
  },
  getters: {
    typeList: (state) => state.typeList,
    selectType: (state) => state.selectType
  },
  mutations: {
    'SET_TYPE_LIST': (state, data) => {
      state.typeList = data
    },
    'SET_SELECT_TYPE': (state, data) => {
      state.selectType = data
    }
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
