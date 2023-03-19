<template>
    <div>
        <van-dialog v-model="show" message="12" closeOnClickOverlay confirmButtonColor="#8cc5ff">
            <div class="dialog-box">
                <div class="top-box">
                    <div class="word-box">签到成功</div>
                </div>
                <div class="body-box">
                    <div class="first-box">学号：{{  tipstudentid  }}</div>
                    <div>姓名：{{  tipname  }}</div>
                    <div>签到开始时间：{{  tipstarttime  }}</div>
                    <div class="last-box">本周签到总时长：{{  tipweektime  }}</div>
                </div>
            </div>
        </van-dialog>
        <van-dialog v-model="show1" message="12" closeOnClickOverlay confirmButtonColor="#8cc5ff" @confirm="to">
            <div class="dialog-box">
                <div class="top-box">
                    <div class="word-box">签退成功</div>
                </div>
                <div class="body-box">
                    <div class="first-box">学号：{{  tipstudentid  }}</div>
                    <div>姓名：{{  tipname  }}</div>
                    <div>签到结束时间：{{  tipendtime  }}</div>
                    <div>本次签到总时长：{{  tiprecordtime  }}</div>
                    <div class="last-box">本周签到总时长：{{  tipweektime  }}</div>
                </div>
            </div>
        </van-dialog>
        <van-dialog v-model="show2" message="12" closeOnClickOverlay confirmButtonColor="#8cc5ff" @confirm="to">
            <div class="dialog-box">
                <div class="top-box erro-color">
                    <div class="word-box ">签到失败</div>
                </div>
                <div class="body-box">
                    <div class="first-box">{{  tipmsg  }}</div>

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
                    <div class="first-box">{{  tipmsg  }}</div>

                    <div class="last-box"></div>
                </div>
            </div>
        </van-dialog>
        <div class="container-box">
            <div class="state-box box-shadow">
                <div class="left-box">
                    <el-button type="success" icon="el-icon-check" circle class="button-color" @click="refresh"></el-button>
                </div>
                <div class="font-statu right-box">
                    <div class="font-loginstatus ">已签到</div>
                    <div class="margin-top">学号:{{  currentstudentid  }}</div>
                    <div class="margin-top">姓名:{{  currentname  }}</div>
                    <div class="margin-top">时间:{{  currentstartTime  }}</div>
                </div>
            </div>
            <Inputbox class="add" @datachange="setdata" :msg="currentstudentid"></Inputbox>

            <div class="button-box">
                <van-button round type="info" plain class="button-add" @click="login" :disabled="isuse">签到</van-button>.
                <van-button round type="info" plain class="button-add" @click="logout">签退</van-button>
            </div>

            <div class="online-box">
                <div class="box-h">当前在教室的人数:{{  onlinelist.length  }}</div>
                <div class="show-box">
                    <el-table :data="onlinelist.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                        style="width: 100%" :row-class-name="tableRowClassName">
                        <el-table-column prop="studentid" label="学号" min-width="180" align="center">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" min-width="180" align="center">
                        </el-table-column>
                        <!-- <el-table-column prop="address" label="地点" min-width="180" align="center">
                        </el-table-column> -->

                        <el-table-column prop="startTime" label="签到时间" min-width="180" align="center">
                        </el-table-column>
                        <el-table-column label="操作" min-width="180" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" @click="open(scope.$index)">
                                    <van-button type="warning">举报</van-button>
                                </el-button>
                            </template>

                        </el-table-column>
                    </el-table>
                </div>
                <div class="block block-add">
                    <!-- <span class="demonstration">完整功能</span> -->
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page="currentPage" :page-sizes="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper" :total="onlinelist.length">

                    </el-pagination>
                </div>
            </div>


        </div>

    </div>
</template>

<script>
import Inputbox from '../box/inputbox.vue';
import bus from '@/eventBus/eventBus.js'
import request from '@/utils/request.js'
import { loginorlogout } from '@/api/userserviseAPI.js'
// import report from '@/api/reportAPI'
export default {
    name: "home-aflogin",
    data() {
        return {
            //签到签退提示的信息
            tipstudentid: "",
            tipname: "",
            tipmsg: "",
            tiprecordtime: "",
            tipstarttime: "",
            tipendtime: "",
            tipweektime: "",
            show: false,
            show1: false,
            show2: false,
            show3: false,
            isto: false,
            isuse: true,



            //当前的信息
            currentstudentid: "",
            currentid: "",
            currentname: "",
            currentstartTime: "",
            currentPage: 1,
            pageSize: 3, //每一页显示的数据量 此处每页显示6条数据

            onlinelist: [],

        }
    },

    async created() {
        this.init();
    },
    beforeDestroy() {
        this.isto = false;
        this.isuse = false;
    },
    methods: {
        async init() {
            this.currentstudentid = this.$store.state.studentid
            this.currentid = this.$store.state.id
            this.currentname = this.$store.state.name
            this.currentstartTime = this.$store.state.starttime

            this.tipstudentid = this.currentstudentid




            //当前在教室人数
            const { data: res } = await request.get('/showonline')
            this.onlinelist = res.data
        },
        refresh(){
            this.init();
        },
        setdata(val) {
            this.tipstudentid = val;
            if (this.currentstudentid == val) this.isuse = true;
            else this.isuse = false;
        },
        handleSizeChange(val) {
            this.pageSize = val;
        },
        handleCurrentChange(val) {
            this.currentPage = val
        },
        async login() {
            if(this.$store.state.in_five_building || this.$store.state.in_wisdom_valley){
                if (this.studentid != "") {
                const { data: res } = await loginorlogout(true, this.tipstudentid)
                console.log(res);

                if (res.data != null) {

                    this.tipname = res.data.name;
                    this.tipstarttime = res.data.startTime;
                    this.tipweektime = res.data.weekTime;

                }

                this.tipmsg = res.msg;

                if (res.code == 20011) {
                    //签到成功且没有签到
                    this.show = !this.show
                    //清除定位信息
                    that.$store.commit('recordin',[false,false]);
                } else if (res.code == 20050) {
                    //已签到
                    this.show2 = !this.show2;
                    //清除定位信息
                    that.$store.commit('recordin',[false,false]);
                } else if (res.code == 20070) {
                    //学号不存在
                    this.show2 = !this.show2;

                }
            } else {
                console.log(1);
                this.id = null;
            }
            }else{
                alert("不在规定区域范围内,请先进行定位")
            }
        },
        async logout() {
            if(this.$store.state.in_five_building || this.$store.state.in_wisdom_valley){
                if (this.studentid != "") {
                const { data: res } = await loginorlogout(false, this.tipstudentid)
                if (res.data != null) {
                    this.tipname = res.data.name;
                    this.tipstarttime = res.data.startTime;
                    this.tipendtime = res.data.endTime;
                    this.tipweektime = res.data.weekTime;
                    this.tiprecordtime = res.recordtime;
                }


                this.tipmsg = res.msg;
                console.log(res);
                if (res.code == 20021) {
                    //签退成功且没有签退
                    if (this.currentstudentid == this.tipstudentid) {
                        this.isto = true
                        this.$store.commit('logoutrecord')
                        
                    }
                    // console.log(res.msg);
                    this.show1 = !this.show1
                    //清除定位信息
                    that.$store.commit('recordin',[false,false]);
                } else if (res.code == 20060) {
                    //已签退
                    this.show3 = !this.show3;
                    //清除定位信息
                    that.$store.commit('recordin',[false,false]);
                } else if (res.code == 20080) {
                    //学号不存在
                    this.show3 = !this.show3;

                }
            } else {
            }
            }else{
                alert("不在规定区域范围内,请先进行定位")
            }
        },

        to() {
            if (this.isto) this.$router.push("/home-login")
        },
        tableRowClassName({ row, rowIndex }) {
            //把每一行的索引放进row
            row.index = rowIndex;
        },
        async report(index) {
            console.log("举报" + this.onlinelist[index].name);
            // const { data: res } = await request('/test1', {
            //     method:"post",
            //     dara: JSON.stringify({
            //         reportid: this.onlinelist[index].studentid,
            //         reporterid: this.$store.state.studentid
            //     }),
            //     headers: {
            //         'content-type': 'application/json'
            //     }
            // })
            
            //不用指定content-type？
            const { data: res } = await request.post('/report',{
                reportid: this.onlinelist[index].studentid,
                reporterid: this.$store.state.studentid
            })
            return res
        },
        async open(index) {
            const that =this
            this.$confirm('此操作将举报' + this.onlinelist[index].name + ', 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // const { data: res } = await request.post('/showonline')
                // console.log(res);
                var type=null;
                this.report(index).then(res=>{
                    
                    if(res.flag==true){
                        type='success'
                    }else{
                        type='error'
                    }
                    this.$message({
                    type: type,
                    message: res.msg
                });
                })
                
                that.init()
                
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消举报'
                });
            });
        }
    },
    components: { Inputbox }
}

</script>


<style lang="less" scoped>
* {
    padding: 0;
    margin: 0;
    font-family: "阿里巴巴普惠体 2.0 45 Light";

}

//提示css
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

//提示css
.block-add {
    margin-left: 75px;
}

.button-color {
    background-color: #79bbff;
}

.show-box {
    display: flex;
    flex-direction: column;
}

.online-box {
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
    width: 100%;
    margin-top: 30px;
    border-radius: 2px;
}

.box-h {
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 10px;
    font-weight: bolder;
    font-size: large;
}

.button-add {
    // border-radius: 28px !important;
}

.button-box {
    margin-top: 20px;
}

.add {
    width: 100%;
    padding: 0px;
    margin-top: 45px;
}

.font-loginstatus {
    font-weight: bolder;
    font-size: large;
}

.margin-top {
    margin-top: 5px;
}

.font-statu {
    margin-top: 10px;
    margin-bottom: 10px;
    color: white;
    font-family: Roboto, sans-serif;
}

.right-box {
    margin-left: 30px;
}

.left-box {
    margin-left: 10px;
    margin-top: 10px;
}

.box-shadow {
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
}

.container-box {
    margin-top: 50px !important;
    flex-direction: column;
    display: flex;
    width: 80%;
    height: 300px;

    margin: auto;
    // background-color: blue;
}

.state-box {

    flex-direction: row;
    display: flex;
    width: 100%;
    background-color: #4caf50;
    border-radius: 5px;
}
</style>