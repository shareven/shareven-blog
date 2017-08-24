<template>
  <div class="experienceDetail container">
    <div class="row">
      <!-- 展示留言 -->
      <section class="exp-content text-left col-xs-12 col-sm-12 col-md-9">
        <div class="panel panel-default">
          <div class="panel-heading">
            <i class="glyphicon glyphicon-user"></i>
            <strong>{{myExpData.username}}</strong>
          </div>
          <div class="panel-body">
            <div class="content-msg" v-html="myExpData.content"></div>
            <div class="star row">
              <span class="text-time">发布于{{myExpData.date}}</span>
              <span>点赞</span>
              <i class="glyphicon glyphicon-thumbs-up" @click="ExpGiveStar(myExpData.eid,$route.params.id)"></i>
              <span>{{myExpData.stars}}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 展示评论 start -->
      <section class="showComments text-left col-xs-12 col-sm-12 col-md-3">
        <transition-group name="myslide2" tag="div">
          <div class="panel panel-default" :key="index" v-for="(item,index) in commentsData">
            <div class="panel_heading">
              <i class="glyphicon glyphicon-user"></i>
              <strong>{{item.username}}</strong>
            </div>
            <div class="panel-body">
              <div class="content-msg" v-html="item.comment"></div>
              <div class="star row">
                <span class="text-time">发布于{{item.date}}</span>
                <span>点赞</span>
                <i class="glyphicon glyphicon-thumbs-up" @click="ExpGiveStar(item.eid,index)"></i>
                <span>{{item.stars}}</span>
              </div>
            </div>
          </div>
        </transition-group>
      </section>
      <!-- 展示评论 end -->

      <!-- 发表评论 start-->
      <section class="comment col-md-12">
        <header class="header">
          <div class="row">
            <a href="javascript:;" @click="ShowWriteToggle" class="btn btn-primary">评论</a>
          </div>
        </header>
        <transition name="myslide">
          <div id="writeExp" v-show="isShowWrite">
            <!-- 已经登录后可以分享 -->
            <div class="container" v-show="isShowUser">
              <form class="form-horizontal text-left">
                <h3 class="text-center">发表评论</h3>
                <div class="form-group">
                  <div contenteditable="true" v-html="text" id="myComment" class="form-control" @focus="noShowTishi" placeholder="内容"></div>
                </div>
                <p class="showTishi text-center" v-show="showTishi">{{tishi}}</p>
                <div class="form-group text-center">
                  <input type="button" class="btn btn-success" @click="sendComment" value="提交" />
                </div>
              </form>
            </div>
            <!-- 未登录不可以留言 -->
            <div class="container" v-show="!isShowUser">
              <h2>请先登录</h2>
              <section class="row">
                <router-link to="/user/login" class="btn btn-success">去登录</router-link>
                <router-link to="/user/register" class="btn btn-primary">去注册</router-link>
              </section>
            </div>
          </div>
        </transition>
      </section>
      <!-- 发表评论 end-->
    </div>
  </div>
</template>
 
<script>
import store from '@/vuex/store'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'experienceDetail',
  data() {
    return {
      text: "",
      isShowWrite: false,  //是否显示写分享
      showTishi: false,
      tishi: '',
      commentsData: '',
    }
  },
  store,
  computed: {
    ...mapState(['isShowUser', 'userName', 'experienceData']),
    myExpData() {
      return this.experienceData[this.$route.params.id];
    }
  },
  created() {
    this.getCommentsData();
  },
  methods: {
    noShowTishi() {
      this.showTishi = false;
    },
    ShowWriteToggle() {
      //toggle btn
      this.isShowWrite = !this.isShowWrite;
    },
    ExpGiveStar(eid, index) {
      //点赞
      let data = { 'eid': eid };
      /*接口请求*/
      // $.post('/vueapi/ExpGiveStar.php', data, (res) => {
      $.post('http://localhost/vueapi/ExpGiveStar.php', data, (res) => {
        res = JSON.parse(res);
        if (res.code == -2) {
          console.log("网络连接异常");
        } else if (res.code == 0) {
          console.log("点赞失败，请重试");
        } else if (res.code == 1) {
          //把修改点赞经验数据存到store
          this.$store.commit('changeExperienceData', [index, res.stars]);
        }
      })
    },
    sendComment() {
      let comment = $('#myComment').html();
      if (comment == "") {
        this.showTishi = true;
        this.tishi = "请留下内容!";
      } else {
        let date = new Date();
        let mydate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        let data = { 'eid': this.myExpData.eid, 'username': this.userName, 'comment': comment, 'date': mydate };
        /*接口请求*/
        // $.post('/vueapi/comment.php', data, (res) => {
        $.post('http://localhost/vueapi/comment.php', data, (res) => {
          res = JSON.parse(res);
          if (res.code == -2) {
            this.tishi = res.mesg;
            this.showTishi = true;
          } else if (res.code == 0) {
            this.tishi = res.mesg;
            this.showTishi = true;
          } else if (res.code == 1) {
            this.getCommentsData();
            this.tishi = "";
            this.message = "";
            this.myTitle = "";
            $('#myComment').html("");
            $("#writeExp").collapse('hide');  //收起分享经验输入框
          }
        })
      }
    },
    getCommentsData() {
      /*接口请求*/
      // $.get('/vueapi/showCommentsData.php', (res) => {
      $.get('http://localhost/vueapi/showCommentsData.php', (res) => {

        // localhost下不能用JSON.parse转化json数组
        // res = JSON.parse(res);
        if (res.code == -2) {
          console.log("网络连接异常");
        } else if (res.code == 0) {
          console.log("获取失败，请重试");
        } else if (res.code == 1) {
          //储存获取的留言数据
          this.commentsData = res.data.reverse();

        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.carousel-indicators li {
  background: #f92;
}

.carousel-indicators li.active {
  background: #aaa;
}

.header {
  margin: 10px auto;
}

#writeExp {
  min-height: 150px;
}

#myComment {
  min-height: 200px;
  resize: none;
}

.showTishi {
  color: red;
}

.glyphicon-user {
  margin-right: 10px;
  color: #f83;
}

i.glyphicon-thumbs-up {
  margin: 0 3px;
  color: #aaa;
  cursor: pointer;
  &:hover {
    color: #FBCD00;
    font-weight: bold;
  }
}

.star.row {
  margin-bottom: 0;
}

.text-time {
  margin: 0 5px 0 10px;
  color: #bbb;
}

// 特效start
.myslide-enter-active,
.myslide-leave-active {
  transition: all 1s;
}

.myslide-enter,
.myslide-leave-to {
  opacity: 0;
  transform: translateY(-40px);
}


.myslide2-enter-active,
.myslide2-leave-active {
  transition: all 1s;
}

.myslide2-enter,
.myslide2-leave-to {
  opacity: 0;
  transform: translateX(-80px);
}

// 特效end
</style>
