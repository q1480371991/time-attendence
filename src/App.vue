<template>
  <div id="app">
    <!-- topbar -->
    <div class="topbar box-shadow">
      
      <div class="menu-box small-button" ref="menubox" @click="showPopup" :class="{ 'active': show }">
        <!-- 图标按钮 -->
        <div class="menu-button">
          <div class="line-box">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- topbar -->

    <!-- 路由 -->
    <router-view></router-view>
    <!-- 路由 -->


    <van-popup v-model="show" position="left" :style="{ width: '15%', height: '100%' }" class="box-shadow"
      overlay-class="v-overlay ">
      <nav class="shell light ">
        <div  class="shell__item " @click="tohome" :class="{'shell_selected':activeKey==1?true:false}">
          <i class="shell__icon  iconfont icon-home"></i>
          
          <span class="shell__title">Home</span>
        </div>
        <div  class="shell__item" @click="torank(22) " :class="{'shell_selected':activeKey==2?true:false}">
          <i class="shell__icon iconfont icon-rank"></i>
          <span class="shell__title">22</span>
        </div>
        
        <div  class="shell__item" @click="torank(21)" :class="{'shell_selected':activeKey==3?true:false}">
          <i class="shell__icon iconfont icon-rank"></i>
          <span class="shell__title">21</span>
        </div>
        <div  class="shell__item" @click="tomyrecord" :class="{'shell_selected':activeKey==4?true:false}">
          <i class="shell__icon iconfont icon-record"></i>
          <span class="shell__title">Record</span>
        </div>
        <div  class="shell__item" @click="tochartroom" :class="{'shell_selected':activeKey==5?true:false}">
          <i class="shell__icon iconfont icon-chat"></i>
          <span class="shell__title">Chat</span>
        </div>
        <div  class="shell__item" @click="tomap" :class="{'shell_selected':activeKey==6?true:false}">
          <i class="shell__icon iconfont icon-chat"></i>
          <span class="shell__title">Map</span>
        </div>
      </nav>

    </van-popup>
  </div>
</template>

<script>
import Topbar from "./views/bar/topbar.vue";
import slidbar from "@/views/bar/slidbar.vue"

export default {
  data() {
    return {
      show: false,
      activeKey: 1,
    }
  },
  components:
  {
    Topbar,
    slidbar,

  },
  methods: {
    getshowPopup(val) {
      this.show = val;

    },
    
    tochartroom() {
      if (this.$store.state.status == 1) {
        this.activeKey=5
        this.$router.push("/chart")
      } else {
        alert("请先签到")
      }
    },
    tomyrecord() {
      if (this.$store.state.status == 1) {
        this.activeKey=4
        this.$router.push("/record")
      } else {
        alert("请先签到")
      }
    },
    tohome() {
      this.activeKey=1
      if (this.$store.state.status == 1) {
        this.$router.push("/home-aflogin")
      } else {
        this.$router.push("/home-login")
      }
    },
    torank(grade){
      if(grade==22){
        this.activeKey=2
        this.$router.push("/newrank")
      }else if(grade==21){
        this.activeKey=3
        this.$router.push("/oldrank")
      }
      
    },
    showPopup() {
      this.show = true
    },
    tomap(){
      this.activeKey=6
      this.$router.push("/map")
    }
  }
}

</script>


<style lang="less" scoped>
@import url("./assets/css/base.css");
@import url("./assets/css/iconfont.css");





.icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }




* {
  padding: 0;
  margin: 0;
  font-family:"阿里巴巴普惠体 2.0 45 Light" ;

}

.box-shadow {
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
}

/deep/.v-overlay {
  opacity: 0.46 !important;
  background-color: rgb(33, 33, 33) !important;
  border-color: rgb(33, 33, 33) !important;
}

/deep/.widtht-100 {
  width: 100% !important;
}

.font-size-big {
  font-size: large;
}

//topbar 样式
.topbar {
  height: 56px;
  margin-top: 0px;
  transform: translateY(0px);
  left: 0px;
  right: 0px;
  background-color: #90caf9;



}

;

.box-shadow {
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
}

.small-button {
  position: absolute;
  display: flex;
  right: 0px;
  top: 5px;

}


//按钮样式
.menu-button {
  width: 50px;
  height: 50px;
  background-color: #5c67ff;
  border-radius: 50%;
  /* 投影 */
  box-shadow: 0 0 0 4px rgba(92, 103, 255, 0.3);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  cursor: pointer;
  /* 过渡 */
  transition: 0.2s ease-in;
}

.menu-button:hover {
  background-color: #4854ff;
  box-shadow: 0 0 0 8px rgba(92, 103, 255, 0.3);
}

.menu-button .line-box {
  width: 20px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: transform 0.3s ease-out;
}


/* 菜单按钮图标（三条杠） */

.menu-button .line {
  background-color: #fff;
  width: 100%;
  height: 2px;
  border-radius: 2px;
}


/* 前后两条短，中间的长 */

.menu-button .line:first-child {
  width: 50%;
  /* 设置变换的基点 */
  transform-origin: right;
  /* 过渡效果 */
  transition: transform 0.3s ease-in-out;
}

.menu-button .line:last-child {
  width: 50%;
  align-self: flex-end;
  transform-origin: left;
  transition: transform 0.3s ease-in-out;
}

/* 三条杠的变化 */

.active .line-box {
  transform: rotate(-45deg);
}

.active .line-box .line:first-child {
  transform: rotate(-90deg) translateX(1px);
}

.active .line-box .line:last-child {
  transform: rotate(-90deg) translateX(-1px);
}


/* 菜单列表的变化 */

.active .menu-list {
  opacity: 1;
  transform: scale(1);
}

.active .menu-list li {
  /* 执行动画：动画名 时长 线性 停留在最后一帧 */
  animation: fade-in-item 0.4s linear forwards;
}


/* 接下来为每一项设置动画延迟时间 */

.active .menu-list li:nth-child(1) {
  animation-delay: 0.1s;
}

.active .menu-list li:nth-child(2) {
  animation-delay: 0.2s;
}

.active .menu-list li:nth-child(3) {
  animation-delay: 0.3s;
}

.active .menu-list li:nth-child(4) {
  animation-delay: 0.4s;
}


/* 定义动画 */

@keyframes fade-in-item {
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}


//按钮样式
//topbar 样式

//侧边导航栏样式
.light {
  --shell-bg-color: #f3f4f6;
  --item-bg-color: #d1d5db;
  --item-hover-txt-color: #f19f9f;
  --item-txt-color: #000;
}

:root {
  --shell-bg-color: #312e81;
  --item-bg-color: #4338ca;
  --item-hover-txt-color: #312e81;
  --item-txt-color: #8c78f0;
}

.shell {
  /* width: 100px; */
  width: 100%;
  height: 100%;
  background-color: var(--shell-bg-color);
  // border-radius: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  transition: .3s;
  overflow: hidden;
}




.shell__item {
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 85%;
  height: 10%;
  margin: 9px;
  border-radius: 10px;
  position: relative;
  transition: .3s;
  color: var(--item-txt-color);
}


/* .shell__item:nth-child(1)::before,
.shell__item:nth-child(5)::before {
    content: "";
    display: block;
    width: 100%;
    height: 2px;
    background-color: var(--item-bg-color);
    position: absolute;
    bottom: -10px;
} */

.shell__item:hover {
  background-color: var(--item-bg-color);
  color: var(--item-hover-txt-color);
}
.shell_selected {
    background-color: var(--item-bg-color);
    color: var(--item-hover-txt-color);
}
.shell__icon {
  line-height: 40px;
  font-size: 40px;
  font-weight: bold;
  position: absolute;
  margin-left: .5em;
}

.shell__title {
  position: relative;
  left: 4em;
  font-size: 20px;
  font-weight: bold;
  opacity: 0;
  transition: .1s;
  opacity: 1;
}

//侧边导航栏样式
</style>
