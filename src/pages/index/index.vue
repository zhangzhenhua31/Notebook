<template>
  <div class="container" >
    <img class='bg' src="http://wxplat-1251575231.file.myqcloud.com/images/24218a05-bbeb-4196-9e58-4e379c184741_80.jpg" alt="">
    <div id="flame">
        <div class="draw" v-for="item in drawList" :style="{ position:'absolute',color: item.color, fontSize:item.fontSize, left:item.left, opacity:item.opacity, top:item.top?item.top:'',display:item.display?item.display:'block' }">✽</div>
    </div>
    <img class="shu" src="http://wxplat-1251575231.file.myqcloud.com/images/321546b852d20a57d0ad4495ea0cbcb1-min.png" alt="">
    <div class="pic_btn" @click="showPic">
      <p></p>
    </div>
    <div class="quan_btn" @click="showquan">
        <p></p>
    </div>
    <div class="kong_btn" @click="showKong">
        <p></p>
    </div>
    <div class="cover" v-if="isShowpic||isShowquan"></div>
    <div class="pic_list" v-show="isShowpic">
      <div class="swiper-box">
        <swiper class="slider-wrap" autoplay indicator-dots=false circular @change="swiperChange">
          <swiper-item v-for="(item,index) in sliderPic" :key="index">
            <div class="slider-item">
              <img class="slider-img" :src="item.pic+'?imageView2/1/w/375/h/188'" alt="">
            </div>
          </swiper-item>
        </swiper>
      </div>
      <div class="dots">
          <div class="dot" v-for="slide of sliderPic"  :class="{active:index==swiperCurrent}">
            {{slide.name}}
          </div>
          <div class="close" @click="closeShowPic">关闭</div>
      </div>
    </div>
    <div class="quancontent" v-show="isShowquan">
      <div class="box" >
          <div class="">
            <h4>愿望券</h4>
            <p>该券可以找本小程序开发者兑换使用</p>
            <p>使用人仅限王佳芮同学</p>
            <p>使用方式：截图保存然后发送给开发者，说明心愿</p>
            <i class="userIcon" >未使用</i>
          </div>
        </div>
        <div class="quanClose" @click="closeShowquan">关闭</div>
    </div>
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
      animationData1: {},
      swiperCurrent: 0,
      isShowpic:false,
      isShowquan:false,
      sliderPic:[
        {
          pic:'http://dscdn-1251575231.file.myqcloud.com/site_views/IMG_1591.JPG',
          name:'初识'
        },
        {
          pic:'http://dscdn-1251575231.file.myqcloud.com/site_views/IMG_1303.JPG',
          name:'咖啡馆'
        },
        {
          pic:'http://dscdn-1251575231.file.myqcloud.com/site_views/IMG_1593.JPG',
          name:'游玩迪士尼'
        },
        {
          pic:'http://dscdn-1251575231.file.myqcloud.com/site_views/IMG_1568.JPG',
          name:'佳芮真好看'
        }
      ]
    }
  },
  components: {

  },
  methods: {
    showKong(){
      wx.showToast({
        title: '这个礼盒弹出了一团雪，彭，你的脸上都是雪沫，哈哈哈',
        icon: 'none',
        duration:  2000
      })
    },
    closeShowPic(){
      this.isShowpic=false;
    },
    closeShowquan(){
      this.isShowquan=false;
    },
    showquan(){
      this.isShowquan=true;
    },
    showPic(){
      this.isShowpic=true;
    },
    swiperChange (e) {
      this.swiperCurrent = e.target.current
    },
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
  onShareAppMessage: function (res) {
    return {
      title: '圣诞节快乐',
      path: '/pages/index/main',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  created () {
    var _this = this
    wx.playBackgroundAudio({
      dataUrl: 'http://sc1.111ttt.cn/2015/1/12/23/105231739373.mp3',
      title:'',
      //图片地址地址
      coverImgUrl:''
    })
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
    overflow: hidden;
  }
  .bg{
    height:100%;width:100%;
    background-color:rgba(0,0,0,0.8);
  }
  #flame{
    height:100vh;
    width:100vw;
    padding:0;
    position:absolute;
    top:0;
    left:0;
    overflow: hidden;
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
  .pic_btn{
    position:absolute;
    width:160rpx;height:200rpx;
    left:50rpx;bottom:10vh;
  }
  .quan_btn{
    position:absolute;
    width:250rpx;
    height:232rpx;
    left:270rpx;
    bottom:4vh;

  }
  .kong_btn{
    position:absolute;
    width:160rpx;height:200rpx;
    right:50rpx;bottom:11vh;
  }
  .pic_list{
    position:absolute;
    width:80vw;
    left:10vw;
    top:10vh;
  }
  .pic_list .swiper-box{
    width:100%;height:80vw;
    position:relative;
    border-radius: 40rpx;
    overflow: hidden;

  }
  .pic_list .swiper-box .slider-wrap{
    width:100%;height:80vw;
  }
  .pic_list .swiper-box .slider-wrap .slider-item{
    width:100%;height:100%;
  }
  .pic_list .swiper-box .slider-wrap .slider-item img{
    width:100%;height:100%;
  }

  .cover{
    position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height:100%;
      background-color: rgba(0,0,0,0.5);
  }
  .dot.active{
    color:#fff;
  }
  .close{
    text-align: center;
    background:#fff;
    border-radius: 30rpx;
    margin-top:50rpx;
    padding:10rpx 0;
  }
  .quanClose{
    text-align: center;
    margin:50rpx auto;
    background:#fff;
    border-radius: 30rpx;
    color:#000;
    width:60%;
    padding:10rpx 0;
  }
  .quancontent{
    position:absolute;
    top:200rpx;
    /* background:#f5f5f5; */
    left:0;
    width:100%;
    font-size:14px;
  }
  .quancontent .box{
    border-radius: 10px;
    height:112px;
    margin:15px;
    background:#fff;
    padding:20rpx;
    box-shadow:6rpx 8rpx 4rpx 0 rgba(0, 0, 0, 0.05);
    background-size:cover;
    overflow: hidden;
  }
  .quancontent .box h4{
      font-size:18px;
      line-height: 40rpx;
      margin-bottom:10rpx;
  }
  .quancontent .box p{
      color:#888;
      line-height: 40rpx;
  }
  .quancontent .box i{
      color:#888;
      margin-top:20rpx;
  }

</style>
