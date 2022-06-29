<template>
  <div id="allMv">
    <p class="title">全部Mv</p>
    <div>
      <ul class="area">
        <p>地区:</p>
        <li>
          <div class="fake">
            <span
              :class="{ show: getParams.area == '内地' }"
              @click="
                getParams.area = '内地';
                myState = 1;
              "
              >内地</span
            >
          </div>
        </li>
        <li>
          <div class="fake">
            <span
              :class="{ show: getParams.area == '港台' }"
              @click="
                getParams.area = '港台';
                myState = 1;
              "
              >港台</span
            >
          </div>
        </li>
        <li>
          <div class="fake">
            <span
              :class="{ show: getParams.area == '欧美' }"
              @click="
                getParams.area = '欧美';
                myState = 1;
              "
              >欧美</span
            >
          </div>
        </li>
        <li>
          <div class="fake">
            <span
              :class="{ show: getParams.area == '日本' }"
              @click="
                getParams.area = '日本';
                myState = 1;
              "
              >日本</span
            >
          </div>
        </li>
        <li>
          <div>
            <span
              :class="{ show: getParams.area == '韩国' }"
              @click="
                () => {
                  getParams.area = '韩国';
                  myState = 1;
                }
              "
              >韩国</span
            >
          </div>
        </li>
      </ul>
      <ul class="type">
        <p>类型:</p>
        <li>
          <div class="fake">
            <span
              :class="{ show: getParams.type == '全部' }"
              @click="
                () => {
                  getParams.type = '全部';
                  myState = 1;
                }
              "
              >全部</span
            >
          </div>
        </li>
        <li>
          <div class="fake">
            <span
              :class="{ show: getParams.type == '官方版' }"
              @click="
                () => {
                  getParams.type = '官方版';
                  myState = 1;
                }
              "
              >官方版</span
            >
          </div>
        </li>
        <li>
          <div class="fake">
            <span
              :class="{ show: getParams.type == '原声' }"
              @click="
                () => {
                  getParams.type = '原声';
                  myState = 1;
                }
              "
              >原声</span
            >
          </div>
        </li>
        <li>
          <div class="fake">
            <span
              :class="{ show: getParams.type == '现场版' }"
              @click="
                () => {
                  getParams.type = '现场版';
                  myState = 1;
                }
              "
              >现场版</span
            >
          </div>
        </li>
        <li>
          <div>
            <span
              :class="{ show: getParams.type == '网易出品' }"
              @click="
                () => {
                  getParams.type = '网易出品';
                  myState = 1;
                }
              "
              >网易出品</span
            >
          </div>
        </li>
      </ul>
      <ul class="order">
        <p>排序:</p>
        <li>
          <div class="fake">
            <span
              :class="{ show: getParams.order == '上升最快' }"
              @click="
                getParams.order = '上升最快';
                myState = 1;
              "
              >上升最快</span
            >
          </div>
        </li>
        <li>
          <div class="fake">
            <span
              :class="{ show: getParams.order == '最新' }"
              @click="
                () => {
                  getParams.order = '最新';
                  myState = 1;
                }
              "
              >最新</span
            >
          </div>
        </li>
        <li>
          <div class="fake">
            <span
              :class="{ show: getParams.order == '最热' }"
              @click="
                () => {
                  getParams.order = '最热';
                  myState = 1;
                }
              "
              >最热</span
            >
          </div>
        </li>
      </ul>
    </div>
    <div class="Mvs">
      <ul class="Rem Rec">
        <li v-for="(item, index) in Mvs" :key="index">
          <div class="img">
            <router-link :to="{ path: 'mvplay', query: { id: item.id } }">
              <img :src="item.cover" />
              <span
                ><svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-play-copy"></use></svg
                >{{ item.playCount.toString().slice(0, 3) }}万</span
              >
            </router-link>
          </div>
          <p class="name">{{ item.name }}</p>
          <p class="artName">
            <router-link
              :to="{ path: 'artist', query: { id: ar.id } }"
              v-for="(ar, index) in item.artists"
              :key="index"
              :class="{ ar: index != item.artists.length - 1 }"
              class="a"
              >{{ ar.name }}</router-link
            >
          </p>
        </li>
      </ul>
    </div>
    <div class="block">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="count | 100"
        class="el"
        :currentPage="getParams.offset"
        @current-change="
          (value) => {
            getParams.offset = value;
            myState = 0;
          }
        "
      >
      </el-pagination>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, ref, watchEffect, onMounted } from "vue";
import axios from "axios";
type Mv = {
  id: number;
  name: string;
  artistName: string;
  cover: string;
  playCount: number;
  artistId: number;
};
interface Igetparams {
  limit: number;
  area: string;
  type: string;
  order: string;
  offset: number;
}
let myState = ref<number>(0);
let count = ref<number>(0);
let getParams = ref<Igetparams>({
  area: "内地",
  limit: 36,
  type: "全部",
  offset: 1,
  order: "上升最快",
});
let Mvs = ref<Mv[]>([]);
watchEffect(async () => {
  let x = getParams;
  if (myState.value) {
    getParams.value.offset = 1;
    /**
     * 确定总数多少且更换选择
     */
    await axios
      .get("http://localhost:3000/mv/all", {
        params: {
          area: getParams.value.area,
          limit: getParams.value.limit,
          type: getParams.value.type,
          order: getParams.value.order,
        },
      })
      .then((response) => {
        count.value = response.data.count;
      });
  }
  await axios
    .get("http://localhost:3000/mv/all", {
      params: {
        area: getParams.value.area,
        limit: getParams.value.limit,
        type: getParams.value.type,
        order: getParams.value.order,
        offset: getParams.value.offset * 36,
      },
    })
    .then((response) => {
      Mvs.value = response.data.data;
    });
});
onMounted(async () => {
  await axios
    .get("http://localhost:3000/mv/all", {
      params: {
        area: getParams.value.area,
        limit: getParams.value.limit,
        type: getParams.value.type,
        order: getParams.value.order,
      },
    })
    .then((response) => {
      count.value = response.data.count;
    });
});
</script>
<style lang="less" scoped>
#allMv {
  min-width: 9rem;
}
.title {
  font-size: 20px;
  font-weight: bold;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
}
.area,
.type,
.order {
  margin-top: 0.1rem;
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
    cursor: pointer;
    font-size: 12px;
    color: @myCZC;
  }
  .show {
    color: #e73030;
    background-color: #fcebeb;
  }
}
.Rem {
  max-width: 8.5rem;
  margin: 0.1rem 0 0.15rem 0.2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  p {
    cursor: pointer;
  }
  p:first-of-type {
    margin-top: 0.05rem;
    font-size: 14px;
    color: @myZC;
  }
  p:nth-of-type(2) {
    font-size: 12px;
    color: @myCZC;
  }
  p:nth-of-type(2):hover {
    color: @myZC;
  }
  li {
    margin-top: 0.1rem;
    margin-right: 0.2rem;
  }
  .img {
    position: relative;
    img {
      border-radius: 5%;
      width: 2.6rem;
      height: 1.5rem;
    }
    span {
      position: absolute;
      color: @myW;
      top: 5%;
      font-size: 10px;
      right: 5%;
      svg {
        margin-right: 2px;
      }
    }
  }
}
.Rec {
  p {
    max-width: 2.2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .artName {
    margin-top: 0.07rem;
    font-size: 12px;
    color: @myCZC;
  }
  .artName:hover {
    color: @myZC;
  }
}
.block {
  margin: 0.1rem auto;
  position: relative;
  height: auto;
  .el {
    position: absolute;
    left: 20%;
  }
}
.a {
  color: @myCZC;
}
.a:hover {
  color: @myZC;
}
.ar:after {
  content: "/";
  margin-left: 0.05rem;
}
</style>
