<template>
  <div id="app">
    <header-top></header-top>
    <div class="main">
      <keep-alive>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </keep-alive>
    </div>
    <temp-footer></temp-footer>
  </div>
</template>

<script>
import headerTop from '@/components/Header'
import tempFooter from '@/components/Footer'
export default {
  name: 'app',
  components: {
    headerTop,
    tempFooter
  }
}

</script>

<style>
#app {
  padding-top: 51px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

//特效
.fade-enter {
  opacity: 0;
}

.fade-leave {
  opacity: 1;
}

.fade-enter-active {
  opacity: 1;
  transition: opacity .5s;
}

.fade-leave-active {
  opacity: 0;
  transition: opacity .5s;
}
</style>
