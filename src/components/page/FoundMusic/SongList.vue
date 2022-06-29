<template>
  <div id="songList">
    <div
      class="picture"
      v-if="greatObj.isGreat"
      :style="{ backgroundImage: `url(${greatObj.imgUrl})` }"
    >
      <div class="information">
        <div class="great">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-huangguan"></use></svg
          ><span>精品歌单</span>
        </div>
        <span class="name">{{ greatObj.name }}</span>
      </div>
    </div>
    <div class="category">
      <div
        class="choice"
        @click="
          isChoice = !isChoice;
          myState = 1;
        "
      >
        <span>{{ getParams.cat }}</span>
      </div>
      <Choice v-if="isChoice" class="teleport" @sub="sub" :cat="getParams.cat"></Choice>
      <div></div>
      <ul>
        <li
          v-for="(item, index) in category.initail"
          :key="index"
          @click="
            getParams.cat = item.name;
            myState = 1;
          "
          :class="{ show: item.name == getParams.cat }"
        >
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <div class="playLists">
      <router-link
        v-for="(item, index) in playLists"
        :key="index"
        :to="{ path: 'song', query: { id: item.id } }"
      >
        <div class="playList">
          <div class="img">
            <span class="playCount"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-play"></use></svg
              >{{ item.playCount.toString().slice(0, 3) }}万</span
            >
            <svg class="icon play" aria-hidden="true">
              <use xlink:href="#icon-yunhang-copy"></use>
            </svg>
            <span class="creator"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jurassic_user-copy"></use></svg
              >{{ item.creator.nickname }}</span
            >
            <img :src="item.coverImgUrl" />
          </div>
          <p>{{ item.name }}</p>
        </div></router-link
      >
    </div>
    <div class="block">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :currentPage="getParams.offset"
        @current-change="
          (value) => {
            myState = 0;
            getParams.offset = value;
          }
        "
      >
      </el-pagination>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  Ref,
  watch,
  watchEffect,
  provide,
} from "vue";
import { useRoute, LocationQueryValue } from "vue-router";
import Choice from "./Choice.vue";
const route = useRoute();
defineComponent({
  name: "SongList",
  components: {
    Choice,
  },
});
let category = ref({}) as Ref;
let myState = ref<number>(0);
let total = ref<number>(0);
interface Iparmas {
  cat: string | LocationQueryValue[];
  limit: number;
  offset: number;
}
interface IgreatObj {
  isGreat: boolean;
  name: string;
  imgUrl: string;
}
//歌单数据
let playLists = ref([]) as Ref;
//精品标签
let greatTags = ref([]) as Ref;
//精品歌单
let greatLists: any[] = [];
//是否具有精品图
let greatObj: IgreatObj = reactive({ isGreat: false, name: "", imgUrl: "" });
//参数对象
let getParams: Iparmas = reactive({
  cat: route.query.tag ? route.query.tag : "华语",
  limit: 100,
  offset: 1,
});
/***
 * 声明一个函数 确认是否具有精品歌单
 */
async function isGreat(catName: string | LocationQueryValue[]) {
  greatObj.isGreat = false;
  for (let v of greatLists) {
    if (v.tags[0] == catName) {
      greatObj.isGreat = true;
      greatObj.name = v.name;
      greatObj.imgUrl = v.coverImgUrl;
    }
  }
}
/**
 * 监听种类改变更新数据
 */
watchEffect(async (newValue) => {
  if (myState.value) {
    getParams.offset = 1;
  }
  let x = getParams;
  await axios
    .get("http://localhost:3000/top/playlist", {
      params: {
        cat: getParams.cat,
        limit: getParams.limit,
        offset: getParams.offset * 100,
      },
    })
    .then((response) => {
      playLists.value = response.data.playlists;
      total.value = response.data.total;
    });
  isGreat(getParams.cat);
});
/**
 * 监听歌单种类组件
 */
let isChoice = ref(false) as Ref;
provide("cats", category);
function sub(categroy: string) {
  getParams.cat = categroy;
}
/**
 * 完成数据基本请求
 */
onMounted(async () => {
  await axios.get("http://localhost:3000/playlist/catlist").then((response) => {
    category.value = response.data;
    category.value.initail = [];
    for (let i = 0; i < 10; i++) {
      category.value.initail.push(category.value.sub[i]);
    }
  });
  await axios.get("http://localhost:3000/playlist/highquality/tags").then((response) => {
    greatTags.value = response.data.tags;
  });
  await axios
    .get("http://localhost:3000/top/playlist", {
      params: {
        cat: getParams.cat,
        limit: getParams.limit,
        offset: getParams.offset * 100,
      },
    })
    .then((response) => {
      playLists.value = response.data.playlists;
      total.value = response.data.total;
    });
  await axios.get("http://localhost:3000/top/playlist/highquality").then((response) => {
    greatLists = response.data.playlists;
  });
  isGreat(getParams.cat);
});
</script>
<style lang="less" scoped>
#songList {
  position: relative;
  .picture {
    margin-top: 0.1rem;
    width: 8.5rem;
    position: relative;
    height: 1.5rem;
    border-radius: 2%;
    padding-right: 0.2rem;
    background-size: 100%;
    background-position: 20%;
    overflow: hidden;
    .information {
      .great {
        position: absolute;
        bottom: 5%;
        border-radius: 15px;
        left: 5%;
        width: 1rem;
        height: 0.3rem;
        border: 1px #e7aa5a solid;
        padding-left: 6px;
        padding-top: 3px;
        svg {
          margin-right: 2px;
          font-size: 16px;
        }
        span {
          color: #e7aa5a;
          font-size: 16px;
        }
      }
      .name {
        color: @myW;
        position: absolute;
        bottom: 6%;
        left: 18%;
        font-size: 16px;
      }
    }
  }
  .category {
    display: flex;
    .choice {
      border: 1px @myCZC solid;
      margin-top: 0;
      width: 1rem;
      height: 0.25rem;
      border-radius: 15px;
      text-align: center;
      position: relative;
      span {
        font-size: 16px;
        flex-grow: 1;
      }
      :hover {
        cursor: pointer;
        background: @myAbC;
        border-radius: 15px;
      }
    }
    ul {
      margin-left: 1.2rem;
      flex-grow: 0;
      display: flex;
      flex-direction: row;
      margin-top: 0.1rem;
      li {
        margin: 0 0.1rem 0 0.1rem;
        font-size: 12px;
        border-radius: 20%;
        span {
          padding: 0.03rem 0.07rem;
        }
        span:hover {
          cursor: default;
          color: @myP;
        }
      }
    }
    .show {
      color: @myP;
      background-color: @myAbC;
    }
  }
  .playLists {
    margin: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .playList {
      margin: 0.1rem;
      .img {
        position: relative;
        .playCount {
          font-size: 10px;
          color: #fff;
          position: absolute;
          right: 10px;
          top: 3px;
        }
        .play {
          position: absolute;
          right: 10px;
          bottom: 10px;
          font-size: 30px;
          background-color: #fff;
          border-radius: 50%;
          opacity: 0;
        }
        .creator {
          color: #fff;
          position: absolute;
          right: 10px;
          bottom: 3px;
          font-size: 12px;
          svg {
            font-weight: bold;
          }
        }
        img {
          border-radius: 5px;
          width: 2rem;
          height: 2rem;
        }
      }
      p {
        max-width: 2rem;
        word-break: normal;
        overflow: hidden;
      }
      :hover .play {
        opacity: 0.8;
      }
    }
  }
}
.teleport {
  position: absolute;
  top: 2rem;
  z-index: 20;
  left: 0.1rem;
}
.block {
  margin: 0 auto;
  position: relative;
  .el-pagination {
    position: absolute;
    left: 20%;
  }
}
</style>
