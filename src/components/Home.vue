<template>
  <div class="home">
    <div class="container">
      <div class="box">
        <div class="inner1 in">
          <img src="../assets/img/1.jpg" class="img-responsive" alt="">
        </div>
        <div class="inner2 in">
          <img src="../assets/img/2.jpg" class="img-responsive" alt="">
        </div>
        <div class="inner3 in">
          <img src="../assets/img/3.jpg" class="img-responsive" alt="">
        </div>
        <div class="inner4 in">
          <img src="../assets/img/4.jpg" class="img-responsive" alt="">
        </div>
        <div class="inner5 in">
          <img src="../assets/img/5.jpg" class="img-responsive" alt="">
        </div>
        <div class="inner6 in">
          <img src="../assets/img/6.jpg" class="img-responsive" alt="">
        </div>
        <div class="inner7 in">
          <img src="../assets/img/7.jpg" class="img-responsive" alt="">
        </div>
        <div class="inner8 in">
          <img src="../assets/img/8.jpg" class="img-responsive" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>

export default {
  name: 'home',
  data() {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
// common
img {
  border: none;
}

html {
  font-size: 62.5%;
}

.home {
  padding-top: 8rem;
  width: 100%;
  height: 52rem;
  font-size: 1rem;
  background: #000;
  perspective: 80rem;
}

.box {
  position: relative;
  margin: 0 auto;
  width: 20rem;
  height: 20rem;
  transform-style: preserve-3d;
  transform: rotateX(80deg) rotateY(0deg) rotateZ(0deg); // transition: 2s;
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
  left: 0;
  top: 0;
  right: 0;
  margin: 0 auto;
  text-align: center;
  box-shadow: 0rem 0rem 1rem #f15;
  width: 10rem; // height: 16rem;
  line-height: 10rem;
  background-size: 100%;
  -webkit-box-reflect: below 0 -webkit-linear-gradient(transparent, transparent 50%, rgba(255, 255, 255, .5));
}



/*inner pic*/

.inner1 {
  transform: translateX(-20rem) rotateX(-90deg) rotateY(-90deg);
}

.inner2 {
  transform: translateX(-14.1rem) translateY(-14.1rem) rotateZ(45deg) rotateX(-90deg) rotateY(-90deg);
}

.inner3 {
  transform: translateY(-20rem) rotateX(90deg) rotateZ(-180deg);
}

.inner4 {
  transform: translateX(14.1rem) translateY(-14.1rem) rotateZ(-45deg) rotateX(-90deg) rotateY(90deg);
}

.inner5 {
  transform: translateX(20rem) rotateX(-90deg) rotateY(90deg);
}

.inner6 {
  transform: translateX(14.1rem) translateY(14.1rem) rotateZ(-45deg) rotateX(-90deg);
}

.inner7 {
  transform: translateY(20rem) rotateX(-90deg);
}

.inner8 {
  transform: translateX(-14.1rem) translateY(14.1rem) rotateZ(45deg) rotateX(-90deg);
}

footer {
  margin: 5rem auto;
  font-weight: normal;
  color: #fff;
  font-size: 1.2rem;
  text-align: center;
}


//小屏幕显示
@media screen and (max-width: 768px) {
  .home {
    padding-top: 20rem;
    width: 100%;
    height: 50rem;
  }
  .box {
    width: 10rem;
    height: 10rem;
  }
  .box div.in {
    width: 6rem; // transition: 2s;
  }
  /*inner pic*/
  .inner1 {
    transform: translateX(-8.5rem) rotateX(-90deg) rotateY(-90deg);
  }
  .inner2 {
    transform: translateX(-6rem) translateY(-6rem) rotateZ(45deg) rotateX(-90deg) rotateY(-90deg);
  }
  .inner3 {
    transform: translateY(-8.5rem) rotateX(90deg) rotateZ(-180deg);
  }
  .inner4 {
    transform: translateX(6rem) translateY(-6rem) rotateZ(-45deg) rotateX(-90deg) rotateY(90deg);
  }
  .inner5 {
    transform: translateX(8.5rem) rotateX(-90deg) rotateY(90deg);
  }
  .inner6 {
    transform: translateX(6rem) translateY(6rem) rotateZ(-45deg) rotateX(-90deg);
  }
  .inner7 {
    transform: translateY(8.5rem) rotateX(-90deg);
  }
  .inner8 {
    transform: translateX(-6rem) translateY(6rem) rotateZ(45deg) rotateX(-90deg);
  }
}
</style>
