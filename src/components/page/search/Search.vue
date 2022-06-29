<template>
  <div id="Search">
    <p>搜索 {{ keywords }}</p>
    <ul class="list">
      <li><router-link to="searchsong">单曲</router-link></li>
      <li><router-link to="searchar">歌手</router-link></li>
      <li><router-link to="searchmv">Mv</router-link></li>
      <li><router-link to="searchsonglist">歌单</router-link></li>
      <li><router-link to="searchuser">用户</router-link></li>
    </ul>
    <div class="views">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, onMounted, watchEffect, ref } from "vue";
defineComponent({
  name: "Search",
});
import $store from "../../../store/index";
import axios from "axios";
let keywords = ref<string>($store.state.keywords);
watchEffect(() => {
  keywords.value = $store.state.keywords;
});
//监听state传来的keyword以修改页面
onMounted(async () => {
  axios
    .get("http://localhost:3000/cloudsearch?", {
      params: {
        keywords: keywords.value,
        type: 1,
        limit: 50,
      },
    })
    .then((response) => {});
});
</script>
<style lang="less" scoped>
#Search {
  margin-top: 0.1rem;
  min-width: 9rem;
  p {
    font-size: 20px;
    font-weight: bold;
  }
  ul {
    margin-top: 0.1rem;
    display: flex;
    flex-direction: row;
  }
  li {
    margin: 0.1rem 0.2rem 0 0.2rem;
    a {
      font-size: 16px;
    }
    .router-link-active {
      font-size: 18px;
      font-weight: bold;
      border-bottom: @myP 2px solid;
    }
  }
}
.views {
  padding-top: 0.2rem;
}
</style>
