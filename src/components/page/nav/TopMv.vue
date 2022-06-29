<template>
  <div id="#topMv">
    <p class="title">Mv排行榜</p>
    <span
      >最近更新:{{
        new Date(parseInt(Math.round(updateTime / 1000)) * 1000)
          .toLocaleString()
          .replace(/:\d{1,2}$/, " ")
          .replaceAll("/", "-")
      }}</span
    >
    <div class="top">
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
            end: index == 48 || index == 49,
          }"
        >
          <router-link :to="{ path: 'mvplay', query: { id: item.id } }">
            <div class="list">
              <p>{{ index + 1 < 10 ? "0" + (index + 1) : index + 1 }}</p>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jiantou_xiangshang_o"></use>
              </svg>
            </div>
            <div class="img">
              <img :src="item.cover" />
              <span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-sen018"></use></svg
                >{{ item.score }}
              </span>
            </div>
          </router-link>
          <div class="name">
            <span>{{ item.name }}</span>
            <span>
              <router-link
                :to="{ path: 'artist', query: { id: item.artists[0].id } }"
                class="a"
                >{{ item.artistName }}</router-link
              ></span
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import axios from "axios";
defineComponent({
  name: "topMv",
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
let getParams = ref<Igetparams>({ area: "内地", limit: 50 });
let updateTime = ref<number>(0);
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
      updateTime.value = response.data.updateTime;
    });
});
</script>
<style lang="less" scoped>
.title {
  font-size: 20px;
  margin-left: 0.1rem;
  font-weight: bold;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
}
span:first-of-type {
  font-size: 12px;
  color: @myCZC;
  margin-left: 0.2rem;
}
.top {
  position: relative;
  padding-top: 0.3rem;
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
.a {
  color: @myCZC;
}
.a:hover {
  color: @myZC;
}
</style>
