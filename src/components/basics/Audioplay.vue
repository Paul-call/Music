<template>
  <div id="Audioplay">
    <div class="MaxRoot" >
      <div class="MaxOld" :class="{'MaxAn':showMax}">
        <AudioplayMax v-if="showMax" @showMax="showMax=false"></AudioplayMax>
        </div>
    </div>
    <div class="left">
      <div class="img">
        <div class="Max" @click="showMax=!showMax">
          <svg class="icon" aria-hidden="true" v-show="!showMax">
              <use xlink:href="#icon-xiangshang2"></use>
          </svg>
            <svg class="icon" aria-hidden="true"  v-show="showMax">
              <use xlink:href="#icon-xiangxia2"></use>
          </svg>
        </div>
      <img :src="audio.al.picUrl" />
      </div>
      <div class="name">
        <p>{{comName(audio.name,10) }}</p>
        <router-link
          v-for="(item, index) in audio.ar"
          :key="index"
          :class="{ back: index != 0 && index != item.ar.length - 1 }"
          :to="{ path: 'artist', query: { id: item.id } }"
          ><span>{{ item.name }}</span>
        </router-link>
      </div>
    </div>
    <div class="middem">
      <div class="pic">
        <div style="margin-left:0.5rem">
          <div class="btn" v-show="mode == '顺序'" @click="changeMode(1)">
            <svg class="icon pink" aria-hidden="true">
              <use xlink:href="#icon-shunxushunxubofang11-copy"></use></svg
            ><svg class="icon black" aria-hidden="true">
              <use xlink:href="#icon-shunxushunxubofang11"></use>
            </svg>
          </div>
          <div class="btn" v-show="mode == '单曲'" @click="changeMode(2)">
            <svg class="icon pink" aria-hidden="true">
              <use xlink:href="#icon-danquxunhuan-copy"></use></svg
            ><svg class="icon black" aria-hidden="true">
              <use xlink:href="#icon-danquxunhuan"></use>
            </svg>
          </div>
          <div class="btn" v-show="mode == '随机'" @click="changeMode(0)">
            <svg class="icon pink" aria-hidden="true">
              <use xlink:href="#icon-suijibofang-copy"></use></svg
            ><svg class="icon black" aria-hidden="true">
              <use xlink:href="#icon-suijibofang"></use>
            </svg>
          </div>
        </div>
        <div class="btn" @click="changePointer(pointer - 1)">
          <svg class="icon pink" aria-hidden="true">
            <use xlink:href="#icon-shangyiqu-copy"></use></svg
          ><svg class="icon black" aria-hidden="true">
            <use xlink:href="#icon-shangyiqu"></use>
          </svg>
        </div>
        <div class="bz">
          <div class="btn" @click="audioPause()" v-show="play">
            <svg class="icon pink" aria-hidden="true">
              <use xlink:href="#icon-zanting2-copy"></use></svg
            ><svg class="icon black" aria-hidden="true">
              <use xlink:href="#icon-zanting2"></use>
            </svg>
          </div>
          <div class="btn" @click="audioPlay()" v-show="!play">
            <svg class="icon pink" aria-hidden="true">
              <use xlink:href="#icon-bofang-copy-copy"></use></svg
            ><svg class="icon black" aria-hidden="true">
              <use xlink:href="#icon-bofang-copy"></use>
            </svg>
          </div>
        </div>
        <div class="btn" @click="changePointer(pointer + 1)">
          <svg class="icon pink" aria-hidden="true">
            <use xlink:href="#icon-xiayiqu-copy"></use></svg
          ><svg class="icon black" aria-hidden="true">
            <use xlink:href="#icon-xiayiqu"></use>
          </svg>
        </div>
      </div>
      <audio :src="audio.url" id="audio"></audio>
      <div class="control">
        <span>{{ AudioTime(audio.durTime) }}</span>
        <div class="outControl">
          <div class="dur"><div class="head"></div></div>
        </div>
        <span>{{ AudioTime(audio.size) }}</span>
      </div>
    </div>
    <div class="right">
      <p>标准</p>
      <p class="sound">
        <div class="soundControl"><div class="arrow"></div><div class="outSound"><div class="soundDur"></div></div></div>
        <svg class="icon" aria-hidden="true" v-show="!sound" @click="slient">
          >
          <use xlink:href="#icon-shengyin-copy"></use></svg
        ><svg class="icon" aria-hidden="true" v-show="sound" @click="slientNo">
          >
          <use xlink:href="#icon-jingyin-copy"></use>
        </svg>
      </p>
      <p @click="(ListShow=!ListShow)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-playlistMusic-copy"></use>
        </svg>
      </p>
    </div>
    <div class="playList" v-if="ListShow">
    <list></list>
    </div>
  </div>
</template>
<script setup lang="ts">
import $store from "../../store/index";
import axios from "axios";
import List from "./List.vue"
import AudioplayMax from "./AudioplayMax.vue"
import { reactive, onMounted, ref, watchEffect,defineComponent ,provide} from "vue";
import { getData } from "../../hooks/audioGetData";
let pointer = ref<number>($store.state.AudioPlay.pointer);
let id = ref<number>($store.state.AudioPlay.audioes[pointer.value]);
let mode = ref<string>($store.state.AudioPlay.mode);
let play = ref<boolean>($store.state.AudioPlay.play);
let ListShow=ref<boolean>(false);
defineComponent({
  name:"Audioplay",
  components:{
    List,
    AudioplayMax
  }
})
//规定音乐api
type Audio = {
  id: number;
  url: string;
  name: string;
  lyric: string;
  ar: { id: number; name: string }[];
  al: {
    picUrl: string;
  };
  size: number;
  durTime: number | string;
  publishTime: number;
};
let audio = ref<Audio>({
  id: 0,
  url: "",
  lyric: "",
  name: "",
  al: {
    picUrl: "",
  },
  durTime: 0,
  ar: [],
  size: 0,
  publishTime: 0,
});
function changeMode(index: number) {
  $store.commit("changeMode", index);
}
let showMax=ref<boolean>(false);
let AudioTime = (time: number): string => {
  let min: number | string =
    Math.floor(time / 60) < 10 ? "0" + Math.floor(time / 60) : Math.floor(time / 60);
  let sex: number | string =
    Math.floor(time % 60) < 10 ? "0" + Math.floor(time % 60) : Math.floor(time % 60);
  return `${min}:${sex}`;
};
function changePointer(value: number) {
  $store.commit("changePointer", value);
}
let sound = ref<boolean>(false);
provide("audio",audio.value)
watchEffect(() => {
  mode.value = $store.state.AudioPlay.mode;
  play.value = $store.state.AudioPlay.play;
  pointer.value = $store.state.AudioPlay.pointer;
  id.value = $store.state.AudioPlay.audioes[pointer.value];
  getData(audio, id);
});
function comName(songName: string,count:number): string {
  if (songName.length > count) {
    return songName.slice(0, count) + "...";
  } else {
    return songName;
  }
}
function audioPlay(ele: any) {
  document.getElementById("audio")!.play();
  $store.commit("Play", true);
}
function audioPause(ele: any) {
  document.getElementById("audio")!.pause();
  $store.commit("Play", false);
}
function slient() {
  document.getElementById("audio")!.muted = true;
  sound.value = true;
}
function slientNo() {
  document.getElementById("audio")!.muted = false;
  sound.value = false;
}
onMounted(async () => {
  let audioElement: HTMLAudioElement = document.getElementById("audio")!;
  let dur: HTMLElement = document.querySelector(".dur")!;
  let outControl: HTMLElement = document.querySelector(".outControl")!;
  let middem: HTMLElement = document.querySelector(".middem")!;
  audioElement.oncanplay = () => {
    audioElement.play();
    $store.commit("Play",true)
    audio.value.size = audioElement.duration;
    audio.value.durTime = audioElement.currentTime;
  };
  audioElement.ontimeupdate = () => {
    dur.style.width = (audioElement.currentTime / audioElement.duration) * 360 + "px";
    audio.value.durTime = audioElement.currentTime;
    $store.commit("changeDur", audioElement.currentTime)
  };
  audioElement.onended = () => {
   if(mode.value == "随机"){
      let value=Math.floor(Math.random()*$store.state.AudioPlay.audioes.length)
      $store.commit("changePointer",value)
    }
    if ((mode.value == "单曲")) {
      audioElement.load();
      audioElement.play();
    }
     if(mode.value=="顺序"){
$store.commit("changePointer",pointer.value+1)
    }   
  };
  outControl.onmousedown = (event: MouseEvent) => {
    audioElement.play();
    $store.commit("Play", true);
    dur.style.width = event.clientX - 347 + "px";
    audioElement.currentTime = ((event.clientX - 347) / 360) * audioElement.duration;
    outControl.onmousemove = (event2: MouseEvent) => {
      dur.style.width = event2.clientX - 347 + "px";
      audioElement.currentTime = ((event2.clientX - 347) / 360) * audioElement.duration;
      middem.onmouseup = (event3: MouseEvent) => {
        //结束拖动
        outControl.onmousemove = null;
      };
    };
  };
  //音量控制
  let  soundControl:HTMLElement=document.querySelector(".soundControl")!
  let  outSound:HTMLElement=document.querySelector(".outSound")!
  let soundDur:HTMLElement=document.querySelector(".soundDur")!
   soundDur.style.height = (1-audioElement.volume) * 90 + "px";
  outSound.onmousedown = (event: MouseEvent) => {
    audioElement.volume = 1-((event.clientY - 533) / 90);
    soundDur.style.height = (1-audioElement.volume) * 90 + "px";
    soundControl.onmousemove = (event2: MouseEvent) => {
      audioElement.volume = 1-(event2.clientY - 533) / 90;
      soundDur.style.height = (1-audioElement.volume) * 90 + "px";
      soundControl.onmouseup = (event3: MouseEvent) => {
        //结束拖动
        soundControl.onmousemove = null;
      };
    };
  };
});
</script>
<style lang="less" scoped>
#Audioplay {
  display: flex;
  position: relative;
  flex-direction: row;
  border-top: 1px solid #e0e0e0;
  padding-top: 0.08rem;
  padding-left: 0.2rem;
  margin-bottom: 0.02rem;
  .left {
    display: flex;
    flex-direction: row;
    img {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 5%;
    }
    .name {
      margin-left: 0.1rem;
      width: 2.2rem;
      .back:after {
        content: "/";
      }
    }
  }
  .middem {
    width: 6rem;
    .bz {
      width: 0.23rem;
      height: 0.23rem;
      margin-right: 0.4rem;
    }
    .pic {
      margin-left: 20%;
      margin-right: 20%;
      display: flex;
      flex-direction: row;
      svg {
        font-size: 20px;
      }
      .btn {
        margin-right: 0.4rem;
        .pink {
          display: none;
        }
      }
      .btn:hover {
        .black {
          display: none;
        }
        .pink {
          display: inline;
        }
      }
    }
  }
}
.control {
  width: 5rem;
  margin-left: 0.5rem;
  display: flex;
  flex-direction: row;
  span {
    font-size: 12px;
    color: @myCZC;
  }
}
.outControl {
  border-radius: 5px;
  width: 4rem;
  height: 4px;
  margin: 0.1rem 0.05rem 0 0.05rem;
  background-color: #cdcdcd;
  .dur {
    height: 4px;
    width: 0px;
    border-radius: 5px;
    background-color: @myP;
    position: relative;
    .head {
      position: absolute;
      right: -5px;
      top: -40%;
      border-radius: 50%;
      height: 10px;
      width: 10px;
      display: none;
      background-color: @myP;
    }
  }
}
.outControl:hover {
  margin-top: 0.09rem;
  height: 6px;
  .dur {
    height: 6px;
    .head {
      display: block;
    }
  }
}
.right {
  display: flex;
  flex-direction: row;
  padding-top: 0.15rem;
  p:nth-of-type(1) {
    max-height: 0.25rem;
    padding: 0 0.05rem 0 0.05rem;
    font-size: 14px;
    color: @myZC;
    border: 1px solid @myZC;
    margin-right: 0.2rem;
  }
  svg {
    font-size: 18px;
  }
  .sound {
    position: relative;
    .soundControl{
      display: none;
      height:1.2rem;
      background-color:@myW;
      position: absolute;
      z-index: 21;
      top:-1.3rem;
      left:-0.05rem;
      width:0.3rem;
      border-radius:5% ;
    }
    .outSound{
        background-color: @myP;
        height:1rem;
        width:6px;
        border-radius:10% ;
        margin-top:0.11rem ;
        margin-left:0.12rem ;
        .soundDur{
          background-color: #e0e0e0;
          width: 100%;
        }
    }
  .arrow{
    position: absolute;
    width: 0;
    height: 0;
    bottom:-0.1rem;
    left:0.1rem;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 10px solid @myW;
    }
  }
  .sound:hover {
    cursor: pointer;
    .soundControl{
      display: block;
    }
  }
  p:nth-of-type(2),
  p:nth-of-type(3) {
    padding-top: 0.05rem;
    margin-right: 0.2rem;
    cursor: pointer;
  }
}
div::-webkit-scrollbar{
         display:none
    }
.playList{
  z-index: 20;
  background-color: #fff;
  width:3.2rem;
  height:6.16rem;
  position: absolute;
  top:-6.2rem;;
  right:0%;
}
.img{
    position: relative;
}
.Max{
  display: none;
   width: 100%;
    height:100%;
    position: absolute;
    background-color: #666666d5;
    top:0%;
    left:0%;
    svg{
    position: absolute;
    font-size:20px;
     top:30%;
    left:30%;
  }
}
.img:hover{
  cursor: pointer;
  .Max{
    display: block;
   
  }
}
.MaxRoot{
  height:1px;
  position: absolute;
  width:100%;
  top:0%;
  .MaxOld{
    position: absolute;
    background-color:#fff ;
    height:0%;
    top:0%;;
    left:-0.2rem;
    z-index:19;
    transition: top 1s;
  }
  .MaxAn{
    width:11.4rem;;
    height:7.4rem;
    transition: top 0.5s;
    top:-7.4rem;
  
  }
}
</style>
