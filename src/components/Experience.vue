<template>
  <div class="experience">
    <div class="piclist">
      <ul>
        <li v-for="(item,index) in 6">
          <img :src="imgUrl[index]" class="img-responsive" alt="">
        </li>
      </ul>
    </div>
    <div class="dotlist">
      <ul>
        <li class="on"></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>
 
<script>

export default {
  name: 'experience',
  data() {
    return {
      imgUrl: ['static/img/1.jpg', 'static/img/2.jpg', 'static/img/3.jpg', 'static/img/4.jpg', 'static/img/5.jpg', 'static/img/6.jpg',]
    }
  },
  mounted: function () {
    this.banner();
  },
  methods: {
    banner() {
      var $dotlist = $(".dotlist"),
        $piclistUl = $(".piclist ul"),
        $piclistLi = $(".piclist li"),
        width = $piclistLi.width();

      $piclistLi.eq(0).addClass("on");
      $dotlist.click(function (ev) {
        $("li.on").removeClass("on");
        var ev = ev || window.event;
        ev.target.className = "on";
        var i = $(ev.target).index();
        $piclistLi.eq(i).addClass("on");
        $piclistUl.css("left", -width * i);
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
ul {
  list-style: none;
}

.bg(@color) {
  background: @color;
}

.box(@w: 100%, @h: 100%) {
  width: @w;
  height: @h;
}

.experience {
  position: relative;
  width: 380px;
  height: 500px;
  margin: 0 auto;
  overflow: hidden;
}

.piclist {
  position: relative;
  .box();
  ul {
    position: absolute;
    .box(2100px);
    transition: .5s ease;
    li {
      float: left;
      .box(380px, 500px);
    }
  }
}

@media and screen (max-width:768px) {
  .experience {
    width: 200px;
    height: 400px;
  }
  .piclist {
    ul {
      li {
        .box(200px, 400px);
      }
    }
  }
}

.dotlist {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  margin: auto;
  .box(200px, 15px);
  ul {
    display: flex;
    justify-content: space-around;
    .box();
    li {
      .box(15px);
      border-radius: 100%;
      background: #232;
    }
    .on {
      .bg(#eee);
    }
  }
}
</style>
