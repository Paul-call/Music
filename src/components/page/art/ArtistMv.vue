<template>
  <div id="ArtistMv">
    <ul class="Rem">
      <li v-for="(item, index) in artMv" :key="index">
        <div class="img">
          <router-link :to="{ path: 'mvplay', query: { id: item.id } }">
            <img :src="item.imgurl" />
            <span
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-play-copy"></use></svg
              >{{ item.playCount.toString().slice(0, 3) }}万</span
            >
          </router-link>
        </div>
        <p>{{ item.name }}</p>
        <p>
          <router-link :to="{ path: 'artist', query: { id: item.artistId } }" class="a">{{
            item.artistName
          }}</router-link>
        </p>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, inject, onMounted, ref } from "vue";
import axios from "axios";
let id: number = inject("id")!;
type MV = {
  id: number;
  name: string;
  artistName: string;
  imgurl: string;
  playCount: number;
  artistId: number;
};
let artMv = ref<MV[]>([]);
onMounted(async () => {
  axios.get("http://localhost:3000/artist/mv", { params: { id } }).then((response) => {
    artMv.value = response.data.mvs;
  });
});
</script>
<style lang="less" scoped>
.Rem {
  max-width: 8.5rem;
  margin: 0.1rem 0 0.1rem 0.2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  p {
    cursor: pointer;
  }
  p:first-of-type {
    margin-top: 0.05rem;
    max-width: 2.5rem;
    font-size: 14px;
    overflow: hidden;
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
    max-width: 2.5rem;
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
