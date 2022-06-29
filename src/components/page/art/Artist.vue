<template>
  <div id="#Artist">
    <div class="head">
      <div class="img">
        <img :src="artist.cover" />
      </div>
      <div class="op">
        <p>{{ artist.name }}</p>
        <p v-if="artist.transNames">{{ artist.transNames }}</p>
        <div class="fa">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-tianjiawenjianjia-copy"></use></svg
            >收藏
          </div>
          <div>
            <router-link :to="{ path: 'users', query: { id: id } }" class="a">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-geren"></use></svg
              >个人主页
            </router-link>
          </div>
        </div>
        <div>
          <span>单曲数:{{ artist.musicSize }}</span
          ><span>专辑数{{ artist.albumSize }}</span
          ><span>Mv数:{{ artist.mvSize }}</span>
        </div>
      </div>
    </div>
    <div class="look">
      <router-link to="artistSongs">歌曲</router-link>
      <router-link to="artistMv">Mv</router-link>
      <router-link to="artistDetail">歌手详情</router-link>
    </div>
    <div class="view">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, onMounted, provide, reactive, ref } from "vue";
import { useRoute, LocationQueryValue } from "vue-router";
import axios from "axios";
defineComponent({
  name: "Artist",
});
type Artist = {
  cover: string;
  name: string;
  albumSize: number;
  musicSize: number;
  mvSize: number;
  transNames: string;
};
let artist = reactive<Artist>({
  cover: "",
  name: "",
  albumSize: 0,
  musicSize: 0,
  mvSize: 0,
  transNames: "",
});
const route = useRoute();
let id = ref<number>((route.query.id as unknown) as number);
console.log(id.value);
provide("id", id.value);
onMounted(async () => {
  await axios
    .get("http://localhost:3000/artist/detail", {
      params: {
        id: id.value,
      },
    })
    .then((response) => {
      artist.cover = response.data.data.artist.cover;
      artist.name = response.data.data.artist.name;
      artist.albumSize = response.data.data.artist.albumSize;
      artist.musicSize = response.data.data.artist.musicSize;
      artist.mvSize = response.data.data.artist.mvSize;
    });
});
</script>
<style lang="less" scoped>
.head {
  display: flex;
  margin-top: 0.2rem;
  flex-direction: row;
  .img {
    img {
      width: 2rem;
      height: 2rem;
      border-radius: 2%;
    }
  }
  .op {
    margin-left: 0.2rem;
    p:first-of-type {
      font-size: 20px;
      font-weight: bold;
    }
    div {
      margin-top: 0.1rem;
    }
    .fa {
      display: flex;
      flex-direction: row;
      div {
        cursor: pointer;
        display: inline;
        font-size: 16px;
        padding: 4px 10px;
        border-radius: 15px;
        margin: 0 0.1rem 0 0;
        border: 1px solid @myLC;
        svg {
          color: @myZC;
        }
      }
      div:hover {
        background-color: @myAbC;
      }
    }
    span {
      margin-right: 0.1rem;
    }
  }
}
.look {
  margin-top: 0.2rem;
  a {
    font-size: 16px;
    margin: 0.1rem 0.15rem 0.1rem 0.15rem;
  }
  .router-link-active {
    font-size: 18px;
    font-weight: bold;
    border-radius: 3px;
    padding-bottom: 2px;
    border-bottom: 3px @myP solid;
  }
}
.view {
  padding-top: 0.2rem;
}
.a {
  width: inherit;
  height: inherit;
  color: @myZC;
}
</style>
