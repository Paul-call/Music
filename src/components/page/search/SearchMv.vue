<template>
  <div id="SearchMv">
    <div class="Mvs">
      <ul class="Rem Rec">
        <li v-for="(item, index) in Mvs" :key="index">
          <div class="img">
            <router-link to="">
              <img :src="item.coverUrl" />
              <span
                ><svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-play-copy"></use></svg
                >{{ item.playTime }}</span
              >
            </router-link>
          </div>
          <p class="name">{{ item.title }}</p>
          <p class="artName">
            <router-link
              :to="{ path: 'artist', query: { id: item.creator.UserId } }"
              class="a"
              >{{ item.creator.Username }}</router-link
            >
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, onMounted, watchEffect, ref } from "vue";
import $store from "../../../store/index";
import axios from "axios";
let keywords = ref<string>($store.state.keywords);
type Mv = {
  id: number;
  name: string;
  artistName: string;
  cover: string;
  playCount: number;
  artistId: number;
};
let Mvs = ref<Mv[]>([]);
onMounted(async () => {
  axios
    .get("http://localhost:3000/cloudsearch?", {
      params: {
        keywords: keywords.value,
        type: 1014,
        limit: 50,
      },
    })
    .then((response) => {
      Mvs.value = response.data.result.videos;
    });
});
</script>
<style lang="less" scoped>
.Rem {
  max-width: 8.5rem;
  margin: 0.1rem 0 0.15rem 0.2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  p {
    cursor: pointer;
  }
  p:first-of-type {
    margin-top: 0.05rem;
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
      width: 2.6rem;
      height: 1.5rem;
    }
    span {
      position: absolute;
      color: @myW;
      top: 5%;
      font-size: 10px;
      right: 5%;
      svg {
        margin-right: 2px;
      }
    }
  }
}
.Rec {
  p {
    max-width: 2.2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .artName {
    margin-top: 0.07rem;
    font-size: 12px;
    color: @myCZC;
  }
  .artName:hover {
    color: @myZC;
  }
}
</style>
