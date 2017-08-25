import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    isShowUser: false,
    userName: '',
    experienceData: [],
    commentsData: []
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
    saveCommentsData(state, commentsData) {  //储存评论数据
        state.commentsData = commentsData;
    },
    changeExperienceData(state, [index, stars]) {  //改变经验点赞数据
        state.experienceData[index].stars = stars;
    },
    changeCommenterienceData(state, [index, stars]) {  //改变评论点赞数据
        state.commentsData[index].stars = stars;
    }
}
export default new Vuex.Store({
    state, mutations
})