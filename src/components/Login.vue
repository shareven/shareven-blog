<template>
    <div>
        <div class="login-wrap">
            <h3>登录</h3>
            <input type="text" placeholder="请输入用户名" v-model="username">
            <input type="password" placeholder="请输入密码" v-model="password">
            <button v-on:click="login">登录</button>
            <p v-show="showTishi">{{tishi}}</p>
            <router-link to="/user/register">没有账号？马上注册</router-link>
        </div>
    </div>
</template>

<style lang="less" scoped>
.login-wrap{
    height: 450px;
    text-align: center;
}

input {
    display: block;
    width: 250px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    margin-bottom: 10px;
    outline: none;
    border: 1px solid #888;
    padding: 10px;
    box-sizing: border-box;
}

p {
    color: red;
}

button {
    display: block;
    width: 250px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    border: none;
    background-color: #41b883;
    color: #fff;
    font-size: 16px;
    margin-bottom: 5px;
    cursor: pointer;
    &:hover {
        background: #f92;
    }
}

span {
    cursor: pointer;
}

span:hover {
    color: #41b883;
}
</style>

<script>
import store from '@/vuex/store'
import { mapState, mapMutations } from 'vuex'
import { setCookie, getCookie } from '../assets/js/cookies.js'
export default {
    data() {
        return {
            showTishi: false,
            tishi: '',
            username: '',
            password: ''
        }
    },
    computed: {
        ...mapState(['isShowUser']),
    },
    store,
    mounted() {
        /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
        if (getCookie('username')) {
            this.$router.push('/')
        }
    },
    methods: {
        ...mapMutations([
            'falseShowUser',
            'trueShowUser'
        ]),
        login() {
            if (this.username == "" || this.password == "") {
                this.tishi = "请输入用户名或密码";
            } else {
                let data = { 'username': this.username, 'password': this.password }
                /*接口请求*/
                $.post('/vueapi/login.php', data, (res)=>{
                // $.post('http://localhost/vueapi/login.php', data, (res)=>{
                    res = JSON.parse(res);
                    if (res.code == -2) {
                        this.tishi = "网络连接异常";
                        this.showTishi = true;
                    } else if (res.code == -1) {
                        this.tishi = "该用户不存在或密码输入错误";
                        this.showTishi = true;
                    } else if (res.code == 0) {
                        this.tishi = "登录失败";
                        this.showTishi = true;
                    } else if (res.code == 'admin') {
                        /*路由跳转this.$router.push*/
                        this.$router.push('/admin');
                    } else if (res.code == 1) {
                        this.tishi = "登录成功";
                        this.showTishi = true;
                        //设置cookie
                        setCookie('username', this.username, 1000 * 60);
                        //导航条显示登录用户信息
                        this.trueShowUser();
                        //页面跳转
                        setTimeout(function () {
                            this.$router.push('/user/leaveMsg');
                        }.bind(this), 1000)
                    }
                })
            }
        }
    }
}
</script>