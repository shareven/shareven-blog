<template>
  <div class="naruto">
    <div class="box bg" id="dff"></div>
  </div>
</template>
 
<script>

export default {
  name: 'naruto',
  mounted:function(){
    window.requstAnimationFrame=window.requestAnimationFrame||function (a) {return setTimeout(a,1000/60)};
			 window.cancelAnimationFrame = window.cancelAnimationFrame || function (a) {clearTimeout(a)};

			(function(){
				var oBox=document.querySelector(".box");

				
				// 初始化界面
				init();
				function init(){
					 //清空box内容，分数清0，游戏结束开关变为false
	                oBox.innerHTML = "";
	                oBox.className="box bg";
	                score = 0;
	                ifEnd = false;
	                //标题
					var oH=document.createElement("h2");
					oH.innerHTML="火影-究极风暴v1.1"
					oBox.appendChild(oH);
					//四个选项
					for (var i = 0; i < 4; i++) {
						var oP=document.createElement("p");
						html="";
						switch (i){
							case(0):
								html="下忍任务";
								break;
							case(1):
								html="中忍任务";
								break;
							case(2):
								html="上忍任务";
								break;
							case(3):
								html="火影任务";
								oP.className="ying";
								break;
						}
						oP.innerHTML=html;
						oP.index=i;
						oP.onclick=function(e){
							e=e||window.event;
							var date={
								x:e.clientX,
								y:e.clientY
							};
							start(this.index , date);
						}
						oBox.appendChild(oP);
					};
				}
				
				// 开始游戏
		        function start(index , date){
		        	oBox.innerHTML=""; //清空选择界面

		        	 //放置计分器
	                var oS = document.createElement("span");
	                oS.className = "score";
	                oS.innerHTML = score;
	                oBox.appendChild(oS);

		        	oBox.className="box";
		        	nn(index , date);
		        	ss(index,oS);
		        }

		        //生成nuruto
		        function nn(index , date){
		        	var naruto=new Image();
		        	naruto.src="img/naruto.png";
		        	naruto.className="naruto";
		        	oBox.appendChild(naruto);
		        	var l_=oBox.offsetLeft+5+naruto.width/2,
		        		t_=oBox.offsetTop+5+naruto.height/2;
		        	naruto.style.left=date.x-l_+"px";
		        	naruto.style.top=date.y-t_+"px";

		        	var Lmin=-naruto.width/2,
		        		Lmax=oBox.clientWidth-naruto.width/2,
		        		Tmin=0,
		        		Tmax=oBox.clientHeight-naruto.height/2;
		        	document.onmousemove=function(e){
		        		e=e||window.event;
		        		l=e.clientX-l_;
		        		t=e.clientY-t_;
		        		l=Math.max(Lmin,l);
		        		l=Math.min(l,Lmax);
		        		t=Math.max(Tmin,t);
		        		t=Math.min(t,Tmax);
		        		naruto.style.left=l+"px";
		        		naruto.style.top=t+"px";
		        	};
		        	biubiu(naruto,index);
		        }

		        // 发射螺旋丸
		        function biubiu(naruto,index){
		        	var speed=300,tSpd=5;
		        	switch (index){
						case(0):
							speed=100;
							tSpd=5;
							className="biu t0";
							break;
						case(1):
							speed=250;
							tSpd=4;
							className="biu t1";
							break;
						case(2):
							speed=300;
							tSpd=2;
							className="biu t2";
							break;
						case(3):
							speed=80;
							tSpd=5;
							className="biu t3";
							break;
					}
		        	naruto.timer=setInterval(function(){
		        		var oBiu=new Image();
			        	oBiu.className=className;
			        	oBiu.src="img/biu.gif";
			        	oBox.appendChild(oBiu);
			        	oBiu.style.left=naruto.offsetLeft+naruto.width/2-oBiu.width/2+"px";
			        	oBiu.style.top=naruto.offsetTop+"px";

			        	// 发射螺旋丸
			        	move();
			        	function move(){
			        		if (!ifEnd){
				        		if(oBiu.offsetTop<-10){oBox.removeChild(oBiu);}
				        		oBiu.style.top=oBiu.offsetTop-tSpd+"px";
				        		oBiu.timer=requstAnimationFrame(move);
				        	}
			        	}
		        	},speed);	
		        }

		        //生成 sasuke
		        function ss(index , oS){
		        	var speed=300,tSpd=5;
		        	switch (index){
						case(0):
							speed=200;
							tSpd=2;
							break;
						case(1):
							speed=150;
							tSpd=2;
							break;
						case(2):
							speed=120;
							tSpd=3;
							break;
						case(3):
							speed=80;
							tSpd=5;
							break;
					}
					var timer=setInterval(function(){
			        	var sasuke=new Image();
			        	sasuke.src="img/sasuke.png";
			        	sasuke.className="sasuke";
			        	oBox.appendChild(sasuke);
			        	var sL=Math.random()*(oBox.clientWidth-sasuke.width);
			        	var sT=Math.random()*2+tSpd;
			        	sasuke.style.left=sL+"px";
			        	sasuke.style.top=0+"px";
			        	move1();
			        	function move1(){
			        		if(sasuke.offsetTop>oBox.clientHeight-10){oBox.removeChild(sasuke);}
			        		sasuke.style.top=sasuke.offsetTop+sT+"px";
			        		sasuke.timer=requstAnimationFrame(move1);
			        		pz(sasuke,timer,oS);
			        	}
			        },speed);	
		        }

		        //两个节点的碰撞检测
	            function collision(obj1 , obj2) {

	                var T1 = obj1.offsetTop,
	                    B1 = T1 + obj1.offsetHeight,
	                    L1 = obj1.offsetLeft,
	                    R1 = L1 + obj1.offsetWidth,

	                    T2 = obj2.offsetTop,
	                    B2 = T2 + obj2.offsetHeight,
	                    L2 = obj2.offsetLeft,
	                    R2 = L2 + obj2.offsetWidth;

	                return !(B1 < T2 || L1 > R2 || T1 > B2 || R1 < L2);
	            }

	            //碰撞检测
	            function pz(sasuke,timer,oS){
	                var allBiu = oBox.querySelectorAll(".biu"),
	                    naruto = oBox.querySelector(".naruto"),
	                    length = allBiu.length;

	                //sasuke和naruto的碰撞
	                if ( naruto && naruto.parentNode && collision(sasuke , naruto) ){
	                    clearInterval(naruto.timer);//清除子弹的生产
	                    clearInterval(timer);//清除飞机的生产
	                    cancelAnimationFrame( sasuke.tiemr );//清除敌军的运动
	                    var oBoom = new Image(),
	                        oBoom2 = new Image();
	                    oBoom.className = "boom";
	                    oBoom2.className = "boom2";
	                    oBoom.src = "img/boom.png";
	                    oBoom2.src = "img/boom2.png";
	                    oBoom.width = 40;
	                    oBoom2.width = 40;
	                    oBoom.height = 40;
	                    oBoom2.height = 50;
	                    oBoom.style.left = sasuke.offsetLeft + 'px';
	                    oBoom.style.top = sasuke.offsetTop + 'px';
	                    oBoom2.style.left = naruto.offsetLeft + 'px';
	                    oBoom2.style.top = naruto.offsetTop + 'px';
	                    oBox.appendChild(oBoom);
	                    oBox.appendChild(oBoom2);
	                    setTimeout(function () {
	                        oBox.removeChild(oBoom);
	                        oBox.removeChild(oBoom2);
	                        ifEnd = true;
	                        gameOver();
	                    },500);
	                    oBox.removeChild(sasuke);
	                    oBox.removeChild(naruto);

	                    return;
	                }

	                //sasuke与螺旋丸的碰撞
	                for (var i = 0; i < length; i++) {
	                    //判断1 螺旋丸的父级存不存在（为了避免别的敌军在检测的时候已经清楚了该子弹）
	                    //判断2 sasuke与螺旋丸有没有撞上
	                    if ( allBiu[i].parentNode && collision(sasuke , allBiu[i]) ){
	                        cancelAnimationFrame( allBiu[i].timer );
	                        cancelAnimationFrame( sasuke.tiemr );
	                        oBoom = new Image();
	                        oBoom.className = "boom";
	                        oBoom.src = "img/boom.png";
	                        oBoom.width = 40;
	                        oBoom.height = 40;
	                        oBoom.style.left = sasuke.offsetLeft + 'px';
	                        oBoom.style.top = sasuke.offsetTop + 'px';
	                        oBox.appendChild(oBoom);
	                        setTimeout(function () {
	                            oBoom.parentNode && oBox.removeChild(oBoom);
	                        },500);
	                        oBox.removeChild(allBiu[i]);
	                        sasuke.parentNode && oBox.removeChild(sasuke);
	                        score += 100;
	                        oS.parentNode && (oS.innerHTML = score);
	                        break;
	                    }
	                }
	            }

	            //游戏结束
	            function gameOver() {
	                oBox.innerHTML = "";

	                var oDiv = document.createElement("div"),
	                    oH = document.createElement("h2"),
	                    oP = document.createElement("p"),
	                    oR = document.createElement("div");
	                oDiv.className = "gameover";
	                oH.innerHTML = "Game Over";
	                oP.innerHTML = "您的得分为：<span>" + score + "</span>";
	                oR.className = 'restart';
	                oR.innerHTML = "重新开始";
	                oR.onclick = init;
	                oDiv.appendChild(oH);
	                oDiv.appendChild(oP);
	                oDiv.appendChild(oR);
	                oBox.appendChild(oDiv);
	            }

			})();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

.box {
  position: relative;
  margin: 20px auto;
  width: 500px;
  height: 500px;
  border: 5px solid #fff;
  color: #fff;
}

.bg {
  background: url("../../assets/img/dafeiji/hy.jpg");
}

.box h2 {
  margin: 30px auto;
  text-align: center;
}

.box p {
  margin: 50px 0px;
  width: 120px;
  height: 30px;
  line-height: 30px;
  color: #000;
  font-weight: bold;
  background: #555;
  background: rgba(250, 250, 250, 0.5);
  cursor: pointer;
  text-align: center;
}

.box>p:hover {
  color: #fff;
  background: #33f;
}

.box p.ying {
  color: #f19;
  background: rgba(20, 20, 20, 0.5);
}

.box p.ying:hover {
  color: #fff;
  background: #33f;
}

.box .naruto {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 50px;
  z-index: 999;
}

.box .biu {
  position: absolute;
  top: 0;
  left: 0;
}

.t0 {
  width: 16px;
  height: 16px;
}

.t1 {
  width: 26px;
  height: 26px;
}

.t2 {
  width: 36px;
  height: 36px;
}

.t3 {
  width: 66px;
  height: 66px;
}

.box .sasuke,
.boom {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  z-index: 10;
}

.box .boom2,
.boom {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
}

.box .score {
  position: absolute;
  top: 0;
  left: 10px;
  z-index: 50;
  line-height: 25px;
  color: #FFF;
  font-size: 14px;
  font-weight: bold;
}

.box .gameover {
  width: 300px;
  height: 300px;
  margin: 100px auto;
  background: #fff;
  color: #000;
}

.box .gameover h2 {
  font-size: 26px;
  text-align: center;
  line-height: 90px;
  color: #000;
}

.box .gameover>p {
  font-size: 14px;
  width: 100%;
  line-height: 30px;
  margin-top: 20px;
  cursor: normal;
}

.box .gameover p span {
  color: #ff6600;
  font-weight: bold;
  margin-left: 10px;
  font-size: 18px;
  font-style: italic;
}

.box .gameover .restart {
  width: 100px;
  height: 30px;
  line-height: 30px;
  background: #aaa;
  font-weight: bold;
  text-align: center;
  margin: 50px auto 0;
  font-size: 12px;
  cursor: pointer;
}

.box .gameover .restart:hover {
  color: #fff;
  background: #33f;
}
</style>
