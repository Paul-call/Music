<template>
  <div class="main">
    <router-link to="/recommend"> <p>发现音乐</p> </router-link>
    <router-link to="/blog"><p>播客</p></router-link>
    <router-link to="/mv"><p>视频</p></router-link>
    <router-link to="/star"><p>关注</p></router-link>
    <router-link to="/private"><p>私人FM</p></router-link>
    <p>
      <svg class="icon download" aria-hidden="true">
        <use xlink:href="#icon-xiazai"></use></svg
      >本地与下载
    </p>
    <p>
      <svg class="icon clock" aria-hidden="true">
        <use xlink:href="#icon-zuijinliulan"></use></svg
      >最近播放
    </p>
    <div>
      <span>创建的歌单</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineComponent } from "vue";
defineComponent({
  name: "Navigator",
});
</script>
<style lang="less" scoped>
.main {
  border-right: 1px solid @myLC;
  padding-top: 0.05rem;
  height: 6.2rem;
  display: flex;
  flex-direction: column;
  width: 2.2rem;
  span {
    display: block;
    margin-left: 0.1rem;
    margin-right: 0.02rem;
    text-align: left;
    line-height: 100%;
    padding-left: 0.1rem;
    padding-top: 0.18rem;
    border-radius: 3px;
    color: #aeaeae;
  }
  a {
    display: block;
    flex-grow: 0.5;
    max-height: 0.5rem;
    margin-left: 0.1rem;
    margin-right: 0.02rem;
    border-radius: 3px;
    font-size: 16px;
    font-family: "宋体";
  }
  .router-link-active {
    background-color: @myAbC;
    font-size: 18px;
    font-family: "黑体";
  }
  p {
    text-align: left;
    color: @myZC;
    line-height: 100%;
    padding-left: 0.1rem;
    padding-top: 0.12rem;
    .download:first-of-type {
      font-size: 15px;
      margin-left: 1px;
      margin-right: 5px;
    }
    .clock {
      font-size: 16px;
      margin-right: 5px;
    }
  }
  a:hover {
    background-color: #f6f6f7;
  }
  div {
    min-height: 2.5rem;
  }
}
</style>
