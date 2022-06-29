<template>
  <div id="Top">
    <div class="back">
      <img src="../../assets/images/logo.png" />
      <div class="main">
        <button @click="go()" :style="{ color: lColor ? '#ffe6ed' : '#888787' }">
          &lt;
        </button>
        <button @click="go()" :style="{ color: lColor ? '#ffe6ed' : '#888787' }">
          &gt;
        </button>
        <svg class="icon search" aria-hidden="true" @click="search()">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <input
          placeholder="大家都在搜"
          :value="keywords"
          @focus="showP = true"
          @blur="bl()"
          @keypress.enter="search($event)"
        />
      </div>
      <div class="right">
        <div class="firstPicture">
          <svg class="icon" name="touxiang" aria-hidden="true" v-if="!profile.status">
            <use xlink:href="#icon-jurassic_user"></use>
          </svg>
          <img v-if="profile.status" :src="profile.avatarUrl" />
        </div>
        <span @click="loging = !loging" v-if="!profile.status">未登录</span>
        <span v-if="profile.status">{{ profile.nickname }}</span>
        <div class="iS">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yifu"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shezhi"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-duanxin"></use>
          </svg>
        </div>
      </div>
      <span v-if="profile.status" @click="logout()" class="logout"
        ><svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-dianyuan"></use></svg
        >退出登录</span
      >
    </div>
    <teleport to="body">
      <div class="log" v-if="loging">
        <svg class="icon cw" aria-hidden="true" @click="loging = !loging">
          <use xlink:href="#icon-cuowu"></use>
        </svg>
        <img :src="logingImg" />
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shouji"></use></svg
          ><input :value="d.phone" type="text" @change="input($event)" />
        </div>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-suoding_huaban"></use></svg
          ><input type="password" :value="d.password" @change="input($event)" />
        </div>
        <input
          type="checkbox"
          class="auto"
          :value="d.auto"
          @change="input($event)"
        />自动登录
        <span class="prompt" v-show="prompt.show"
          ><svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tishi"></use>
          </svg>
          {{ prompt.text }}</span
        >
        <button class="btn" @click="login">登录</button>
      </div>
    </teleport>
    <teleport to="body">
      <prompt v-show="showP" @goSearch="goSearch"></prompt>
    </teleport>
    <div class="mainView" @scroll="j()">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import $store from "../../store/index";
import axios from "axios";
import { logingImg } from "../../assets/images/img";
import { useRouter, useRoute } from "vue-router";
import Prompt from "./Prompt.vue";
import { defineComponent, ref, Ref, onMounted, watchEffect } from "vue";
defineComponent({
  name: "Top",
  components: {
    Prompt,
  },
});
const router = useRouter();
let keywords = ref<string>("");
function bl() {
  setTimeout(() => {
    showP.value = false;
  }, 100);
}
let showP = ref<boolean>(false);
function search(e: any) {
  /**
   *对输入框数据进行校验 若为空串 则返回海阔天空
   若不为空 则修改
   */
  if (e) {
    if (!e.target.value) {
      keywords.value = "海阔天空";
    } else {
      keywords.value = e.target.value;
    }
  }
  /**取出历史记录 存入新的历史纪录
   */
  if (!localStorage.getItem("SearchH")) {
    localStorage.setItem("SearchH", JSON.stringify([keywords.value]));
  } else {
    let result = JSON.parse(localStorage.getItem("SearchH")!);
    if (
      !result.some((item: string) => {
        return item == keywords.value;
      })
    ) {
      result.push(keywords.value);
    }
    localStorage.setItem("SearchH", JSON.stringify(result));
  }
  $store.commit("changeKeyword", keywords.value);
  router.push("/search");
}
function goSearch(value: any) {
  $store.commit("changeKeyword", value);
  router.push("/search");
}
let lColor = ref<boolean>(false);
let RColor = ref<boolean>(false);
function go(): void {
  if (lColor.value) {
    router.go(-1);
  } else if (RColor.value) {
    router.go(1);
  }
}
function j() {
  if (document.querySelector(".content")) {
    $store.commit("change", {
      singerHeight:
        //获取歌手元素高度
        document.querySelector(".content")!.clientHeight +
        document.querySelector(".category")!.clientHeight,
      //获取父元素滑动条上方长度
      topHeight: document.querySelector(".mainView")!.scrollTop,
      //获取父元素高度
      outHeight: document.querySelector(".mainView")!.clientHeight,
    });
  } else if (document.querySelector(".view")) {
    $store.commit("change", {
      artHeight:
        //获取艺术家元素高度
        document.querySelector(".head")!.clientHeight +
        document.querySelector(".look")!.clientHeight +
        document.querySelector(".view")!.clientHeight,
      // //获取父元素滑动条上方长度
      topHeight: document.querySelector(".mainView")!.scrollTop,
      // //获取父元素高度
      outHeight: document.querySelector(".mainView")!.clientHeight,
    });
  }
}
/**
 * 登陆系统
 */
type Data = {
  phone: string;
  password: string;
  auto: boolean;
};
let d = ref<Data>({ phone: "", password: "", auto: false });
let prompt = ref<{ show: boolean; text: string }>({ show: false, text: "" });
let profile = ref<any>($store.state.profile);
//自动登录
(async () => {
  if (localStorage.getItem("phone")) {
    let result = await axios.get("http://localhost:3000/login/cellphone", {
      params: {
        phone: localStorage.getItem("phone"),
        password: localStorage.getItem("password"),
      },
    });
    localStorage.setItem("token", result.data.token);
    $store.commit("login", result.data.profile);
  }
})();
//登陆页面
let loging = ref<boolean>(false);
function input(e: any) {
  if (e.target.type == "text") {
    d.value.phone = e.target.value;
  } else if (e.target.type == "password") {
    d.value.password = e.target.value;
  } else if (e.target.type == "checkbox") {
    d.value.auto = e.target.checked;
  }
}
async function login() {
  if (d.value.phone == "") {
    prompt.value.show = true;
    prompt.value.text = "请输入手机号";
    return;
  } else if (d.value.password == "") {
    prompt.value.show = true;
    prompt.value.text = "请输入密码";
    return;
  } else {
    let result = await axios.get("http://localhost:3000/login/cellphone", {
      params: { phone: d.value.phone, password: d.value.password },
    });
    if (result.data.message == "密码错误") {
      prompt.value.show = true;
      prompt.value.text = "密码错误";
      return;
    } else if ((result.data.code = "200")) {
      if (d.value.auto) {
        localStorage.setItem("phone", d.value.phone);
        localStorage.setItem("password", d.value.password);
      }
      loging.value = false;
      localStorage.setItem("token", result.data.token);
      $store.commit("login", result.data.profile);
    }
  }
}
function logout() {
  localStorage.removeItem("account");
  localStorage.removeItem("phone");
  localStorage.removeItem("password");
  $store.commit("logout");
}
onMounted(() => {
  if (window.history.state.back != "") {
    lColor.value = true;
  }
  if (window.history.state.position < window.history.length) {
    RColor.value = true;
  }
});
</script>
<style lang="less" scoped>
.log {
  position: absolute;
  width: 3rem;
  height: 3.5rem;
  top: 30%;
  left: 40%;
  border-radius: 3%;
  background-color: #fff;
  z-index: 7;
  box-shadow: -3px 0 20px #888888;
  .cw {
    margin-left: 90%;
    margin-top: 2%;
    cursor: pointer;
  }
  img {
    width: 100%;
    margin-top: 0.1rem;
  }
  div {
    border: 1px solid @myLC;
    width: 2.5rem;
    height: 0.35rem;
    margin: 0.1rem 0.25rem 0.1rem 0.25rem;
    position: relative;
    svg {
      margin-left: 0.05rem;
      margin-top: 0.05rem;
      font-size: 24px;
    }
    input {
      outline: none;
      margin-left: 0.1rem;
      border: none;
      height: 80%;
      position: absolute;
      top: 10%;
    }
  }
  .auto {
    margin: 0% 0 0 15%;
  }
  .prompt {
    margin-left: 10%;
    color: #c72e2e;
  }
  .btn {
    margin-top: 0.1rem;
    color: @myW;
    background-color: #ce4137;
    margin-left: 9%;
    width: 2.5rem;
    height: 0.4rem;
    border: 0;
    border-radius: 4%;
  }
  .btn:hover {
    background-color: #b43d34;
  }
}
.back {
  background-color: @myP;
  height: 0.62rem;
  display: flex;
  img {
    height: 0.62rem;
  }
  .main {
    padding-top: 1.5%;
    position: relative;
    svg {
      position: absolute;
      top: 0.24rem;
      left: 0.85rem;
      color: @myW;
      font-size: 0.18rem;
    }
    button {
      height: 0.27rem;
      width: 0.27rem;
      text-align: center;
      border-radius: 0.2rem;
      margin-right: 0.1rem;
      border: none;
      background-color: @myDP;
    }
    button:hover {
      cursor: pointer;
    }
    input {
      border: none;
      height: 0.3rem;
      width: 2rem;
      border-radius: 0.2rem;
      outline: none;
      padding-left: 0.35rem;
      background-color: @myDP;
      color: @myW;
    }
  }
  .right {
    flex-grow: 1;
    padding-left: 2.2rem;
    padding-top: 1.5%;
    position: relative;
    .iS {
      position: absolute;
      top: 0.21rem;
      left: 3.2rem;
    }
    span {
      margin-left: 0.4rem;
      position: absolute;
      top: 0.23rem;
      left: 2.1rem;
    }
    svg {
      color: @myW;
      font-size: 0.25rem;
      margin-right: 0.2rem;
    }
    .firstPicture {
      width: 0.25rem;
      border-radius: 50%;
      background-color: @myLC;
      img {
        width: 0.25rem;
        height: 0.25rem;
        border-radius: 50%;
      }
    }
    span {
      color: @myW;
      font-size: 10px;
    }
  }
}
.mainView {
  position: absolute;
  max-width: @fWidth;
  left: 2.2rem;
  margin-left: 0.2rem;
  max-height: 6.22rem;
  max-width: 9rem;
  overflow-x: hidden;
  overflow-y: scroll;
}
.mainView ::-webkit-scrollbar {
  display: none;
}
.back::after {
  content: "";
}
.search {
  cursor: pointer;
}
.logout {
  margin-top: 0.2rem;
  margin-right: 0.3rem;
  color: @myW;
  svg {
    color: @myW;
    font-size: 12px;
  }
}
</style>
