<template>
  <div class="container" >
    <img class='bg' src="http://wxplat-1251575231.file.myqcloud.com/images/24218a05-bbeb-4196-9e58-4e379c184741_80.jpg" alt="">
    <div id="flame">
        <div class="draw" v-for="item in drawList" :style="{ position:'absolute',color: item.color, fontSize:item.fontSize, left:item.left, opacity:item.opacity, top:item.top?item.top:'' }">✽</div>
    </div>
    <img class="shu" src="http://wxplat-1251575231.file.myqcloud.com/images/321546b852d20a57d0ad4495ea0cbcb1-min.png" alt="">

    <!-- <div class="sled chs-boy-deer" :animation="animationData"></div>
    <div class="sledbot" :animation="animationData1"></div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      windowWidth: '',
      windowHeight: '',
      drawList:[],
      index:0,
      timer:null,
      pageTimer:{},
      animationData: {},
      animationData1: {}
    }
  },
  components: {

  },
  methods: {
    draw (index) {
      let _this = this
      let speed = 0;
      let startPosLeft = Math.ceil(Math.random()*_this.windowWidth);
      let opacity = (Math.ceil(Math.random()*3)+7)/10;
      let left = startPosLeft+'px';
      let color = '#FFF';
      let fontSize = 12+Math.ceil(Math.random()*14)+'px';
      let drawDate={
        'speed':speed,
        'startPosLeft':startPosLeft,
        'opacity':opacity,
        'left':left,
        'color':color,
        'fontSize':fontSize,
      }
      _this.drawList.push(drawDate)

      _this.pageTimer["timer"+index]=setInterval(function(){
            //雪花下落的top值小鱼屏幕的可视区域高时执行下列
            if(speed<_this.windowHeight){

                _this.drawList[index].top=speed+'px'
                _this.drawList[index].left=startPosLeft+Math.ceil(Math.random()*8)+'px';
                speed+=10;
            }
            else{
                _this.drawList[index].display='none';
            }

        },300);

    }
  },
  created () {
    var _this = this
    wx.getSystemInfo({
      success: function(res) {
        _this.windowWidth = res.windowWidth
        _this.windowHeight = res.windowHeight
      },
    })
    _this.timer = setInterval(() => {

      _this.draw (_this.index)
      _this.index=_this.index+1

    }, 800)

    setInterval(() => {
       clearInterval(_this.timer)

     }, 300000)
     setInterval(() => {
       for(var each in _this.pageTimer){
           clearInterval(_this.pageTimer[each]);
       }
    }, 360000)

    const animation = wx.createAnimation({
      duration: 5000,
      timingFunction: 'linear',
    })

    this.animation = animation;

    animation.scale(1, 1).top(300).right(400).step()

    _this.animationData= animation.export()

  }
}
</script>

<style scoped>

  .container{
    height:100vh;
    width:100vw;
    padding:0;
  }
  .bg{
    height:100%;width:100%;
    background-color:rgba(0,0,0,0.8);
  }
  #flame .draw{
    transition: all 0.9s;
  }
  .shu{
    position:absolute;
    bottom:3%;
    left:10%;
    width:600rpx;
    height:900rpx;
  }
  /* .sled{
    position:absolute;right:-300rpx;
    top:0;
    width:550rpx;height:200rpx;
    background: url(http://wxplat-1251575231.file.myqcloud.com/images/boy-sleigh-car.png) -300% -100%;
    background-size : 400% 100%;
    transform: scale(0.1);
  }
  .sledbot{
    position:absolute;left:-300rpx;
    bottom:0;
    width:550rpx;height:200rpx;
    background: url(http://wxplat-1251575231.file.myqcloud.com/images/boy-sleigh-car.png) -300% -100%;
    background-size : 400% 100%;

  } */
  /* .chs-boy-deer {
    -webkit-animation:chsBoyDeer 0.75s steps(3,end) infinite;
    -moz-animation:chsBoyDeer 0.75s steps(3,end) infinite;
}

@-webkit-keyframes chsBoyDeer {
    0% {
        background-position: -0% 100%;
    }
    100% {
        background-position: -300% 100%;
    }
}
@-moz-keyframes chsBoyDeer {
    0% {
        background-position: -0% 100%;
    }
    100% {
        background-position: -300% 100%;
    }
} */


</style>
