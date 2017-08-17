<template>
  <div class="experience">
    <div class="container">
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
          <div class="item active" >
            <img src="static/img/1.jpg" class="img-responsive">
          </div>
          <div class="item" v-for="(i,index) in imgUrl">
            <img :src="i" >
          </div>
        </div>
  
        <!-- Controls -->
        <a class="left carousel-control" href="#banner" role="button" data-slide="prev">
          <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" href="#banner" role="button" data-slide="next">
          <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  </div>
</template>
 
<script>

export default {
  name: 'experience',
  data() {
    return {
      imgUrl: ['static/img/2.jpg', 'static/img/3.jpg', 'static/img/4.jpg', 'static/img/5.jpg', 'static/img/6.jpg',]
    }
  },
  mounted: function () {
    
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.carousel-indicators li{
  background: #f92;
}
.carousel-indicators li.active{
  background: #aaa;
}





</style>
