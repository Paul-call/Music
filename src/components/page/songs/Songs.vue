<template>
  <div id="Songs">
    <div class="serach">
      <input placeholder="搜索歌单音乐" :value="search" @input="serachFun($event)" />
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>
    <ul>
      <li class="prompt">
        <div>操作</div>
        <div>标题</div>
        <div>歌手</div>
        <div>专辑</div>
        <div>时间</div>
      </li>
      <!-- 下方循环 -->
      <li
        class="song"
        v-for="(item, index) in showSongs"
        :key="index"
        :class="{ dark: (index + 1) % 2 == 0 }"
        @click="AudioPush(item.id)"
      >
        <div>
          <span>{{ comIndex(index) }}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-aixin"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiazai2"></use>
          </svg>
        </div>
        <div>
          <span>{{ comName(item.name) }}</span
          ><span v-if="item.cp">SQ</span
          ><span v-if="item.mv"
            ><router-link class="mv" :to="{ path: '', query: { id: item.mv } }"
              >MV</router-link
            ></span
          >
        </div>
        <div>
          <span
            v-for="(ar, index) in item.ar"
            :key="index"
            :class="{ back: index != 0 && index != item.ar.length - 1 }"
            ><router-link :to="{ path: 'artist', query: { id: ar.id } }" class="a">{{
              ar.name
            }}</router-link></span
          >
        </div>
        <div>
          <span>{{ item.al.name }}</span>
        </div>
        <div>
          <span>{{ duration(item.dt) }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import {
  defineComponent,
  onMounted,
  ref,
  Ref,
  computed,
  inject,
  watchEffect,
  defineProps,
} from "vue";
defineComponent({
  name: "songs",
});
import axios from "axios";
import $store from "../../../store";
function AudioPush(value: number) {
  $store.commit("AudioPush", value);
}
const route = useRoute();
let id = inject("id");
let songs = ref({}) as Ref;
function comIndex(songN: number): string {
  if (songN < 9) {
    return "0" + (songN + 1);
  } else {
    return "" + (songN + 1);
  }
}
let search = ref("");
function comName(songName: string): string {
  if (songName.length > 15) {
    return songName.slice(0, 15) + "...";
  } else {
    return songName;
  }
}
function duration(time: number): string {
  let min = Math.floor(time / 1000 / 60);
  let sex = Math.floor((time / 1000) % 60);
  return "" + min + ":" + sex;
}
const showSongs = computed(() => {
  let result: any[] = [];
  for (let i = 0; i < songs.value.length; i++) {
    if (songs.value[i].name.indexOf(search.value) > -1) {
      result.push(songs.value[i]);
    }
  }
  return result;
});
function serachFun($event: any) {
  search.value = $event.target!.value;
}
onMounted(async () => {
  //请求歌单所有歌曲
  await axios
    .get("http://localhost:3000/playlist/track/all", {
      params: {
        id,
      },
    })
    .then((response) => {
      songs.value = response.data.songs;
    });
});
</script>
<style lang="less" scoped>
#Songs {
  max-width: 8.5rem;
  position: relative;
  .serach {
    position: absolute;
    right: 0.5rem;
    top: -0.5rem;
    input {
      border: none;
      height: 0.3rem;
      width: 1.8rem;
      border-radius: 0.2rem;
      outline: none;
      padding-left: 0.2rem;
      background-color: @myAbC;
      color: @myZC;
    }
    svg {
      position: absolute;
      right: 2%;
      top: 25%;
    }
  }
}
.prompt {
  display: flex;
  max-width: 8.5rem;
  flex-direction: row;
  div {
    cursor: default;
    padding: 2px 0 2px 0;
    border-radius: 2px;
  }
  div:hover {
    background-color: @myAbC;
  }
  div:first-of-type {
    width: 1.1rem;
  }
  div:nth-of-type(2) {
    width: 3.1rem;
  }
  div:nth-of-type(3) {
    width: 1.3rem;
  }
  div:nth-of-type(4) {
    width: 2.1rem;
  }
  div:nth-of-type(5) {
    width: 0.7rem;
  }
}
.song {
  display: flex;
  max-width: 8.5rem;
  flex-direction: row;
  div {
    cursor: default;
    padding: 2px 0 2px 0;
  }
  div:first-of-type {
    width: 1rem;
    span {
      color: @myCZC;
      margin-left: 0.1rem;
    }
    svg {
      margin-left: 0.1rem;
    }
    svg:hover {
      cursor: pointer;
    }
  }
  div:nth-of-type(2) {
    width: 3.1rem;
    padding-left: 0.1rem;
    overflow: hidden;
    span:first-of-type {
      margin-right: 0.1rem;
    }
    span:nth-of-type(2),
    span:nth-of-type(3) {
      font-size: 12px;
      padding: 0 3px 0 3px;
      color: @myP;
      margin-left: 0.05rem;
      border-radius: 3px;
      border: 1px solid @myP;
    }
    span:nth-of-type(3):hover {
      cursor: pointer;
      padding: 0 3px 0 3px;
      color: @myP;
      border-radius: 3px;
      border: 1px solid @myP;
    }
  }
  div:nth-of-type(3) {
    width: 1.2rem;
    max-width: 103.617px;
    overflow: hidden;
    max-height: 21.6px;
  }
  div:nth-of-type(4) {
    width: 2rem;
    text-align: left;
    span {
      margin-left: 0.1rem;
      max-width: 178.433px;
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  div:nth-of-type(5) {
    width: 0.7rem;
    text-align: right;
    span {
      margin-right: 0.1rem;
    }
  }
}
.song:hover {
  background-color: @myAbC;
}
.dark {
  background-color: @myAbC;
}
.a {
  color: @myCZC;
}
.mv {
  color: @myP;
}
.a:hover {
  color: @myZC;
}
.back:after {
  content: "/";
}
</style>
