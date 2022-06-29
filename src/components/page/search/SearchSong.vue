<template>
  <div id="SearchSong">
    <div class="op">
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use></svg
        >播放全部
      </div>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai1"></use></svg
        >下载全部
      </div>
    </div>
    <div>
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
          v-for="(item, index) in songs"
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
  </div>
</template>
<script setup lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import $store from "../../../store/index";
defineComponent({
  name: "songs",
});
type Song = {
  name: string;
  id: number;
  ar: { id: number; name: string }[];
  al: { name: string };
  dt: number;
  mv: number;
};
import axios from "axios";
let keywords = ref<string>($store.state.keywords);
let songs = ref<Song[]>([]);
function comIndex(songN: number): string {
  if (songN < 9) {
    return "0" + (songN + 1);
  } else {
    return "" + (songN + 1);
  }
}
function comName(songName: string): string {
  if (songName.length > 30) {
    return songName.slice(0, 30) + "...";
  } else {
    return songName;
  }
}
function duration(time: number): string {
  let min = Math.floor(time / 1000 / 60);
  let sex = Math.floor((time / 1000) % 60);
  return "" + min + ":" + sex;
}
onMounted(async () => {
  axios
    .get("http://localhost:3000/cloudsearch?", {
      params: {
        keywords: keywords.value,
        type: 1,
        limit: 50,
      },
    })
    .then((response) => {
      songs.value = response.data.result.songs;
    });
});
function AudioPush(value: number) {
  $store.commit("AudioPush", value);
}
</script>
<style lang="less" scoped>
#SearchSong {
  .op {
    margin-bottom: 0.15rem;
    div {
      cursor: pointer;
      display: inline;
      font-size: 16px;
      padding: 6px;
      border-radius: 15px;
      margin: 0 0.1rem 0 0.15rem;
    }
    div:first-of-type {
      color: @myW;
      border: 1px solid @myP;
      background-color: @myP;
    }
    div:first-of-type:hover {
      color: @myW;
      border: 1px solid @myP;
      background-color: @myDP;
    }
    div {
      border: 1px solid @myLC;
    }
    div:hover {
      background-color: @myAbC;
    }
  }
  max-width: 8.5rem;
  position: relative;
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
    flex-grow: 0.8;
  }
  div:nth-of-type(2) {
    flex-grow: 4;
  }
  div:nth-of-type(3) {
    flex-grow: 1;
  }
  div:nth-of-type(4) {
    flex-grow: 2;
  }
  div:nth-of-type(5) {
    flex-grow: 0.5;
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
    flex-grow: 0.8;
    max-width: 88.65px;
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
    max-width: 319.083px;
    padding-left: 0.1rem;
    flex-grow: 4;
    span {
      margin-right: 0.1rem;
    }
    span:nth-of-type(2),
    span:nth-of-type(3) {
      font-size: 12px;
      padding: 0 3px 0 3px;
      color: @myP;
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
    max-width: 103.617px;
    flex-grow: 1;
    max-width: 103.617px;
    overflow: hidden;
    max-height: 21.6px;
  }
  div:nth-of-type(4) {
    max-width: 178.433px;
    min-width: 178.433px;
    flex-grow: 2;
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
    max-width: 66.2167px;
    text-align: right;
    flex-grow: 0.5;
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
.a:hover {
  color: @myZC;
}
.back:after {
  content: "/";
}
.mv {
  color: @myP;
}
</style>
