<template>
<div class="menu-box" ref="menubox" @click="change">
        <!-- 图标按钮 -->
        <div class="menu-button">
            <div class="line-box">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
        </div>
</div>
</template>




<script>
export default{
    name:'mybutton',
    methods:{
        change(){
            this.$refs.menubox.classList.toggle('active')
        }
    }
}
</script>


<style lang="less" scoped>
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
</style>