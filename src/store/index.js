import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    // 文本框的内容
    inputValue: 'aaa',
    nextid: 5,
    viewKey: 'all'
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    setInputValue(state, val) {
      state.inputValue = val
    },
    addItem(state) {
      const obj = {
        id: state.nextid,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextid++
      state.inputValue = ''
    },
    removeItem(state, id) {
      const i = state.list.findIndex(x => x.id === id)
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    changestatus(state, param) {
      // 修改列表项状态
      const i = state.list.findIndex(x => x.id === param.id)
      if (i !== -1) {
        state.list[i].done = param.status
      }
    },
    cleandone(state) {
      state.list = state.list.filter(x => x.done === false)
    },
    changeViewKey(state, key) {
      state.viewKey = key
    }
  },
  actions: {
    getList(context) {
      axios.get('/list.json').then(({ data }) => {
        console.log(typeof (data))
        context.commit('initList', data)
      })
    }
  },
  getters: {
    // 统计未完成任务的条数
    unDoneLength(state) {
      return state.list.filter(x => x.done === false).length
    },
    // 数据源按条件显示
    InfoList(state) {
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'undone') {
        return state.list.filter(x => !x.done)
      }
      if (state.viewKey === 'done') {
        return state.list.filter(x => x.done)
      }
      return state.list
    }
  },
  modules: {
  }
})
