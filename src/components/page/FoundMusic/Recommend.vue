<template>
  <div id="Rec">
    <div class="carousel">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="(item, index) in responseArray" :key="index">
          <img :src="item.imageUrl" style="width: 100%; height: 100%" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <RecommendSongList></RecommendSongList>
    <Radio></Radio>
    <RemMv></RemMv>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import RecommendSongList from "@/components/basics/RecommendSonglist.vue";
import RemMv from "@/components/basics/RemMv.vue";
import Radio from "@/components/basics/Radio.vue";
import { defineComponent, ref, onBeforeMount, Ref } from "vue";
defineComponent({
  name: "Recommend",
  components: {
    RecommendSongList,
    Radio,
    RemMv,
  },
});
let responseArray = ref<{ imageUrl: string }[]>([]);
onBeforeMount(async () => {
  await axios.get("http://localhost:3000/banner", { params: "0" }).then((response) => {
    responseArray.value = response.data.banners;
  });
});
</script>
<style lang="less" scoped>
.carousel {
  margin-top: 0.15rem;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
