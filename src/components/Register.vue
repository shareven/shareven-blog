<template>
    <div>
        <div class="register-wrap">
            <h3>注册</h3>
            <input type="text" v-focus placeholder="请输入用户名" v-model="newUsername">
            <input type="password" placeholder="请输入密码" v-model="newPassword">
            <input type="password" placeholder="请再次输入密码" v-model="reNewPassword">
            <button v-on:click="register">注册</button>
            <p v-show="showTishi">{{tishi}}</p>
            <router-link to="/user/login">已有账号？马上登录</router-link>
        </div>
    </div>
</template>

<style lang="less" scoped>
.register-wrap {
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
import { setCookie, getCookie, delCookie } from '../assets/js/cookies.js'
export default {
    data() {
        return {
            showTishi: false,
            tishi: '',
            newUsername: '',
            newPassword: '',
            reNewPassword: ''
        }
    },
    computed: {
        ...mapState(['isShowUser']),
    },
    store,
    mounted() {
        /*页面挂载获取cookie，如果存在username的cookie，则跳转到上一页面，不需登录*/
        if (getCookie('username')) {
            // this.$router.push('/user/leaveMsg');
            this.$router.go(-1);
        }
    },
    methods: {
        ...mapMutations([
            'falseShowUser',
            'trueShowUser'
        ]),
        register() {
            if (this.newUsername == "" || this.newPassword == "") {
                this.tishi = "请输入用户名或密码";
                this.showTishi = true;
            } else if (this.newPassword !== this.reNewPassword) {
                this.tishi = "两次输入的密码不一样";
                this.showTishi = true;
            } else {
                let data = { 'username': this.newUsername, 'password': this.newPassword }
                $.post('/vueapi/register.php', data, (res)=>{
                // $.post('http://localhost/vueapi/register.php', data, (res) => {
                    res = JSON.parse(res);
                    if (res.code == -2) {
                        this.tishi = "网络连接异常"
                        this.showTishi = true
                    } else if (res.code == -1) {
                        this.tishi = "用户名已存在"
                        this.showTishi = true
                    } else if (res.code == 0) {
                        this.tishi = "注册失败"
                        this.showTishi = true
                    } else if (res.code == 'admin') {
                        /*路由跳转this.$router.push*/
                        this.$router.push('/admin')
                    } else if (res.code == "1") {
                        this.tishi = "注册成功"
                        this.showTishi = true
                        this.username = ''
                        this.password = ''
                        setCookie('username', this.newUsername, 1000 * 60);
                        //导航条显示登录用户信息
                        this.trueShowUser();
                        // 页面跳转
                        setTimeout(function() {
                            // this.$router.push('/user/leaveMsg');
                            this.$router.go(-1);
                        }.bind(this), 1000)
                    }
                })

            }
        }
    }
}
</script>