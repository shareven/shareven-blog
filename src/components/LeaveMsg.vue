<template>
  <div class="leaveMsg">
    <div class="row">
      <input type="button" class="btn btn-danger" @click="writeMsg" v-model="btnMsg" />
    </div>
    <transition name="myslide">
      <!-- 写留言start -->
      <div class="container-fluid" v-show="showWriteMsg">
        <!-- 已经登录后可以留言 -->
        <div class="container" v-show="isShowUser">
          <h2>写下我的留言</h2>
          <section>
            <form action="" class="form-horizontal">
              <div class="form-group">
                <label for="#lvmsg" class="col-md-2 col-md-12"></label>
                <div class="div col-xs-12 col-md-12">
                  <textarea name="" id="lvmsg" v-model="message" @focus="noShowTishi" class="form-control" placeholder="太喜欢你的留言了，快来留下点什么吧"></textarea>
                </div>
              </div class="form-group">
              <div class="form-group">
                <input type="button" class="btn btn-success " value="发送" @click="sendMsg">
              </div>
              <p class="showTishi" v-show="showTishi">{{tishi}}</p>
            </form>
          </section>
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
      <!-- 写留言end -->
    </transition>

    <!-- 展示留言 -->
    <section class="container content text-left">
    <transition-group name="myslide2"  tag="div">
      <div class="panel panel-default" :key="index" v-for="(item,index) in leavemsgData">
        <div class="panel-heading">
          <i class="glyphicon glyphicon-user"></i>
          <strong>{{item.username}}</strong>
        </div>
        <div class="panel-body">
          <div class="content-msg">{{item.message}}</div>
          <div class="star row ">
            <span class="text-time">发布于{{item.date}}</span>
            <span>点赞</span>
            <i class="glyphicon glyphicon-thumbs-up"></i>
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
  name: 'leaveMsg',
  data() {
    return {
      leavemsgData: [],
      message: '',
      showWriteMsg: false,
      showTishi: false,
      tishi: '',
      btnMsg: "我想写留言"
    }
  },
  computed: {
    ...mapState(['isShowUser', 'userName']),
  },
  created() {
    this.getLeaveMsgData();
  },
  methods: {
    writeMsg() {
      this.showWriteMsg = !this.showWriteMsg;

      this.btnMsg = this.btnMsg == "我想写留言" ? "我不想写了" : "我想写留言";
    },
    noShowTishi() {
      this.showTishi = false;
    },
    sendMsg() {
      if (this.message == "") {
        this.showTishi = true;
        this.tishi = "请恕在下才疏学浅，不懂无字天书!";
      } else {
        let date = new Date();
        let mydate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        let data = { 'username': this.userName, 'message': this.message, 'date': mydate };
        /*接口请求*/
        // $.post('/vueapi/leaveMsg.php', data, (res)=>{
        $.post('http://localhost/vueapi/leaveMsg.php', data, (res) => {
          res = JSON.parse(res);
          if (res.code == -2) {
            this.tishi = "网络连接异常";
            this.showTishi = true;
          } else if (res.code == 0) {
            this.tishi = "留言失败，请重试";
            this.showTishi = true;
          } else if (res.code == 1) {
            this.getLeaveMsgData();
            this.tishi = "";
              this.message = "";
              this.writeMsg();
          }
        })
      }
    },
    getLeaveMsgData() {
      /*接口请求*/
      // $.get('/vueapi/leaveMsgshowLeaveMsg.php', (res)=>{
      $.get('http://localhost/vueapi/showLeaveMsg.php', (res) => {
        res = JSON.parse(res);
        if (res.code == -2) {
          console.log("网络连接异常");
          this.showTishi = true;
        } else if (res.code == 0) {
          console.log("获取失败，请重试");
          this.showTishi = true;
        } else if (res.code == 1) {
          //储存获取的留言数据
          this.leavemsgData = res.data.reverse();
        }
      })
    }
  },
  store
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.leaveMsg {
  margin-top: 20px;
  .row {
    margin: 20px auto;
  }
}

.btn {
  outline: none;
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
  margin-right: 5px;
  color: #bbb;
}

.showTishi {
  color: red;
}

textarea {
  height: 200px;
  resize: none;
}

// 特效start
.myslide-enter-active,.myslide-leave-active{
  transition: all 1s;
}
.myslide-enter, .myslide-leave-to{
  opacity: 0;
  transform: translateY(-40px);
}


.myslide2-enter-active,.myslide2-leave-active{
  transition: all 1s;
}
.myslide2-enter, .myslide2-leave-to{
  opacity: 0;
  transform: translateX(-80px);
}
// 特效end
</style>
