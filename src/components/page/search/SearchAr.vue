<template>
  <div class="SearchAr">
    <ul>
      <router-link
        v-for="(item, index) in artists"
        :key="index"
        :to="{ path: 'artist', query: { id: item.id } }"
      >
        <li :class="{ dark: (index + 1) % 2 == 0 }">
          <div class="img"><img :src="item.img1v1Url" /></div>
          <p>{{ item.name }}</p>
          <router-link
            class="account"
            v-if="item.accountId"
            :to="{ path: 'users', query: { id: item.accountId } }"
          >
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jurassic_user"></use></svg
          ></router-link>
        </li>
      </router-link>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, onMounted, watchEffect, ref } from "vue";
defineComponent({
  name: "SearchAr",
});
import $store from "../../../store/index";
import axios from "axios";
let keywords = ref<string>($store.state.keywords);
type Artist = {
  id: number;
  name: string;
  img1v1Url: string;
  accountId?: number;
};
let artists = ref<Artist[]>([]);
onMounted(async () => {
  axios
    .get("http://localhost:3000/cloudsearch?", {
      params: {
        keywords: keywords.value,
        type: 100,
        limit: 50,
      },
    })
    .then((response) => {
      artists.value = response.data.result.artists;
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
    margin-left: 0.1rem;
  }
}
.img {
  img {
    width: 0.75rem;
    border-radius: 5%;
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
