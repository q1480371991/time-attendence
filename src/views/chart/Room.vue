<template>
  <div class="Room">
    <div class="room-left">
      <img src="@/assets/avatar/eight.jpg" alt="">
      <p class="iconfont icon-liaotianqingqiu" :class="{ 'active': isgroup === true ? true : false }"
        @click="change(true)"></p>
      <p class="iconfont icon-yonghu" :class="{ 'active': isgroup === false ? true : false }" @click="change(false)">
      </p>
    </div>
    <div class="room-center">
      <div class="center-h">
        <p>当前用户列表</p>

      </div>
      <div class="center-b">
        <ul>
          <!-- <li class="user-item active1" >
            <img :src="require('@/assets/avatar/' + 'one.jpg')" alt />
            <span>test1</span>
          </li>
          <li class="user-item">
            <img :src="require('@/assets/avatar/' + 'one.jpg')" alt />
            <span>test2</span>
          </li> -->
          <li class="user-item" v-for="(item, index) in onlinelist" :key="item.id"
            :class="{ active1: item.id == currentBranchId }" @click="handeleTabBranch(item.id, index)">
            <img :src="require('@/assets/avatar/' + item.avatar)" alt />
            <span>{{ item.name }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="room-right">
      <p class="name" v-if="isgroup">聊天室</p>
      <p class="name" v-else>{{ to.name }}</p>
      <div class="chatcontent">
        <ul class="join" v-if="isgroup" ref="joinUs1">
          <!-- 群聊消息 -->
          <li v-for="item in onlinelist" :key="item.id">欢迎{{ item.name }}加入群聊</li>
          <li v-for="(item1, index) in messageContent" :key="index"
            :class="{ 'my-message': item1.type === 0 ? true : false, 'other-message': item1.type === 1 ? true : false }"
            v-if="isgroup">
            <div v-if="item1.type == 0">

              <span>{{ item1.message }}</span>
              <img :src="require('@/assets/avatar/' + item1.avatar)" alt class="avatar" />

            </div>
            <div v-if="item1.type == 1">
              <p class="username">{{ item1.name }}</p>
              <img :src="require('@/assets/avatar/' + item1.avatar)" alt class="avatar" />
              <p class="content">{{ item1.message }}</p>


            </div>
          </li>
        </ul>
        <ul class="join" v-else ref="joinUs2">
          <!-- 私聊消息 -->
          <li v-for="(item, index) in privatemessageContent" :key="index"
            :class="{ 'my-message': item.type === 2 ? true : false, 'other-message': item.type === 3 ? true : false }">
            <!-- 自己的消息 -->
            <div v-if="item.type == 2 && item.to == to.studentid">
              <span>{{ item.message }}</span>
              <img :src="require('@/assets/avatar/' + item.avatar)" alt class="avatar" />

            </div>
            <!-- 别人的消息 -->
            <div v-if="item.type == 3 && item.from == to.studentid">
              <p class="username">{{ item.name }}</p>
              <img :src="require('@/assets/avatar/' + item.avatar)" alt class="avatar" />
              <p class="content">{{ item.message }}</p>

            </div>
          </li>
        </ul>
      </div>
      <div class="sendMessage">
        <div class="icon">
          <span class="iconfont icon-smile" @click="emojiShow = !emojiShow"></span>
          <div class="emoji" v-show="emojiShow" @blur="handleEmojiBlur">
            <span>emoji</span>
          </div>
          <label for="file" class="iconfont icon-wenjianjia"></label>
          <input type="file" style="display: none;" id="file" @change="handleFile">
          <span class="iconfont icon-jietu" @click="test"></span>
        </div>
        <textarea cols="80" rows="5" @keyup.enter="handelePress" ref="textarea"></textarea>
        <button class="sendMessage" @click="sendContentToServe">发送</button>
        <img :src="imgUrl" alt="">
      </div>
    </div>
  </div>
</template>

<script>
// import { send } from 'process';

export default {
  name: 'Room',
  data() {
    return {
      isgroup: true,
      currentBranchId: null,
      to: null,


      iconList: ['icon-liaotianqingqiu', 'icon-yonghu'],
      //群聊消息
      messageContent: [],
      //私聊消息
      privatemessageContent: [],
      onlinelist: [],
      content: '',
      emojiShow: false,
      ws: null,
      imgUrl: null,
      isgroup: true,


    }
  },
  methods: {

    test(){
      this.ws.close()
    },

    count(o) {
      //判断一个数组中有多少个对象的函数
      var t = typeof o;
      if (t == 'string') {
        return o.length;
      } else if (t == 'object') {
        var n = 0;
        for (var i in o) {
          n++;
        }
        return n;
      }
      return false;
    },
    init() {
      this.ws = new WebSocket("ws://localhost:8080/chart");

      this.ws.onopen = this.onopen;
      this.ws.onmessage = this.onmessage;
      this.ws.onerror = this.onerror;
      this.ws.onclose = function (e) {
        console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
        console.log(e)
      }
      // this.ws.onclose=this.onclose

    },
    onopen() {//建立连接后触发
      console.log("onopen");
    },
    onmessage(evt) {//接收到服务端的推送后触发
      console.log("onmessage");
      var dataStr = evt.data;
      //jsonData 格式举例（需要判断是否是系统消息）：{“systemMsgFlag”: false, "fromName": "YYJ", "message": “你在哪里呀？”}
      var jsonData = JSON.parse(dataStr);
      console.log(jsonData);
      if (jsonData.systemMsgFlag === true) {
        // 系统消息   用户上线或下线
        console.log("systemMsgFlag == true");
        this.onlinelist = jsonData.message
      } else {
        //聊天消息
        if (jsonData.message.type == 1) {
          //群聊消息
          this.messageContent.push({ ...jsonData.message })
        } else if (jsonData.message.type == 3) {
          //私聊消息
          // console.log("私聊消息");
          this.privatemessageContent.push({ ...jsonData.message })
        }

        // console.log("聊天消息");
      }

    },
    onerror() {//连接建立失败重连
      console.log("onerror");
      console.log("websocket 正在重新连接");
      this.init();
      
      
    },
    onclose() {//关闭连接触发
      console.log("onclose");
    },










    handeleTabBranch(id, index) {

      let self = this
      let touser = self.onlinelist[index]

      if (this.$store.state.studentid != touser.studentid) {
        self.to = self.onlinelist[index]
        self.currentBranchId = self.to.id
        self.isgroup = false
      } else {
        alert("不能给自己发消息")
      }

    },
    change(flag) {
      if (flag) {
        this.isgroup = true;
        this.currentBranchId = null;
      } else {
        this.isgroup = false
        this.currentBranchId = this.to.id
      }

      // this.to=null
    },



    handleEmojiBlur() {

      this.emojiShow = false
    },
    handleFile() {
      console.log("handleFile");
    },
    handelePress() {
      console.log("handelePress");
      this.sendContentToServe
    },
    sendContentToServe() {
      // 获取到聊天的内容
      this.content = this.$refs.textarea.value
      //清空输入框
      this.$refs.textarea.value = ''
      if (!this.content) {
        return alert('请输入内容')
      }
      //0为群聊-自己的消息  1为群聊-别人的消息  2为私聊-自己的消息  3为私聊-别人的消息
      if (this.isgroup) {
        var sendJson = { "id": this.$store.state.id, "to": null, "from": this.$store.state.studentid, "message": this.content, "type": 1, "name": this.$store.state.name, "studentid": this.$store.state.studentid, "time": null, "avatar": "two.jpg" };
        this.ws.send(JSON.stringify(sendJson))
        var sendJson1 = { "id": null, "to": null, "from": this.$store.state.studentid, "message": this.content, "type": 0, "name": this.$store.state.name, "studentid": this.$store.state.studentid, "time": null, "avatar": "two.jpg" };
        this.messageContent.push(sendJson1)
      } else {
        var sendJson2 = { "id": this.$store.state.id, "to": this.to.studentid, "from": this.$store.state.studentid, "message": this.content, "type": 3, "name": this.$store.state.name, "studentid": this.$store.state.studentid, "time": null, "avatar": "two.jpg" };
        this.ws.send(JSON.stringify(sendJson2))
        var sendJson3 = { "id": this.$store.state.id, "to": this.to.studentid, "from": this.$store.state.studentid, "message": this.content, "type": 2, "name": this.$store.state.name, "studentid": this.$store.state.studentid, "time": null, "avatar": "two.jpg" };
        this.privatemessageContent.push(sendJson3)
      }

    },
    handeleScrollBottom(){
      if(this.isgroup)
      {
        const ul = this.$refs.joinUs1
        ul.scrollTop = ul.scrollHeight
      }else{
        const ul = this.$refs.joinUs2
        ul.scrollTop = ul.scrollHeight
      }
    }
  },
  mouted() {
    console.log("mouted");
    
  },
  created(){
    console.log("chat room created");
    this.init();
  },
  destroyed(){
    this.ws.close();
    console.log("chat room destroyed");
  },
  updated(){
    this.handeleScrollBottom()
  }

}
</script>

<style lang="less" scoped>
.active1 {
  background-color: #909399;
}



.Room {

  width: 900px;
  height: 500px;
  margin: 50px auto;
  display: flex;

  .room-left {
    background-color: #474574;
    width: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;

    .icon-liaotianqingqiu,
    .icon-yonghu {
      font-size: 24px;
      padding-top: 10px;
      cursor: pointer;
    }

    .active {
      color: #ecf0f1;
    }

    img {
      width: 40px;
    }
  }

  .room-center {
    width: 200px;
    background-color: #e6e5e5;
    color: #000;
    display: flex;
    flex-direction: column;

    .center-h {
      padding: 9.6px 10px;
      height: 20px;
      border-bottom: 1px solid #e5e5e58c;
      box-shadow: 1px 1px 1px #b2c0c9;
      display: flex;
      align-items: center;

      img {
        width: 50px;
        height: 50px;
      }
    }

    .center-b {
      flex: 1;

      .user-item-name {
        padding: 5px 10px;
        height: 40px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e5e5e58c;
        box-shadow: 1px 1px 1px #2980b9;
        font-size: 17px;
      }

      .user-item {
        padding: 5px 10px;
        height: 40px;
        display: flex;
        align-items: center;

        img {
          width: 40px;
          height: 40px;
        }

        span {
          margin-left: 5px;
        }
      }
    }
  }

  .room-right {
    flex: 1;
    background-color: #f6f6f6;
    display: flex;
    flex-direction: column;

    .name {
      display: flex;
      justify-content: center;
      line-height: 40px;
      font-size: 16px;
      border-bottom: 1px solid rgba(100, 100, 100, 0.3);
    }

    .chatcontent {
      height: 300px;

      .join {
        text-align: center;
        color: #ccc;
        overflow: auto;
        height: 300px;

        li {
          padding: 10px;
        }
      }

      .my-message {
        display: flex;
        justify-content: flex-end;

        div {
          display: flex;
          position: relative;

          &::after {
            content: '';
            right: 38px;
            top: 50%;
            transform: translateY(-50%);
            position: absolute;
            border-left: 6px solid #9eea6a;
            border-top: 6px solid transparent;
            border-bottom: 6px solid transparent;
            border-right: 6px solid transparent;
          }

          .file {
            max-width: 330px;
            max-height: 170px;
            margin-right: 10px;
            cursor: pointer;
          }

          .avatar {
            width: 40px;
            height: 40px;
          }

          span {
            box-sizing: border-box;
            display: inline-block;
            border-radius: 5px;
            line-height: 32px;
            background-color: #9eea6a;
            color: #000;
            padding: 5px;
            margin-right: 10px;
            min-width: 40px;
          }
        }
      }

      .other-message {
        position: relative;
        display: flex;
        justify-content: flex-start;

        div {
          display: flex;
          position: relative;

          &::before {
            content: '';
            left: 40px;
            top: 55%;
            transform: translateY(-50%);
            position: absolute;
            border-left: 5px solid transparent;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            border-right: 5px solid #ccc;
          }

          .file {
            max-width: 330px;
            max-height: 170px;
            margin-top: 14px;
            margin-left: 10px;
            cursor: pointer;
          }

          .avatar {
            width: 40px;
            height: 40px;
          }

          .username {
            position: absolute;
            left: 45px;
            top: -5px;
            font-size: 13px;
            color: #b2b2b2;
          }

          .content {
            margin-top: 12px;
            box-sizing: border-box;
            display: inline-block;
            border-radius: 5px;
            line-height: 32px;
            background-color: #fff;
            color: #000;
            padding: 5px;
            margin-left: 10px;
            border: 1px solid #ccc;
            min-width: 40px;
          }
        }
      }
    }

    .sendMessage {
      position: relative;
      flex: 1;
      background-color: #fff;
      padding-left: 10px;

      .icon {
        height: 25px;
        padding-top: 6px;
        display: flex;

        .icon-smile,
        .icon-wenjianjia,
        .icon-jietu {
          font-size: 20px;
          padding: 0 6px;
          cursor: pointer;
        }

        .icon-jietu {
          font-size: 23px !important;
        }

        .emoji {
          position: absolute;
          display: flex;
          flex-wrap: wrap;
          width: 276px;
          height: 218px;
          overflow: auto;
          bottom: 159px;
          background-color: #fff;
          border: 1px solid #cccccc;
          outline: none;

          span {
            padding: 7px;
            cursor: pointer;
          }
        }
      }

      textarea {
        border: none;
        resize: none;
        outline: none;
        font-size: 15px;
        padding-left: 9px;
      }

      .sendMessage {
        position: absolute;
        bottom: 10px;
        right: 10px;
        padding: 4px 10px;
        background-color: #f5f5f5;
        border: 1px solid #ccc;
      }
    }
  }

  .join {
    color: #333;
    font-size: 13px;
  }

  .send {
    background-color: #2ecc71;
    color: #000;
  }

  .receive {
    background-color: #fff;
    color: #000;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
