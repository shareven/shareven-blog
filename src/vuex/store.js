import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    isShowUser: false,
    userName: '',
    experienceData: []
}
const mutations = {
    falseShowUser(state) { //不显示用户信息，显示登录和注册
        state.isShowUser = false;
    },
    trueShowUser(state) {   //显示用户信息
        state.isShowUser = true;
    },
    changeUsername(state, uname) {   //改变用户名
        state.userName = uname;
    },
    saveExperienceData(state, experienceData) {  //储存经验数据
        state.experienceData = experienceData;
    },
    changeExperienceData(state, [index, stars]) {  //改变经验点赞数据
        state.experienceData[index].stars = stars;
    }
}
export default new Vuex.Store({
    state, mutations
})