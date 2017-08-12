<template>
  <div class="leaveMsg">
    <div class="container">
      <h2>留言</h2>
      
    </div>
  </div>
</template>
 
<script>
import store from '@/vuex/store'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'leaveMsg',
  data (){
    return{

    }
  },
  computed: {
    ...mapState(['isShowUser', 'userName']),
  },
  store
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
