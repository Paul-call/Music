<template>
  <div id="RSL">
    <router-link to="songList">
      <p class="order">推荐歌单&gt;</p>
    </router-link>
    <div class="songLists">
      <router-link to="">
        <div class="songList first">
          <div class="img">
            <div class="float">
              <span>根据您的音乐口味生成每日更新</span>
            </div>
            <svg class="icon play" aria-hidden="true">
              <use xlink:href="#icon-yunhang-copy"></use>
            </svg>
            <img :src="img" />
          </div>
          <p>每日歌曲推荐</p>
        </div>
      </router-link>
      <router-link
        v-for="(item, index) in songLists"
        :key="index"
        :to="{ path: 'song', query: { id: item.id } }"
      >
        <div class="songList">
          <div class="img">
            <span
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-play"></use></svg
              >{{ item.playCount.toString().slice(0, 3) }}万</span
            >
            <svg class="icon play" aria-hidden="true">
              <use xlink:href="#icon-yunhang-copy"></use>
            </svg>
            <img :src="item.coverImgUrl" />
          </div>
          <p>
            {{ item.name }}
          </p>
        </div>
      </router-link>
      <div></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import { defineComponent, onMounted, ref, Ref } from "vue";
import {img} from "../../assets/images/img";
defineComponent({
  name: "RecommendSonglist",
});
type Songlist = {
  name: string;
  coverImgUrl: string;
  playCount: number;
  id: number;
};
let songLists = ref<Songlist[]>([]);
onMounted(async () => {
  await axios.get("http://localhost:3000/top/playlist/highquality").then((response) => {
    for (let i = 0; i <= 8; i++) {
      songLists.value.push(response.data.playlists[i]);
    }
  });
});
</script>
<style lang="less" scoped>
.songLists {
  width: 100%;
  display: flex;
  max-width: @fWidth;
  flex-wrap: wrap;
  flex-direction: row;
  height: auto;
  .songList {
    border-radius: 10%;
    margin-left: 0.1rem;
    margin-right: 0.1rem;
    margin-bottom: 0.1rem;
    p {
      max-height: 0.2rem;
      font-size: 12px;
      max-width: 1.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      padding-left: 2px;
    }
    .img {
      position: relative;
      .play {
        position: absolute;
        right: 10px;
        bottom: 10px;
        font-size: 30px;
        background-color: #fff;
        border-radius: 50%;
        opacity: 0;
        transition: opacity 0.5s;
        transition-timing-function: ease-in-out;
      }
      span {
        font-size: 10px;
        color: #fff;
        position: absolute;
        right: 10px;
        top: 3px;
      }
      img {
        border-radius: 5%;
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }
  .float {
    width: 100%;
    height: 0;
    transition: height 1s;
    transition-timing-function: ease-in-out;
    position: absolute;
    background-color: rgba(24, 45, 55, 0.5);
    overflow: hidden;
    span {
      display: block;
      margin-left: 4px;
    }
  }
  .first:hover .float {
    height: 0.4rem;
    transition: height 1s;
    transition-timing-function: ease-in-out;
  }
  .songList:hover .play {
    opacity: 0.8;
    transition: opacity 0.5s;
    transition-timing-function: ease-in-out;
  }
}
.order {
  font-size: 20px;
  font-weight: bold;
}
</style>
