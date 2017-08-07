import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state={
    isShowUser: false
}
const mutations={
    falseShowUser(state){ //不显示用户信息，显示登录和注册
        state.isShowUser = false; 
    },
    trueShowUser(state){   //显示用户信息
        state.isShowUser = true; 
    }
}
export default new Vuex.Store({
    state,mutations
})