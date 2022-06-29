<template>
  <div id="Mv">
    <div>
      <p class="title"><Router-link to="allMv">最新Mv&gt;</Router-link></p>
      <ul class="Rem">
        <li v-for="(item, index) in newMv" :key="index">
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
          <p>{{ item.name }}</p>
          <p>
            <router-link
              :to="{ path: 'artist', query: { id: item.artistId } }"
              class="a"
              >{{ item.artistName }}</router-link
            >
          </p>
        </li>
      </ul>
    </div>
    <div>
      <p class="title"><router-link to="allMv">网易出品&gt;</router-link></p>
      <ul class="Rem Rec">
        <li v-for="(item, index) in RcMv" :key="index">
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
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </div>
    <div>
      <div class="top">
        <p class="title"><router-link to="topMv">Mv排行榜&gt;</router-link></p>
        <ul class="area">
          <li>
            <div class="fake">
              <span
                :class="{ show: getParams.area == '内地' }"
                @click="getParams.area = '内地'"
                >内地</span
              >
            </div>
          </li>
          <li>
            <div class="fake">
              <span
                :class="{ show: getParams.area == '港台' }"
                @click="getParams.area = '港台'"
                >港台</span
              >
            </div>
          </li>
          <li>
            <div class="fake">
              <span
                :class="{ show: getParams.area == '欧美' }"
                @click="
                  () => {
                    getParams.area = '欧美';
                  }
                "
                >欧美</span
              >
            </div>
          </li>
          <li>
            <div class="fake">
              <span
                :class="{ show: getParams.area == '日本' }"
                @click="getParams.area = '日本'"
                >日本</span
              >
            </div>
          </li>
          <li>
            <div>
              <span
                :class="{ show: getParams.area == '韩国' }"
                @click="getParams.area = '韩国'"
                >韩国</span
              >
            </div>
          </li>
        </ul>
        <!-- 这里是mv排行榜 -->
        <ul class="Mvs">
          <li
            v-for="(item, index) in topMv"
            :key="index"
            :class="{
              right: (index + 1) % 2 != 0,
              middle: index > 1 || index < 8,
              end: index == 8 || index == 9,
            }"
          >
            <div class="list">
              <p>{{ index + 1 < 10 ? "0" + (index + 1) : index + 1 }}</p>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jiantou_xiangshang_o"></use>
              </svg>
            </div>
            <div class="img">
              <router-link :to="{ path: 'mvplay', query: { id: item.id } }">
                <img :src="item.cover" />
              </router-link>
              <span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-sen018"></use></svg
                >{{ item.score }}
              </span>
            </div>
            <div class="name">
              <span>{{ item.name }}</span>
              <span
                ><router-link
                  :to="{ path: 'artist', query: { id: item.artistId } }"
                  class="a"
                  >{{ item.artistName }}</router-link
                ></span
              >
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, ref, onMounted, watchEffect } from "vue";
import axios from "axios";
defineComponent({
  name: "Mv",
});
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
}
let newMv = ref<Mv[]>([]);
let RcMv = ref<Mv[]>([]);
let getParams = ref<Igetparams>({ area: "内地", limit: 10 });
let topMv = ref<Mv[]>([]);
/**
 * 确定标签调整内容及方法
 */
watchEffect(async () => {
  let x = getParams;
  await axios
    .get("http://localhost:3000/top/mv", {
      params: { area: getParams.value.area, limit: getParams.value.limit },
    })
    .then((response) => {
      topMv.value = response.data.data;
    });
});
/**
 * 初始化的数据
 */
onMounted(async () => {
  //获取推荐Mv
  await axios("http://localhost:3000/mv/first", { params: { limit: 6 } }).then(
    (response) => {
      newMv.value = response.data.data;
    }
  );
  //获取网易出品Mv
  await axios("http://localhost:3000/mv/exclusive/rcmd", { params: { limit: 6 } }).then(
    (response) => {
      RcMv.value = response.data.data;
    }
  );
});
</script>
<style lang="less" scoped>
#Mv {
  margin-top: 0.1rem;
  .title {
    font-size: 18px;
    margin-left: 0.1rem;
    font-weight: bold;
  }
  .Rem {
    max-width: 8.5rem;
    margin: 0.1rem 0 0.1rem 0.2rem;
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
        width: 2.5rem;
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
      max-width: 2.5rem;
      white-space: pre-wrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .top {
    position: relative;
    margin-top: 0.2rem;
    .area {
      position: absolute;
      top: 0%;
      right: 5%;
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
    .Mvs {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .right {
        border-right: 1px solid rgba(247, 238, 238, 0.656);
      }
      .middle {
        border-bottom: 1px solid rgba(247, 238, 238, 0.656);
      }
      .end {
        border-bottom: none;
      }
      li {
        display: flex;
        flex-direction: row;
        width: 4.4rem;
        padding-top: 0.1rem;
        padding-bottom: 0.1rem;
        .list {
          min-width: 0.4rem;
          margin-left: 0.1rem;
          p {
            margin-top: 0.45rem;
            font-size: 20px;
            font-weight: bold;
            color: #9f9f9f;
          }
        }
        .img {
          flex-grow: 0;
          position: relative;
          img {
            border-radius: 5%;
            width: 2.5rem;
            height: 1.5rem;
          }
          img:hover {
            cursor: pointer;
          }
          span {
            position: absolute;
            color: @myW;
            svg {
              color: #fff;
            }
            line-height: 70%;
            right: 4%;
            top: 4%;
          }
        }
        .name {
          flex-grow: 0;
          span {
            display: block;
            max-width: 1.3rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin: 0.2rem 0 0.1rem 0.1rem;
          }
          span:nth-of-type(2) {
            font-size: 12px;
            color: @myCZC;
          }
          span:hover {
            cursor: pointer;
            color: @myZC;
          }
        }
      }
    }
  }
}
.a {
  color: @myCZC;
}
.a:hover {
  color: @myZC;
}
</style>
