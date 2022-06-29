<template>
  <div id="Commits">
    <p class="title">最新评论</p>
    <div class="comments">
      <ul>
        <li v-for="(item, index) in comments" :key="index" class="item">
          <img :src="item.user.avatarUrl" />
          <router-link to="">{{ item.user.nickname }}:</router-link>
          <p>{{ item.content }}</p>
          <span class="time">{{ item.timeStr }}</span>
        </li>
      </ul>
      <div class="block">
        <el-pagination
          class="offset"
          background
          layout="prev, pager, next"
          :total="total"
          :currentPage="getParams.offset"
          @current-change="
            (value) => {
              getParams.offset = value;
            }
          "
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, inject, ref, onMounted, watchEffect } from "vue";
import axios from "axios";
defineComponent({
  name: "Commits",
});
let id: number = inject("id")!;
interface Iparams {
  id: number;
  offset: number;
  limit: number;
  before?: number;
}
let getParams = ref<Iparams>({ id, offset: 1, limit: 10 });
//声明评论数组
type Comments = {
  name: string;
  user: {
    userId: number;
    userName: string;
    avatarUrl: string;
  };
  content: string;
};
let comments = ref<Comments[]>([]);
//确定总数
let total = ref<number>(0);
/**
 * 定义更新函数 监视getparams
 */
watchEffect(async (newValue) => {
  let x = getParams;
  await axios
    .get("http://localhost:3000/comment/playlist", {
      params: {
        id: getParams.value.id,
        limit: getParams.value.limit,
        offset: getParams.value.offset * 10,
      },
    })
    .then((response) => {
      comments.value = response.data.comments;
    });
});
onMounted(async () => {
  await axios
    .get("http://127.0.0.1:3000/comment/playlist", {
      params: {
        id: getParams.value.id,
        limit: getParams.value.limit,
        offset: getParams.value.offset * 10,
      },
    })
    .then((response) => {
      comments.value = response.data.comments;
      total.value = response.data.total;
    });
});
</script>
<style lang="less" scoped>
#Commits {
  .title {
    font-size: 16px;
    font-weight: bold;
  }
  .comments {
    .item {
      position: relative;
      margin-top: 0.1rem;
      min-height: 0.5rem;
      border-bottom: 1px solid @myCC;
      img {
        border-radius: 50%;
        position: absolute;
        width: 0.4rem;
        height: 0.4rem;
        margin-left: 0.1rem;
      }
      a {
        margin-left: 0.6rem;
        color: @myLjc;
      }
      p {
        margin-left: 0.6rem;
        max-width: 8rem;
      }
      span {
        font-size: 12px;
        color: @myCZC;
        position: absolute;
        bottom: 0%;
        right: 5%;
      }
    }
  }
}
.block {
  position: relative;
  margin-top: 0.2rem;
  .offset {
    position: absolute;
    left: 25%;
  }
}
</style>
