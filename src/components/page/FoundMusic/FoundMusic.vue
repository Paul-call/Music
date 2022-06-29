<template>
  <div id="FoundMusic">
    <div class="navigator">
      <router-link to="recommend">
        <p>个性推荐</p>
      </router-link>
      <router-link to="order">
        <p>专属定制</p>
      </router-link>
      <router-link to="songlist">
        <p>歌单</p>
      </router-link>
      <router-link to="toplist">
        <p>排行榜</p>
      </router-link>
      <router-link to="singer">
        <p>歌手</p>
      </router-link>
      <router-link to="new">
        <p>最新音乐</p>
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="less" scoped>
.navigator {
  display: flex;
  margin-top: 0.2rem;
  a {
    font-size: 18px;
    font-weight: bold;
    margin-right: 0.1rem;
    font-family: "宋体";
  }
  .router-link-active {
    border-bottom: @myP 3px solid;
    font-family: "黑体";
    font-size: 20px;
  }
}
</style>
