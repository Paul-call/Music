<template>
  <div id="Mvplay">
    <div class="Mv">
      <p class="title" @click="router.go(-1)">&lt; 视频详情</p>
      <div class="video">
        <div class="outCon">
          <div class="control" id="control">
            <div class="dura" id="dura"><div class="controlhead"></div></div>
          </div>
          <div class="op">
            <div class="left">
              <svg class="icon" aria-hidden="true" v-show="!mvPlay.isPlay" @click="play">
                <use xlink:href="#icon-bofang-01"></use></svg
              ><svg class="icon" aria-hidden="true" v-show="mvPlay.isPlay" @click="pause">
                <use xlink:href="#icon-zanting-01"></use>
              </svg>
            </div>
            <span class="time"> {{ mvPlay.durTime }}/{{ mvPlay.time }} </span>
            <div class="blank"></div>
            <div class="sound">
              <svg class="icon" aria-hidden="true" v-show="!sound" @click="slient">
                <use xlink:href="#icon-shengyin"></use>
              </svg>
              <svg class="icon" aria-hidden="true" v-show="sound" @click="slientNo">
                <use xlink:href="#icon-jingyin"></use>
              </svg>
              <div class="soundControl">
                <div class="soundDur"></div>
              </div>
            </div>
            <span
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-dianshiji"></use></svg
              >超清</span
            >
          </div>
        </div>
        <video id="video" :src="video.url"></video>
      </div>
      <div class="art">
        <img src="../../assets/images/default.jpg" />
        <p>
          <router-link :to="{ path: 'artist', query: { id: video.artistId } }"
            >{{ video.creator.nickname }}
          </router-link>
        </p>
      </div>
      <div class="name">
        <p>{{ video.title }}</p>
      </div>
      <div class="detail">
        <span>发布:{{ video.publishTime }}</span>
        <span>播放{{ video.praisedCount.toString() }}次</span>
      </div>
    </div>
    <ul class="Rem">
      <li v-for="(item, index) in remMv" :key="index">
        <div class="img" @click="id = item.vid">
          <img :src="item.coverUrl" />
          <span class="playCount"
            ><svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-play-copy"></use></svg
            >{{ item.playTime }}</span
          >
          <span class="time">{{ duration(item.size) }}</span>
        </div>
        <p>{{ item.title }}</p>
        <p>
          By
          <router-link
            v-for="(ar, index) in item.creator"
            :key="index"
            :to="{ path: 'users', query: { id: ar.userId } }"
            class="a ar"
            >{{ ar.nickname }}</router-link
          >
        </p>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { useRoute, LocationQueryValue, useRouter } from "vue-router";
import axios from "axios";
import $store from "../../store/index";
import {
  defineComponent,
  onMounted,
  ref,
  watchEffect,
  reactive,
  onBeforeUnmount,
} from "vue";
const router = useRouter();
defineComponent({
  name: "MvPlay",
});
type Video = {
  vid: string;
  url: string;
  description: string;
  title: string;
  size: number;
  creator: { nickname: string; userId: number };
  praisedCount: number;
  playTime: number;
  publishTime: number;
};
const route = useRoute();
let id = ref<string | LocationQueryValue[] | number>(route.query.id!);
function duration(time: number): string {
  let min = Math.floor(time / 1000 / 60);
  let sex = Math.floor((time / 1000) % 60);
  return "" + min + ":" + sex;
}
let video = ref<Video>({
  vid: "",
  url: "",
  title: "",
  size: 0,
  praisedCount: 0,
  publishTime: 0,
  description: "",
  playTime: 0,
  creator: { nickname: "", userId: 0 },
});
type RemMv = {
  title: string;
  creator: { userId: number; UserName: string }[];
  coverUrl: string;
  durationms: number;
  playTime: number;
};
let remMv = ref<RemMv[]>([]);
async function getData() {
  await axios
    .get("http://localhost:3000/video/detail", { params: { id: id.value } })
    .then((response) => {
      video.value.vid = response.data.data.vid;
      video.value.title = response.data.data.title;
      video.value.creator.nickname = response.data.data.creator.nickname;
      video.value.creator.userId = response.data.data.creator.userId;
      video.value.playTime = response.data.data.playTime;
      video.value.praisedCount = response.data.data.praisedCount;
      video.value.description = response.data.data.description;
      video.value.publishTime = response.data.data.publishTime;
    });
  await axios
    .get("http://localhost:3000/video/url", { params: { id: id.value } })
    .then((response) => {
      video.value.url = response.data.urls[0].url;
      video.value.size = response.data.urls[0].size;
    });
  await axios
    .get("http://127.0.0.1:3000/related/allvideo", {
      params: { id: id.value },
    })
    .then((response) => {
      remMv.value = response.data.data;
    });
}
/**
 * 调整播放
 */
let MvTime = (time: number): string => {
  let min: number | string =
    Math.floor(time / 60) < 10 ? "0" + Math.floor(time / 60) : Math.floor(time / 60);
  let sex: number | string =
    Math.floor(time % 60) < 10 ? "0" + Math.floor(time % 60) : Math.floor(time % 60);
  return `${min}:${sex}`;
};
type MvPlay = {
  isPlay: boolean;
  time: string;
  durTime: string;
};
let sound = ref<boolean>(false);
const mvPlay = reactive<MvPlay>({ isPlay: false, time: "0", durTime: "0" });
watchEffect(async () => {
  let x = id;
  let y = $store.state.isPlay;
  mvPlay.isPlay = $store.state.isPlay;
  await getData();
});
function play(ele: any) {
  document.getElementById("video")!.play();
  $store.commit("MvPlay", true);
}
function pause(ele: any) {
  document.getElementById("video")!.pause();
  $store.commit("MvPlay", false);
}
function slient() {
  document.getElementById("video")!.muted = true;
  sound.value = true;
}
function slientNo() {
  document.getElementById("video")!.muted = false;
  sound.value = false;
}
onMounted(async () => {
  await getData();
  let video: any = document.getElementById("video")!;
  let dura: HTMLElement = document.querySelector(".dura")!;
  let outCon: HTMLElement = document.querySelector(".outCon")!;
  let control: HTMLElement = document.getElementById("control")!;
  let soundControl: HTMLElement = document.querySelector(".soundControl")!;
  let soundDur: HTMLElement = document.querySelector(".soundDur")!;
  /**
   *
   * 初始化播放
   *    */
  video.oncanplay = () => {
    video.play();
    $store.commit("MvPlay", true);
    mvPlay.time = MvTime(video.duration);
    video.volume = 1;
    soundDur.style.width = video.volume * 108 + "px";
    mvPlay.durTime = MvTime(0);
    mvPlay.isPlay = $store.state.isPlay;
  };
  /**
   * 调整播放
   */
  video.ontimeupdate = () => {
    dura.style.width = (video.currentTime / video.duration) * 756 + "px";
    mvPlay.durTime = MvTime(video.currentTime);
  };
  control.onmousedown = (event: MouseEvent) => {
    video.play();
    $store.commit("MvPlay", true);
    dura.style.width = event.clientX - 234 + "px";
    video.currentTime = ((event.clientX - 234) / 756) * video.duration;
    mvPlay.durTime = MvTime(((event.clientX - 234) / 756) * video.duration);
    outCon.onmousemove = (event2: MouseEvent) => {
      dura.style.width = event2.clientX - 234 + "px";
      mvPlay.durTime = MvTime(((event.clientX - 234) / 756) * video.duration);
      video.currentTime = ((event2.clientX - 234) / 756) * video.duration;
      outCon.onmouseup = (event3: MouseEvent) => {
        //结束拖动
        outCon.onmousemove = null;
      };
    };
  };
  /**
   * 调整音量
   */
  soundControl.onmousedown = (event: MouseEvent) => {
    video.volume = (event.clientX - 803) / 108;
    soundDur.style.width = video.volume * 108 + "px";
    outCon.onmousemove = (event2: MouseEvent) => {
      video.volume = (event2.clientX - 803) / 108;
      soundDur.style.width = video.volume * 108 + "px";
      outCon.onmouseup = (event3: MouseEvent) => {
        //结束拖动
        outCon.onmousemove = null;
      };
    };
  };
});
onBeforeUnmount(() => {
  $store.commit("MvPlay", false);
});
</script>
<style lang="less" scoped>
#Mvplay {
  min-width: 9rem;
}
.title {
  font-size: 20px;
  font-weight: bold;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
  cursor: pointer;
}
.art {
  display: flex;
  width: 4rem;
  flex-direction: row;
  justify-content: flex-start;
  img {
    border-radius: 50%;
    height: 0.75rem;
    width: 0.75rem;
  }
  p {
    margin-left: 0.1rem;
    padding-top: 5%;
    a {
      color: @myCZC;
    }
    a:hover {
      color: @myZC;
    }
  }
}
.name {
  margin-left: 0.1rem;
  p {
    font-family: "微软雅黑";
    font-size: 20px;
    font-weight: bold;
  }
}
.detail {
  span {
    font-size: 12px;
    margin-left: 0.1rem;
    color: @myCZC;
  }
}
.Rem {
  max-width: 8.5rem;
  margin: 0 0 0.1rem 0.1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  p {
    cursor: pointer;
  }
  p:first-of-type {
    margin-top: 0.05rem;
    max-width: 2.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    color: @myZC;
  }
  p:nth-of-type(2) {
    font-size: 12px;
    color: @myCZC;
  }
  p:nth-of-type(2):hover {
    color: @myZC;
  }
  li {
    margin-top: 0.1rem;
    margin-right: 0.2rem;
  }
  .img {
    position: relative;
    img {
      border-radius: 5%;
      width: 2.5rem;
      height: 1.5rem;
    }
    .playCount {
      position: absolute;
      color: @myW;
      top: 5%;
      font-size: 10px;
      right: 5%;
      svg {
        margin-right: 2px;
      }
    }
    .ar {
      margin-right: 0.1rem;
      color: @myCZC !important;
    }
    .ar:hover {
      cursor: pointer;
      margin-right: 0.1rem;
      color: @myZC;
    }
    .time {
      color: @myW;
      font-size: 10px;
      position: absolute;
      bottom: 5%;
      right: 5%;
    }
  }
  .img:hover {
    cursor: pointer;
  }
}
.video {
  margin-left: 0.2rem;
  position: relative;
  background-color: black;
  width: 8.4rem;
  padding-bottom: 0.2rem;
  margin-bottom: 0.1rem;
  video {
    width: 8.4rem;
    border-radius: 2%;
  }
  .outCon {
    position: absolute;
    bottom: 0%;
    height: 0.45rem;
    width: 100%;
    left: 0%;
    cursor: pointer;
    background-color: rgba(43, 42, 42, 0.507);
  }
  .control {
    height: 3px;
    background-color: @myCZC;
    .dura {
      background-color: #fff;
      height: 3px;
      position: relative;
      .controlhead {
        height: 3px;
        width: 3px;
        border: 3px #fff solid;
        position: absolute;
        background-color: @myP;
        top: -0.03rem;
        border-radius: 50%;
        right: 0%;
      }
    }
  }
}
.op {
  display: flex;
  flex-direction: row;
  padding-top: 0.1rem;
  .left {
    svg {
      font-size: 18px;
    }
    margin: 0 0.2rem 0 0.1rem;
  }
  span {
    color: #fff;
    font-size: 12px;
    font-family: "微软雅黑";
  }
}
.blank {
  width: 4.9rem;
}
.sound {
  display: flex;
  flex-direction: row;
  margin-right: 0.3rem;
  svg {
    margin-top: 0.05rem;
    margin-right: 0.02rem;
  }
  .soundControl {
    margin-top: 0.1rem;
    border-radius: 5px;
    width: 1.2rem;
    height: 4px;
    background-color: rgba(255, 255, 255, 0.438);
    .soundDur {
      height: 4px;
      width: 0;
      border-radius: 5px;
      background-color: @myP;
    }
  }
}
</style>
