import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state={
    isShowUser: false,
    userName: '',
    lastPath: '/'
}
const mutations={
    falseShowUser(state){ //不显示用户信息，显示登录和注册
        state.isShowUser = false; 
    },
    trueShowUser(state){   //显示用户信息
        state.isShowUser = true; 
    },
    changeUsername(state,uname){   //改变用户名
        state.userName = uname;
    },
    saveLastPath(state, current){
        state.lastPath= current;
    }
}
export default new Vuex.Store({
    state,mutations
})