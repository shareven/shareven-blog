<template>
  <div class="header">
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid ">
        <div class="row">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header  col-md-2">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <div class="navbar-brand big">shareven</div>
          </div>
  
          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse text-left " id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav col-md-4 col-sm-4">
              <li class="active">
                <router-link to="/home">首页
                </router-link>
                <span class="sr-only">(current)</span>
              </li>
              <li>
                <router-link to="/experience">技术经验</router-link>
              </li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">项目
                  <span class="caret"></span>
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <router-link to="/project/naruto">火影-究极风暴v1.1</router-link>
                  </li>
                  <li>
                    <a href="#">项目二</a>
                  </li>
                  <li>
                    <a href="#">项目三</a>
                  </li>
                </ul>
              </li>
            </ul>
            <form class="navbar-form navbar-left col-md-3 col-sm-2 clearfix">
              <div class="form-group col-md-10 col-xs-10">
                <input type="text" class="form-control" placeholder="Search">
              </div>
              <button type="submit" class="btn btn-default col-md-2 col-xs-2">搜索</button>
            </form>
            <ul class="nav navbar-nav navbar-left col-md-2 col-sm-3">
              <li>
                <router-link to="/user/leaveMsg">留言</router-link>
              </li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  <span v-show="!isShowUser">个人中心</span>
                  <span v-show="isShowUser">{{name}}</span>
                  <span class="caret"></span>
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <router-link v-show="!isShowUser" to="/user/login">登录</router-link>
                  </li>
                  <li>
                    <router-link v-show="!isShowUser" to="/user/register">注册</router-link>
                  </li>
                  <li>
                    <a class="logout" href="javascript:;" v-show="isShowUser" @click="quit">登出</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <!-- /.navbar-collapse -->
        </div>
      </div>
      <!-- /.container-fluid -->
    </nav>
  </div>
</template>
 
<script>
import store from '@/vuex/store'
import { mapState, mapMutations } from 'vuex'
import { setCookie, getCookie, delCookie } from '../assets/js/cookies.js'
export default {
  name: 'header',
  data() {
    return {
      name: ''
    }
  },
  computed: {
    ...mapState(['isShowUser', 'userName','lastPath']),
  },
  mounted() {
    /*页面挂载获取保存的cookie值，渲染到页面上*/
    this.showUserInfo();
    this.addActiveClass();
  },
  updated() {
    this.showUserInfo();
  },
  beforeRouteEnter (to, from, next){
    alert(this.name);
  },
  methods: {
    ...mapMutations([
      'falseShowUser',//不显示登录信息
      'trueShowUser'  //显示登录信息
    ]),
    quit() {
      /*删除cookie*/
      delCookie('username');
      this.falseShowUser();
    },
    showUserInfo() {
      let uname = getCookie('username')
      this.name = uname;
      //把用户名存到store
      this.$store.commit('changeUsername',uname);
      /*如果cookie不存在，则跳转到登录页*/
      if (uname == "") {
        this.falseShowUser();
      } else {
        this.trueShowUser();
      }
    },
    addActiveClass() {
      $("li a").click(function () {
        $("li.active").removeClass("active");
        $(this).parent().addClass("active");
      })
    }
  },
  store
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
