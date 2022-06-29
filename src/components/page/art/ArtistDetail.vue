<template>
  <ul id="detail">
    <li v-for="(item, index) in introduction" :key="index">
      <p>{{ item.ti }}</p>
      <span>{{ item.txt }}</span>
    </li>
    <span v-if="!introduction[0]">{{ desc }}</span>
  </ul>
</template>
<script setup lang="ts">
import { defineComponent, onMounted, inject, ref } from "vue";
import axios from "axios";
defineComponent({
  name: "ArtistDetail",
});
let id: number = inject("id")!;
let desc = ref<string>("");
type Introduction = {
  ti: string;
  txt: string;
};
let introduction = ref<Introduction[]>([]);
onMounted(async () => {
  axios.get("http://localhost:3000/artist/desc", { params: { id } }).then((response) => {
    introduction.value = response.data.introduction;
    desc.value = response.data.briefDesc;
  });
});
</script>
<style lang="less" scoped>
li {
  min-width: 9rem;
  p {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 0.1rem;
  }
  span {
    display: block;
    max-width: 8.2rem;
    line-height: 200%;
  }
}
</style>
