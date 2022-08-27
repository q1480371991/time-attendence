<template>
    <div class="wrapper">
        <div class="input-data">
            <input v-model="studentid" type="text" required class="add" @input="datachange" :disabled="istime">
            <div class="underline" ref="underline"></div>
            <label>输入学号</label>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default{

    name:'inputbox',
    props:["msg"],
    computed:{
        ...mapState(["istime"])
    },
    data() {
    return {
      studentid:""
    }
    },
    created(){
        this.studentid=this.msg
    },
    methods:{
    datachange(val){
        this.$emit('datachange',this.studentid)
    },
  }
  
}

</script>


<style lang="less" scoped>
* {
    margin: 0;
    padding: 0;
    outline: none;
    /* 这个属性是告诉浏览器：你想要设置的边框和内边距的值是包含在总宽高内的 */
    box-sizing: border-box;
}
.add{
    background-color: transparent;
    // color:red
}
body {
    /* 弹性布局 水平垂直居中 */
    display: flex;
    justify-content: center;
    align-items: center;
    /* 设置body最小高度为100%窗口高度 */
    min-height: 100vh;
    /* 渐变背景 */
    background: linear-gradient(200deg, #0c3483, #a2b6df);
}

.wrapper {
    width: 240px;
    // background-color: #fff;
    /* 内边距（上下左右） */
    padding: 40px;
    /* 盒子阴影 */
    // box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    /* 圆角 */
    border-radius: 8px;
}

.wrapper .input-data {
    /* 相对定位 */
    position: relative;
    width: 100%;
    height: 40px;
}

.wrapper .input-data input {
    width: 100%;
    height: 100%;
    border: none;
    font-size: 17px;
    //红色
    color: #ff5252;
    //获得焦点之前的颜色
    //原来的灰色
    // color: #c0c0c0;
    border-bottom: 2px solid ;
}


/* 输入框获得焦点时 */

.wrapper .input-data input:focus~label,

/* 输入框的值为合法时 */

.wrapper .input-data input:valid~label {
    /* label上移，同时改变字号、字体颜色 */
    transform: translateY(-25px);
    font-size: 15px;
    color: #2c6fdb;
}

.wrapper .input-data label {
    /* 绝对定位 */
    position: absolute;
    bottom: 10px;
    left: 0px;
    
    color: red;
    /* 这个属性可以使点击label穿透到输入框 */
    pointer-events: none;
    /* 现在动画有点生硬，在这里需要给动画加个过渡 */
    transition: all 0.3s ease;
}

.wrapper .input-data .underline {
    position: absolute;
    bottom: 0px;
    height: 2px;
    width: 100%;
    background-color: #2c6fdb;
    //获得焦点之后的颜色
    // background-color: red;
    /* 沿X轴缩小 */
    transform: scaleX(0);
    /* 这里同样给动画加个过渡 */
    transition: all 0.3s ease;
}

.wrapper .input-data input:focus~.underline,
.wrapper .input-data input:valid~.underline {
    /* 沿X轴放大 */
    transform: scaleX(1);
}
</style>