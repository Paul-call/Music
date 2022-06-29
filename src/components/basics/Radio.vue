<template>
  <div id="Radio">
    <router-link to="blog">
      <p class="HotBlog">私人电台&gt;</p>
    </router-link>
    <div class="blogs">
      <router-link class="blog" v-for="(item, index) in blogs" to="blog" :key="index">
        <div class="img">
          <img :src="item.picUrl" />
          <svg class="icon play" aria-hidden="true">
            <use xlink:href="#icon-yunhang-copy"></use>
          </svg>
        </div>
        <div class="information">
          <p class="name">{{ item.name }}</p>
          <div>
            <p class="category">{{ item.category }}</p>
            <span>{{ item.copywriter }}</span>
            <span>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-play-copy"></use></svg
              >{{ Math.round(item.playCount / 100000) }}万</span
            >
            <span
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zuijinliulan"></use></svg
              >{{ min(item.subCount) }}:{{ sec(item.subCount) }}</span
            >
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, ref, Ref, onMounted } from "vue";
import axios from "axios";
defineComponent({
  name: "HotBlog",
});
type Blog = {
  picUrl: string;
  subCount: number;
  category: string;
  copywriter: string;
  name: string;
};
let blogs = ref<Blog[]>([]);
function min(time: number): string {
  return Math.round(time / 6000).toString();
}
function sec(time: number): string {
  let result = Math.round((time % 600) / 60);
  if (result >= 60) {
    return "59";
  } else {
    return result > 10 ? result.toString() : "0" + result;
  }
}
onMounted(async () => {
  await axios.get("http://localhost:3000/dj/hot?limit=6").then((response) => {
    blogs.value = response.data.djRadios;
  });
});
</script>
<style lang="less" scoped>
.HotBlog {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 0.1rem;
}
.blogs {
  max-width: @fWidth;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  :hover {
    background-color: @myAbC;
  }
  .blog {
    width: 4.1rem;
    height: 1rem;
    margin: 0 0.1rem 0.07rem 0.1rem;
    display: flex;
    flex-direction: row;
    .img {
      flex-grow: 0;
      position: relative;
      img {
        width: 0.9rem;
        height: 0.9rem;
        border-radius: 5%;
      }
      svg {
        position: absolute;
        right: 5px;
        bottom: 5px;
        font-size: 30px;
        background-color: #fff;
        border-radius: 50%;
      }
    }
    .information {
      padding: 0.1rem 0 0 0.2rem;
      padding-left: 0.1rem;
      flex-grow: 3;
      // background-color: black;
      .name {
        width: 2rem;
        font-size: 16px;
      }
      .category {
        font-size: 10px;
        display: inline;
        color: @myCZC;
        padding: 1px;
        margin-right: 3rem;
        border-radius: 5%;
        border: solid @myCZC 1px;
      }
      div {
        svg {
          margin-right: 1px;
        }
        span {
          font-size: 10px;
          margin-right: 4px;
          color: @myCZC;
        }
      }
    }
  }
}
</style>
