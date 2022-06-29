<template>
  <div id="Singer">
    <div class="category">
      <div class="lang">
        <p>语种:</p>
        <ul>
          <li v-for="(item, index) in area" :key="index">
            <div class="fake" @click="show(area, index)">
              <span :class="{ show: item.show }">{{ item.name }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="sort">
        <p>分类:</p>
        <ul>
          <li v-for="(item, index) in type" :key="index">
            <div class="fake" @click="show(type, index)">
              <span :class="{ show: item.show }">{{ item.name }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="choice">
        <p>筛选:</p>
        <ul>
          <li v-for="(item, index) in initial" :key="index">
            <div
              class="fake"
              @click="show(initial, index)"
              :class="{ hot: item.name == '热门' }"
            >
              <span :class="{ show: item.show }">{{ item.name }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="content" ref="content">
      <router-link to="" v-for="(item, index) in artists" :key="index">
        <div>
          <router-link :to="{ path: 'artist', query: { id: item.id } }">
            <img :src="item.picUrl"
          /></router-link>
          <span
            ><router-link :to="{ path: 'artist', query: { id: item.id } }" class="a">{{
              item.name
            }}</router-link></span
          >
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-?"></use>
          </svg>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, ref, Ref, reactive, onMounted, watchEffect, watch } from "vue";
import $store from "../../../store/index";
import { Data, area, type, initial } from "../../../hooks/singerData";
import axios from "axios";
/**
 * 定义参数接口
 */
interface Params {
  area: number | string;
  type: number | string;
  initial: number | string;
  limit: number;
}
/**
 * 定义参数对象
 */
const getParams: Params = reactive({
  area: -1,
  type: -1,
  initial: -1,
  limit: 30,
});
type Artists={
  name:string
  picUrl:string
  id:number
}
let artists = ref<Artists[]>([]);

/**
 * 定义修改分类刷新
 */
function show(category: Data[], index: number): void {
  for (let i = 0; i < category.length; i++) {
    category[i].show = false;
  }
  category[index].show = true;
  if (category == area) {
    getParams.area = category[index].params;
  } else if (category == type) {
    getParams.type = category[index].params;
  } else {
    getParams.initial = category[index].params;
  }
  getParams.limit = 30;
  artists.value = [];
  //更新函数
  axios
    .get("http://localhost:3000/artist/list", {
      params: { ...getParams },
    })
    .then((response) => {
      artists.value = response.data.artists;
    });
}
/**
 * 定义下拉框刷新数据
 */
let timer;
watchEffect(function () {
  //监视TOP传来的父子元素数据
  let update = ref($store.state.update).value;
  if (
    update.singerHeight < update.topHeight + update.outHeight &&
    getParams.limit <= 70
  ) {
    getParams.limit += 30;
    timer = null;
    timer = setTimeout(() => {
      axios
        .get("http://localhost:3000/artist/list", {
          params: { ...getParams },
        })
        .then((response) => {
          artists.value = response.data.artists;
        });
    });
  }
});
/**
 * 渲染页面请求
 */

onMounted(async () => {
  await axios
    .get("http://localhost:3000/artist/list", {
      params: { ...getParams },
    })
    .then((response) => {
      artists.value = response.data.artists;
    });
});
</script>
<style lang="less">
.category {
  margin-top: 0.1rem;
  min-width: 9rem;
  p {
    width: 0.4rem;
    font-size: 14px;
  }
  span {
    font-size: 12px;
  }
  .lang,
  .sort,
  .choice {
    display: flex;
    flex-direction: row;
  }
  .lang,
  .sort {
    margin-top: 0.1rem;
    ul {
      display: flex;
      flex-direction: row;
      .fake:after {
        content: "|";
        color: @myCC;
      }
      span {
        margin-left: 0.15rem;
        padding: 0.05rem 0.1rem;
        border-radius: 20%;
        margin-right: 0.15rem;
      }
    }
  }
  .choice {
    margin-top: 0.1rem;
    ul {
      display: flex;
      max-width: 7rem;
      flex-direction: row;
      flex-wrap: wrap;
      .hot span {
        padding: 0;
      }
      .fake:after {
        content: "|";
        color: @myCC;
      }
      span {
        margin-left: 0.15rem;
        padding: 0.05rem 0.1rem;
        border-radius: 20%;
        margin-right: 0.15rem;
      }
    }
  }
  .show {
    color: @myP;
    background-color: @myAbC;
  }
}
.content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  div {
    width: 100%;
    height: 100%;
    position: relative;
    margin: 0.1rem 0.05rem 0.3rem 0.05rem;
  }
  img {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 5%;
  }
  span {
    position: absolute;
    bottom: 10px;
    left: 10px;
  }
}
.lang,
.sort,
.choice {
  span:hover {
    cursor: default;
    color: @myP;
  }
}
.a {
  color: @myZC;
}
.a:hover {
  color: black;
}
</style>
