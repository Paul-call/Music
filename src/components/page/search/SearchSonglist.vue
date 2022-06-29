<template>
  <div class="SearchUser">
    <ul>
      <router-link
        v-for="(item, index) in songlists"
        :key="index"
        :to="{ path: 'songs', query: { id: item.id } }"
      >
        <li :class="{ dark: (index + 1) % 2 == 0 }">
          <div class="img"><img :src="item.coverImgUrl" /></div>
          <p>{{ item.name }}</p>
          <p>{{ item.trackCount }}首</p>
          <p>
            by
            <router-link :to="{ path: 'users', query: { id: item.creator.userId } }">{{
              item.creator.nickname
            }}</router-link>
          </p>
          <p>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofang-01"></use></svg
            >{{ item.playCount }}
          </p>
        </li>
      </router-link>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, onMounted, watchEffect, ref } from "vue";
defineComponent({
  name: "SearchUser",
});
import $store from "../../../store/index";
import axios from "axios";
let keywords = ref<string>($store.state.keywords);
type Songlist = {
  id: number;
  name: string;
  coverImgUrl: string;
  trackCount: number;
  playCount: number;
  creator: {
    nickname: string;
    userId: number;
  };
};
let songlists = ref<Songlist[]>([]);
onMounted(async () => {
  axios
    .get("http://localhost:3000/cloudsearch?", {
      params: {
        keywords: keywords.value,
        type: 1000,
        limit: 50,
      },
    })
    .then((response) => {
      songlists.value = response.data.result.playlists;
    });
});
</script>
<style lang="less" scoped>
li {
  padding: 0.075rem 0 0.1rem 0.075rem;
  display: flex;
  flex-direction: row;
  position: relative;
  p {
    margin-top: 3%;
    color: @myCZC;
    margin-left: 0.1rem;
    font-size: 14px;
  }
  p:first-of-type {
    width: 3.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  p:nth-of-type(2) {
    width: 1rem;
  }
  p:nth-of-type(3) {
    width: 2rem;
    a {
      color: @myCZC;
    }
    a:hover {
      color: @myZC;
    }
  }
  p:nth-of-type(4) {
    text-align: left;
  }
}
.img {
  img {
    width: 0.75rem;
    border-radius: 2%;
    height: 0.75rem;
  }
}
li:hover {
  background-color: @myAbC;
}
.dark {
  background-color: @myAbC;
}
.account {
  display: block;
  max-height: 0.2rem;
  border-radius: 50%;
  position: absolute;
  right: 5%;
  top: 50%;
  background-color: #ec4b3e;
}
</style>
