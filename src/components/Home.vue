<template>
  <div class="home">
    <div class="container">
      <div class="box">
        <div class="inner1 in"></div>
        <div class="inner2 in"></div>
        <div class="inner3 in"></div>
        <div class="inner4 in"></div>
        <div class="inner5 in"></div>
        <div class="inner6 in"></div>
        <div class="inner7 in"></div>
        <div class="inner8 in"></div>
      </div>
    </div>
    
  </div>
</template>
 
<script>

export default {
  name: 'home',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@media screen and (min-width: 300px) and (max-width: 992px) {
  .inner1 {
    margin: 0 auto;
    width: 100%;
    height: 600px;
    background: red url("../assets/img/1.jpg") center center;
  }
}
@media screen and (min-width: 992px) {
  html {
    font-size: 62.5%;
  }
  .home {
    font-size: 1rem;
    background: #000;
    perspective: 80rem;
  }
  .box {
    position: relative;
    margin: 0 auto;
    width: 50rem;
    height: 50rem;
    transform-style: preserve-3d;
    transform: rotateX(80deg) rotateY(0deg) rotateZ(0deg);
    transition: 2s;
    animation: move 40s linear infinite;
  }
  @keyframes move {
    form {
      transform: rotateX(80deg) rotateY(0deg) rotateZ(0deg);
    }
    to {
      transform: rotateX(80deg) rotateY(0deg) rotateZ(360deg);
    }
  }
  .box div.in {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -5rem;
    margin-top: -8rem;
    text-align: center;
    box-shadow: 0rem 0rem 1rem #f15;
    width: 10rem;
    height: 16rem;
    line-height: 10rem;
    background-size: 100%;
    -webkit-box-reflect: below 0 -webkit-linear-gradient(transparent, transparent 50%, rgba(255, 255, 255, .5));
  }
  /*inner pic*/
  .inner1 {
    background: red url("../assets/img/1.jpg") center center;
    transform: translateX(-20rem) rotateX(-90deg) rotateY(-90deg);
  }
  .inner2 {
    background: blue url("../assets/img/2.jpg") center center;
    transform: translateX(-14.1rem) translateY(-14.1rem) rotateZ(45deg) rotateX(-90deg) rotateY(-90deg);
  }
  .inner3 {
    background: green url("../assets/img/3.jpg") center center;
    transform: translateY(-20rem) rotateX(90deg) rotateZ(-180deg);
  }
  .inner4 {
    background: aqua url("../assets/img/4.jpg") center center;
    transform: translateX(14.1rem) translateY(-14.1rem) rotateZ(-45deg) rotateX(-90deg) rotateY(90deg);
  }
  .inner5 {
    background: pink url("../assets/img/5.jpg") center center;
    transform: translateX(20rem) rotateX(-90deg) rotateY(90deg);
  }
  .inner6 {
    background: url("../assets/img/6.jpg") center center;
    transform: translateX(14.1rem) translateY(14.1rem) rotateZ(-45deg) rotateX(-90deg);
  }
  .inner7 {
    background: url("../assets/img/7.jpg") center center;
    transform: translateY(20rem) rotateX(-90deg);
  }
  .inner8 {
    background: url("../assets/img/8.jpg") center center;
    transform: translateX(-14.1rem) translateY(14.1rem) rotateZ(45deg) rotateX(-90deg);
  }
  footer {
    margin: 5rem auto;
    font-weight: normal;
    color: #fff;
    font-size: 1.2rem;
    text-align: center;
  }
}
</style>
