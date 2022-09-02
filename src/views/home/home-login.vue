<template>
    <div class="container">
        <van-dialog v-model="show" message="12" closeOnClickOverlay confirmButtonColor="#8cc5ff" @confirm="to">
            <div class="dialog-box">
                <div class="top-box">
                    <div class="word-box">签到成功</div>
                </div>
                <div class="body-box">
                    <div class="first-box">学号：{{ studentid }}</div>
                    <div>姓名：{{ name }}</div>
                    <div>签到开始时间：{{ starttime }}</div>
                    <div class="last-box">本周签到总时长：{{ weektime }}</div>
                </div>
            </div>
        </van-dialog>
        <van-dialog v-model="show1" message="12" closeOnClickOverlay confirmButtonColor="#8cc5ff">
            <div class="dialog-box">
                <div class="top-box">
                    <div class="word-box">签退成功</div>
                </div>
                <div class="body-box">
                    <div class="first-box">学号：{{ studentid }}</div>
                    <div>姓名：{{ name }}</div>
                    <div>签到结束时间：{{ endtime }}</div>
                    <div class="last-box">本次签到总时长：{{ recordtime }}</div>
                </div>
            </div>
        </van-dialog>
        <van-dialog v-model="show2" message="12" closeOnClickOverlay confirmButtonColor="#8cc5ff" @confirm="to">
            <div class="dialog-box">
                <div class="top-box erro-color">
                    <div class="word-box ">签到失败</div>
                </div>
                <div class="body-box">
                    <div class="first-box">{{ msg }}</div>

                    <div class="last-box"></div>
                </div>
            </div>
        </van-dialog>
        <van-dialog v-model="show3" message="12" closeOnClickOverlay confirmButtonColor="#8cc5ff" @confirm="to">
            <div class="dialog-box">
                <div class="top-box erro-color">
                    <div class="word-box ">签退失败</div>
                </div>
                <div class="body-box">
                    <div class="first-box">{{ msg }}</div>

                    <div class="last-box"></div>
                </div>
            </div>
        </van-dialog>
        <form action="#" class="login-form">
            <!-- <input
            type="text"
            name="password"
            placeholder="学号"
          /> -->
            <Inputbox @datachange="setdata"></Inputbox>
            <button @click="login" :disabled="istime">签到</button>
            <button @click="logout" :disabled="istime" >签退</button>
        </form>
    </div>

</template>

<script>
import Inputbox from '../box/inputbox.vue'
import { loginorlogout } from '@/api/userserviseAPI.js'




export default {
    name: "Home",
    computed:{
    },
    data() {
        return {
            id: "",
            name: "",
            starttime: "",
            endtime: "",
            weektime: "",
            recordtime: "",
            studentid: "",

            show: false,
            show1: false,
            show2: false,
            show3: false,

            isto: false,
            islogined: false,
            msg: "",
            istime:false,
        }
    },
    methods: {
        async login() {
            if (this.studentid != "") {
                const { data: res } = await loginorlogout(true, this.studentid)
                console.log(res);

                if (res.data != null) {
                    this.id = res.data.id;
                    this.name = res.data.name;
                    this.starttime = res.data.startTime;
                    this.endtime = res.data.endTime;
                    this.weektime = res.data.weekTime;
                    this.recordtime = res.recordtime;
                }

                this.msg = res.msg;

                if (res.code == 20011) {
                    //签到成功且没有签到
                    this.isto = true;
                    // console.log(res.msg);
                    this.show = !this.show
                    this.$store.commit('loginrecord',res.data)
                    // console.log(this.$store.state);
                } else if (res.code == 20050) {
                    //已签到
                    this.islogined = !this.islogined
                    this.$store.commit('loginrecord',res.data)
                    this.isto = true;
                    this.show2 = !this.show2;
                } else if (res.code == 20070) {
                    //学号不存在
                    this.show2 = !this.show2;

                }
            } else {
                
            }
        },
        async logout() {
            if (this.studentid != "") {
                const { data: res } = await loginorlogout(false, this.studentid)


                this.id = res.data.id;
                this.name = res.data.name;
                this.starttime = res.data.startTime;
                this.endtime = res.data.endTime;
                this.weektime = res.data.weekTime;
                this.recordtime = res.recordtime;

                this.msg = res.msg;
                console.log(res);
                if (res.code == 20021) {
                    //签退成功且没有签退
                    // this.isto=true;
                    // console.log(res.msg);
                    
                    this.show1 = !this.show1
                } else if (res.code == 20060) {
                    //已签退
                    this.show3 = !this.show3;
                } else if (res.code == 20080) {
                    //学号不存在
                    this.show3 = !this.show3;

                }
            } else {
                
            }
        },
        setdata(val) {
            this.studentid = val;
        },
        async to() {
            if (this.isto) {
                this.$router.push({
                    name: 'home-aflogin',
                    params: {
                        studentid: this.studentid,
                        id: this.id,
                        name: this.name,
                        starttime: this.starttime
                    }
                })

            }
            

        },
        auto(){
            var schedule = require('node-schedule');
            var that =this
            //禁止打卡
            var j=schedule.scheduleJob({hour:23,minute:30},function(){
                console.log("schedule");
                that.istime=true
            })

            // 允许打卡
            var j=schedule.scheduleJob({hour:7},function(){
                that.istime=false
            })
        }
    },
    created(){
        console.log("created");
        this.auto()
    },
    destroyed() {
    },
    components: { Inputbox }
}

</script>


<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
  font-family:"阿里巴巴普惠体 2.0 45 Light" ;

}
html,
body {
    font-family:"阿里巴巴普惠体 2.0 45 Light" ;
    margin: 0;
    font-family: "PingFang SC", "Microsoft Yahei", sans-serif;
}

.erro-color {
    background-color: #f34135 !important;
}

.first-box {
    margin-top: 20px;
}

.last-box {
    margin-bottom: 20px;
}

.body-box div {
    margin-left: 20px;
    color: #c0c0c0;
}

.body-box {
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
}

.word-box {

    margin-top: 7px;
    margin-left: 20px;

}

.top-box {

    width: 100%;
    background-color: #8ac149;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
    font-size: 25px;
    height: 50px;
    // text-align: center;
}

.dialog-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    // height: 50px;
}

.container {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(@/assets/bc.avif) fixed no-repeat;
    background-size: cover;

    ::v-deep .van-dialog {
        border-radius: 4px;
        box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
    }
}

.login-form {
    width: 240px;
    height: 260px;
    display: flex;
    flex-direction: column;
    padding: 40px;
    text-align: center;
    position: relative;
    z-index: 100;
    background: inherit;
    border-radius: 18px;
    overflow: hidden;
    /* 隐藏多余的模糊效果 */
}

.login-form::before {
    content: "";
    width: calc(100% + 20px);
    height: calc(100% + 20px);
    position: absolute;
    top: -10px;
    left: -10px;
    overflow: hidden;
    background: inherit;
    box-shadow: inset 0 0 0 200px rgba(255, 255, 255, 0.25);
    filter: blur(6px);
    z-index: -1;
}

.login-form h2 {
    font-size: 18px;
    font-weight: 400;
    color: #3d5245;
}

.login-form input,
.login-form button {
    margin: 6px 0;
    height: 36px;
    border: none;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    padding: 0 14px;
    color: #3d5245;
}

.login-form input::placeholder {
    color: #3d5245;
}


/* 补充，取消选中高亮蓝框 */

.login-form button:focus,
.login-form input:focus {
    outline: 0;
}

.login-form button {
    margin-top: 24px;
    background-color: rgba(57, 88, 69, 0.4);
    color: white;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: 0.4s;
}

.login-form button:hover {
    background-color: rgba(12, 80, 38, 0.67);
}

.login-form button:focus {
    outline: 0;
}

.login-form button::before,
.login-form button::after {
    content: "";
    display: block;
    width: 80px;
    height: 100%;
    background: rgba(179, 255, 210, 0.5);
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
    transform: skewX(-15deg);
    filter: blur(30px);
    overflow: hidden;
    transform: translateX(-100px);
}

.login-form button::after {
    width: 40px;
    background: rgba(179, 255, 210, 0.3);
    left: 60px;
    opacity: 0;
    filter: blur(5px);
}

.login-form button:hover::before {
    transition: 1s;
    transform: translateX(320px);
    opacity: 0.7;
}

.login-form button:hover::after {
    transition: 1s;
    transform: translateX(320px);
    opacity: 1;
}
</style>