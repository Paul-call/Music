<template>
  <div id="RemMv">
    <router-link to="Mv">
      <p class="RemMv">推荐Mv&gt;</p>
    </router-link>
    <div class="Mvs">
      <div class="Mv" v-for="(item, index) in Mvs" :key="index">
        <router-link :to="{ path: 'mvplay', query: { id: item.id } }">
          <div class="img">
            <div class="float">
              <span>最新热门Mv推荐</span>
            </div>
            <span class="playCount"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-play"></use></svg
              >{{ Math.round(item.playCount / 1000) }}万</span
            >
            <img :src="item.cover" />
          </div>
          <p>{{ item.name }}</p>
          <span>
            <router-link
              :to="{ path: 'artist', query: { id: item.artistId } }"
              class="a"
              >{{ item.artistName }}</router-link
            ></span
          >
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, onMounted, ref, Ref } from "vue";
import axios from "axios";
type Mv = {
  id: number;
  artistName: string;
  artistId: number;
  name: string;
  playCount: number;
  cover: string;
};
let Mvs = ref<Mv[]>([]);
onMounted(async () => {
  await axios.get("http://localhost:3000/top/mv?limit=6").then((response) => {
    Mvs.value = response.data.data;
  });
});
</script>
<style lang="less" scoped>
.RemMv {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 0.1rem;
}
.Mvs {
  max-width: @fWidth;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .Mv {
    margin-left: 0.1rem;
    margin-right: 0.15rem;
    .img {
      overflow: hidden;
      width: 2.5rem;
      position: relative;
      img {
        border-radius: 5%;
        width: 2.5rem;
      }
      .playCount {
        position: absolute;
        right: 3px;
        top: 5px;
      }
    }
    p {
      max-width: 2.5rem;
      overflow: hidden;
      text-overflow: clip;
    }
    span {
      font-size: 10px;
      color: @myCZC;
      margin-right: 5px;
    }
    .a {
      color: @myCZC;
    }
    .a:hover {
      color: @myZC;
    }
  }
  .float {
    width: 2.5rem;
    height: 0;
    border-radius: 10%;
    transition: height 1s;
    transition-timing-function: ease-in-out;
    position: absolute;
    background-color: rgba(24, 45, 55, 0.5);
    overflow: hidden;
    span {
      display: block;
      font-size: 12px;
      margin-left: 10px;
    }
  }
  .Mv:hover .float {
    height: 0.2rem;
    transition: height 1s;
    transition-timing-function: ease-in-out;
  }
}
</style>
