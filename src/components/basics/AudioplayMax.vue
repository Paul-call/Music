<template>
  <div id="AudioplayMax">
    <div class="switch" @click="showMax">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiangxia2"></use>
      </svg>
    </div>
    <div class="Audiocontent">
      <div class="name">
        <p>{{ audio.name }}</p>
        <p
          v-for="(item, index) in audio.ar"
          :key="index"
          :class="{ back: index != 0 && index != item.ar.length - 1 }"
        >
          {{ item.name }}
        </p>
      </div>
      <div class="Auduiodetail">
        <div class="Auduioimg">
          <img :src="audio.al.picUrl" />
        </div>
        <div class="lrc">
          <p
            v-for="(item, index) in lyTime"
            :key="index"
            :class="{ now: index == i - 1 }"
          >
            {{ item.lyric }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import $store from "../../store";
import { defineComponent, defineEmits, watchEffect, ref, inject, onMounted } from "vue";
defineComponent({
  name: "AuidoplayMax",
});
const emit = defineEmits(["showMax"]);
type Audio = {
  id: number;
  url: string;
  name: string;
  lyric: { lyric: string };
  ar: { id: number; name: string }[];
  al: {
    picUrl: string;
  };
  size: number;
};
let audio = ref<Audio>({
  id: 0,
  url: "",
  name: "",
  lyric: { lyric: "" },
  ar: [],
  al: { picUrl: "" },
  size: 0,
});
function showMax(): void {
  emit("showMax");
}
let i = ref<number>(1);
let is = false;
let durTime = ref<number>(0);
let lyTime = ref<{ time: number; lyric: string }[]>([]);
audio.value = inject("audio")!;
watchEffect(() => {
  lyTime.value = audio.value.lyric.lyric.split(/\n/).map((item: string) => {
    return {
      time: parseFloat(item.slice(1, 3)) * 60 + parseFloat(item.slice(4, 6)),
      lyric: item.slice(11, item.length),
    };
  });
  durTime.value = $store.state.AudioPlay.dur;
  console.log(audio.value);
  if (is) {
    let audioElement: HTMLAudioElement = document.getElementById("audio")!;
    let lrc: HTMLElement = document.querySelector(".lrc")!;
    if (i.value < lyTime.value.length && durTime.value > lyTime.value[i.value].time) {
      if (i.value <= 7) {
        lrc.style.paddingTop =
          ((getComputedStyle(lrc).paddingTop as unknown) as number) - 30.6 + "px";
        lrc.style.height =
          ((getComputedStyle(lrc).height as unknown) as number) + 30.6 + "px";
      } else {
        lrc.scrollTop = lrc.scrollTop + 30.6;
      }
      i.value++;
    }
  }
});
onMounted(() => {
  is = true;
});
</script>
<style lang="less" scoped>
#AudioplayMax {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(#acacac, #e9e9e9);
  position: relative;
  .switch {
    position: absolute;
    top: 10%;
    left: 3%;
    svg {
      font-size: 20px;
    }
  }
  .switch:hover {
    cursor: pointer;
  }
  .Audiocontent {
    width: 11.4rem;
    position: absolute;
    top: 12%;
    height: 6.5rem;
  }
}
.name {
  margin-left: 40%;
  p:first-of-type {
    font-size: 20px;
    font-family: "微软雅黑";
  }
  p:nth-of-type(2) {
    font-size: 16px;
    margin-left: 0.1rem;
    font-family: "微软雅黑";
    color: #888787;
  }
  .back:after {
    content: "/";
  }
}
.lrc {
  height: 3.12rem;
  width: 3.5rem;
  margin-left: 1.5rem;
  padding-right: 0.2rem;
  overflow: scroll;
  p {
    text-align: center;
    margin-top: 0.1rem;
  }
  ::-webkit-scrollbar {
    width: 0px;
  }
  ::-webkit-scrollbar {
    width: 0px;
  }
}
.Auduiodetail {
  display: flex;
  flex-direction: row;
}
.Auduioimg {
  width: 3rem;
  height: 3rem;
  margin-left: 1rem;
  border-radius: 50%;
  margin-top: 1rem;
  img {
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
  }
}
.lrc {
  padding-top: 214.2px;
}
.now {
  font-weight: bold;
  font-size: 20px;
  color: @myP;
}
</style>
