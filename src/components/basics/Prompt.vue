<template>
  <div id="Prompt">
    <div class="SearchH" v-if="result">
      <div class="head">
        <span
          >搜索历史<svg class="icon" aria-hidden="true" @click="remove()">
            <use xlink:href="#icon-del"></use></svg
        ></span>
        <span v-if="history.length > 6 && !showAll" @click="showAll = true"
          >查看全部</span
        >
      </div>
      <div class="history" :class="{ showAll: showAll }">
        <span v-for="(item, index) in history" :key="index" @click="goSearch(item)">{{
          item
        }}</span>
      </div>
    </div>
    <p>热搜榜</p>
    <ul class="toplist" :class="{ shortTop: result }">
      <li
        v-for="(item, index) in topList"
        :key="index"
        @click="goSearch(item.searchWord)"
      >
        <p :class="{ red: index < 3 }">{{ index + 1 }}</p>
        <div>
          <span>{{ item.searchWord }}</span
          ><span>{{ item.score }}</span
          ><span>{{ item.content }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, ref, onMounted, defineEmits } from "vue";
import axios from "axios";
defineComponent({
  name: "Prompt",
});
let showAll = ref<boolean>(false);
let result: string[] | null = JSON.parse(localStorage.getItem("SearchH")!);
let history = ref<string[] | null>(result);
function remove() {
  history.value = [];
  localStorage.removeItem("SearchH");
}
type Toplist = {
  searchWord: string;
  content: string;
  score: number;
};
let topList = ref<Toplist[]>([]);
const emits = defineEmits(["goSearch"]);
function goSearch(value: string): void {
  emits("goSearch", value);
}
onMounted(async () => {
  await axios.get("http://localhost:3000/search/hot/detail").then((response) => {
    topList.value = response.data.data;
  });
});
</script>
<style lang="less" scoped>
#Prompt {
  position: absolute;
  width: 3.3rem;
  height: 5.2rem;
  background-color: #fefefe;
  border-radius: 2%;
  top: 8.5%;
  left: 20%;
  z-index: 6;
  box-shadow: 2px 2px 2px #cfcece;
  span:hover {
    cursor: pointer;
  }
  .head {
    margin-top: 0.1rem;
    span:first-of-type {
      margin-left: 0.1rem;
      font-size: 16px;
      color: @myCZC;
    }
    span:nth-of-type(2) {
      margin-left: 1.7rem;
      font-size: 12px;
      color: @myCZC;
    }
  }
  .history {
    margin-top: 0.1rem;
    margin-left: 0.1rem;
    max-height: 0.95rem;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    span {
      border: 1px solid rgba(99, 98, 98, 0.295);
      margin-top: 0.1rem;
      height: 21.6px;
      margin-right: 0.2rem;
      padding: 4px 12px 4px 12px;
      border-radius: 20px;
      color: rgba(73, 73, 73, 0.705);
    }
    span:hover {
      background-color: @myAbC;
    }
  }
  .showAll {
    height: auto !important;
  }
  p {
    margin-top: 0.1rem;
    margin-left: 0.1rem;
    min-width: 20px;
    color: @myCZC;
  }
  .shortTop {
    height: 3.7rem !important;
  }
  .toplist {
    display: flex;
    flex-direction: column;
    height: 4.6rem;
    overflow-x: scroll;
    margin-top: 0.1rem;
    li {
      flex-grow: 1;
      max-height: 0.8rem;
      display: flex;
      flex-direction: row;
      p {
        font-size: 20px;
      }
      div {
        height: 0.5rem;
        display: flex;
        overflow: hidden;
        flex-wrap: wrap;
        span:first-of-type {
          margin-left: 0.2rem;
          margin-right: 0.1rem;
          font-weight: bold;
          font-size: 16px;
          color: @myZC;
        }
        span:nth-of-type(2) {
          font-size: 12px;
          color: @myCZC;
        }
        span:nth-of-type(3) {
          font-size: 12px;
          margin-left: 0.2rem;
          overflow: hidden;
          max-height: 0.5rem;
          min-width: 2rem;
          color: @myCZC;
        }
      }
    }
    li:hover {
      cursor: pointer;
      background-color: @myAbC;
    }
  }
  .red {
    color: #c72e2e;
  }
}
</style>
