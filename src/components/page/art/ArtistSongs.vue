<template>
  <div id="ArtistSongs">
    <ul>
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
        <div class="songName">
          <p>{{ comName(item.name) }}</p>
          <span v-if="item.cp" class="sq">SQ</span
          ><span v-if="item.mv" class="mv"
            ><router-link :to="{ path: 'mvplay', query: { id: item.mv } }"
              >MV</router-link
            ></span
          >
        </div>
        <div>
          <span>{{ comName(item.al.name) }}</span>
        </div>
        <div>
          <span>{{ duration(item.dt) }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, onMounted, ref, inject, watchEffect } from "vue";
defineComponent({
  name: "ArtistSongs",
});
import $store from "../../../store/index";
import axios from "axios";
let id = ref<number>(inject("id") as number);
type Songs = {
  id: number;
  name: string;
  ar: { name: string; id: number }[];
  dt: number;
};
function AudioPush(value: number) {
  $store.commit("AudioPush", value);
}
let height = ref<number>($store.state.update.artHeight);
let songs = ref<Songs[]>([]);
let total = ref<number>(0);

function comIndex(songN: number): string {
  if (songN < 9) {
    return "0" + (songN + 1);
  } else {
    return "" + (songN + 1);
  }
}
function comName(songName: string): string {
  if (songName.length > 25) {
    return songName.slice(0, 25) + "...";
  } else {
    return songName;
  }
}
function duration(time: number): string {
  let min = Math.floor(time / 1000 / 60);
  let sex = Math.floor((time / 1000) % 60);
  return "" + min + ":" + sex;
}
watchEffect(async () => {
  let x = id.value;
  await axios
    .get("http://localhost:3000/artist/songs", {
      params: {
        id: id.value,
      },
    })
    .then((response) => {
      songs.value = response.data.songs;
    });
});
onMounted(async () => {
  //请求歌单所有歌曲
  await axios
    .get("http://localhost:3000/artist/songs", {
      params: {
        id: id.value,
      },
    })
    .then((response) => {
      songs.value = response.data.songs;
    });
});
</script>
<style lang="less" scoped>
#ArtistSongs {
  min-width: 9rem;
  position: relative;
  .song {
    display: flex;
    min-width: 9rem;
    flex-direction: row;
    div {
      cursor: default;
      padding: 2px 0 2px 0;
    }
    div:first-of-type {
      width: 88.65px;
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
    .songName {
      padding-left: 0.1rem;
      width: 328px;
      overflow: hidden;
      display: flex;
      span {
        margin-right: 0.1rem;
      }
      p {
        margin-right: 0.1rem;
        width: 3rem;
        max-height: 26px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .sq,
      .mv {
        flex-grow: 0;
        max-height: 0.2rem;
        font-size: 12px;
        padding: 0 3px 0 3px;
        color: @myP;
        border-radius: 3px;
        border: 1px solid @myP;
        a {
          color: @myP;
        }
      }
      .mv:hover {
        cursor: pointer;
        padding: 0 3px 0 3px;
        color: @myP;
        border-radius: 3px;
        border: 1px solid @myP;
      }
    }
    div:nth-of-type(3) {
      overflow: hidden;
      width: 246px;
      span {
        margin-left: 0.1rem;
      }
    }
    div:nth-of-type(4) {
      text-align: left;
      span {
        margin-left: 0.6rem;
      }
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
</style>
