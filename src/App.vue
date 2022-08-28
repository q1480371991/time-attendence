<template>
  <div id="app">
    <!-- topbar -->
    <div class="topbar box-shadow">
      <div class="menu-box small-button" ref="menubox" @click="showPopup" :class="{'active':show}">
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
      <van-sidebar v-model="activeKey" @change="indexchange">
        <van-sidebar-item title="首页" @click="tohome" class="widtht-100" />
        <van-sidebar-item title="21" to="/newrank" />
        <van-sidebar-item title="20" to="/oldrank" />
        <van-sidebar-item title="记录" @click="tomyrecord" />
        <van-sidebar-item title="聊天" @click="tochartroom" />
      </van-sidebar>
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
      activeKey: 0
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
    indexchange(index) {
      this.show = !this.show
      console.log(index);
    },
    tochartroom() {
      if (this.$store.state.status == 1) {
        this.$router.push("/chart")
      } else {
        alert("请先签到")
      }
    },
    tomyrecord() {
      if (this.$store.state.status == 1) {
        this.$router.push("/record")
      } else {
        alert("请先签到")
      }
    },
    tohome() {
      if (this.$store.state.status == 1) {
        this.$router.push("/home-aflogin")
      } else {
        this.$router.push("/home-login")
      }
    },
    showPopup() {
      this.show = true
    },
  }
}

</script>


<style lang="less" scoped>
@import url("./assets/css/base.css");
@import url("./assets/css/iconfont.css");










* {
  padding: 0;
  margin: 0;

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
</style>
