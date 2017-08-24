<template>
  <div class="experience">
    <!-- <div class="container">
                            <div id="banner" class="carousel slide col-md-4 col-md-offset-4" data-ride="carousel">
                              <ol class="carousel-indicators">
                                <li data-target="#banner" data-slide-to="1" class="active"></li>
                                <li data-target="#banner" data-slide-to="2"></li>
                                <li data-target="#banner" data-slide-to="3"></li>
                                <li data-target="#banner" data-slide-to="4"></li>
                                <li data-target="#banner" data-slide-to="5"></li>
                                <li data-target="#banner" data-slide-to="6"></li>
                              </ol>

                              <div class="carousel-inner" role="listbox">
                                <div class="item active">
                                  <img src="static/img/1.jpg" class="img-responsive">
                                </div>
                                <div class="item" v-for="(i,index) in imgUrl">
                                  <img :src="i">
                                </div>
                              </div>

                              <a class="left carousel-control" href="#banner" role="button" data-slide="prev">
                                <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                              </a>
                              <a class="right carousel-control" href="#banner" role="button" data-slide="next">
                                <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                              </a>
                            </div>
                          </div> -->

    <section class="shareExperience">
      <header class="header">
        <div class="row">
          <a href="javascript:;" @click="ShowWriteToggle" class="btn btn-primary">分享经验</a>
        </div>
      </header>
      <transition name="myslide">
        <div id="writeExp" v-show="isShowWrite">
          <!-- 已经登录后可以分享 -->
          <div class="container" v-show="isShowUser">
            <form class="form-horizontal text-left">
              <div class="form-group">
                <label for="inputTitle" class="col-sm-2 control-label">title</label>
                <div class="col-sm-10">
                  <input type="text" v-focus id="inputTitle" class="form-control" @focus="noShowTishi" v-model="myTitle" placeholder="标题">
                </div>
              </div>
              <div class="form-group">
                <label for="myexp" class="col-sm-2 control-label">content</label>
                <div class="col-sm-10">
                  <div contenteditable="true" v-html="text" id="myexp" class="form-control" @focus="noShowTishi" placeholder="内容"></div>
                </div>
              </div>
              <p class="showTishi text-center" v-show="showTishi">{{tishi}}</p>
              <div class="form-group text-center">
                <input type="button" class="btn btn-success" @click="sendMsg" value="提交" />
              </div>
            </form>
          </div>
          <!-- 未登录不可以分享经验 -->
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

    <!-- 展示分享经验 -->
    <section class="container exp-content text-left">
      <transition-group name="myslide2" tag="div">
        <div class="panel panel-default" :key="index" v-for="(item,index) in experienceData">
          
          <div class="panel-body">
            <router-link :to="{name:'experienceDetail',params:{id:index}}" class="content-title">{{item.title}}</router-link>
            <div class="star row">
              <i class="glyphicon glyphicon-user"></i>
              <strong>{{item.username}}</strong>
              <span class="text-time">发布于{{item.date}}</span>
              <span>点赞</span>
              <i class="glyphicon glyphicon-thumbs-up" @click="ExpGiveStar(item.eid,index)"></i>
              <span>{{item.stars}}</span>
            </div>
          </div>
        </div>
      </transition-group>
    </section>
  </div>
</template>
 
<script>
import store from '@/vuex/store'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'experience',
  data() {
    return {
      text: "",
      myTitle: '',
      isShowWrite: false,  //是否显示写分享
      showTishi: false,
      tishi: ''
    }
  },
  store,
  computed: {
    ...mapState(['isShowUser', 'userName', 'experienceData']),
  },
  created() {
    this.getExperienceData();
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
          this.$store.commit('changeExperienceData',[ index, res.stars]);
        }
      })
    },
    sendMsg() {
      let content = $('#myexp').html();
      if (this.myTitle == "") {
        this.showTishi = true;
        this.tishi = "请留下标题!";
      } else if (content == "") {
        this.showTishi = true;
        this.tishi = "请留下内容!";
      } else {
        let date = new Date();
        let mydate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        let data = { 'username': this.userName, 'title': this.myTitle, 'content': content, 'date': mydate };
        /*接口请求*/
        // $.post('/vueapi/shareExperience.php', data, (res) => {
        $.post('http://localhost/vueapi/shareExperience.php', data, (res) => {
          res = JSON.parse(res);
          if (res.code == -2) {
            this.tishi = res.mesg;
            this.showTishi = true;
          } else if (res.code == 0) {
            this.tishi = res.mesg;
            this.showTishi = true;
          } else if (res.code == 1) {
            this.getExperienceData();
            this.tishi = "";
            this.message = "";
            this.myTitle = "";
            $('#myexp').html("");
            $("#writeExp").collapse('hide');  //收起分享经验输入框
          }
        })
      }
    },
    getExperienceData() {
      /*接口请求*/
      // $.get('/vueapi/showExperienceData.php', (res) => {
      $.get('http://localhost/vueapi/showExperienceData.php', (res) => {

        // localhost下不能用JSON.parse转化json数组
        // res = JSON.parse(res);
        if (res.code == -2) {
          console.log("网络连接异常");
        } else if (res.code == 0) {
          console.log("获取失败，请重试");
        } else if (res.code == 1) {
          //储存获取的分享经验数据
          let experienceData = res.data.reverse();
          //把分享经验数据存到store
          this.$store.commit('saveExperienceData', experienceData);
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

#myexp {
  min-height: 200px;
  resize: none;
}

.showTishi {
  color: red;
}

.glyphicon-user {
  margin: 10px 5px 0 15px;
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
a.content-title{
  color: #000;
  &:hover{
    color:#00AAE7;
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
