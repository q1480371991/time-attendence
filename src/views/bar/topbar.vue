<template>
  <div class="topbar box-shadow">
    <van-button icon="plus" type="primary" @click="showPopup" class="small-button"/>
    <van-button type="default" @click="tochart"><van-icon name="chat-o" size="3rem" color="#76ad6c" /></van-button>
  </div>
</template>

<script>
export default{
    name:'topbar',
    data() {
    return {
      
    };
    },
    methods:{
    showPopup() {
      this.$emit('showPopup',true)
    },
    tochart(){
      
    }
  }
  
}

</script>


<style lang="less" scoped>
.topbar{
    height: 56px;
    margin-top: 0px;
    transform: translateY(0px);
    left: 0px;
    right: 0px;
    background-color:#90caf9;

    

};
.box-shadow{
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
}
.small-button{
  position: absolute;
  display: flex;
  right:  0px;
  top: 5px;
  
}
</style>