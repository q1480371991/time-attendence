<template>
  <div id="app">
    <Topbar @showPopup="getshowPopup"></Topbar>

    <router-view></router-view>
    <!-- <div class="chart-box"> test</div> -->
    <van-popup v-model="show" position="left" :style="{ width: '15%', height: '100%' }" class="box-shadow"
      overlay-class="v-overlay ">
      <van-sidebar v-model="activeKey" @change="indexchange">
        <van-sidebar-item title="首页" @click="tohome" class="widtht-100" />
        <van-sidebar-item title="21" to="/newrank" />
        <van-sidebar-item title="20" to="/oldrank" />
        <van-sidebar-item title="记录" @click="tomyrecord" />
        <van-sidebar-item title="聊天"  @click="tochartroom" />
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
    tochartroom(){
      if(this.$store.state.status==1)
      {
        this.$router.push("/chart")
      }else{
        alert("请先签到")
      }
    },
    tomyrecord(){
      if(this.$store.state.status==1)
      {
        this.$router.push("/record")
      }else{
        alert("请先签到")
      }
    },
    tohome(){
      if(this.$store.state.status==1)
      {
        this.$router.push("/home-aflogin")
      }else{
        this.$router.push("/home-login")
      }
    }
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
</style>
