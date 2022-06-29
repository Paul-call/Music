<template>
  <div class="main">
    <h2>官方榜</h2>
    <div class="lists">
      <div class="list" v-for="(item, index) in topLists" :key="index">
        <div class="img">
          <router-link :to="{ path: 'song', query: { id: item.id } }">
            <span>{{ item.updateFrequency }}</span>
            <svg class="icon play" aria-hidden="true">
              <use xlink:href="#icon-yunhang-copy"></use>
            </svg>
            <img :src="item.coverImgUrl" />
          </router-link>
        </div>
        <ul class="songs">
          <li
            v-for="(song, index) in item.playlist"
            :key="index"
            :class="{ one: index % 2 == 0 }"
          >
            <div>
              <span>{{ index + 1 }}</span>
              <span class="name">{{ song.name }}</span
              ><span>{{ song.alia ? song.alia[0] : "" }}</span
              ><span class="writer"
                ><router-link
                  v-for="(ar, index) in song.ar"
                  :class="{ ar: index != song.ar.length - 1 }"
                  :key="index"
                  :to="{ path: 'artist', query: { id: ar.id } }"
                  class="a"
                  >{{ ar.name }}</router-link
                ></span
              >
            </div>
          </li>
          <p>
            <router-link :to="{ path: 'song', query: { id: item.id } }"
              >查看全部&gt;</router-link
            >
          </p>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, onMounted, ref, Ref } from "vue";
import axios from "axios";
defineComponent({
  name: "TopList",
});
async function getDetail(id: number) {
  let result = await axios.get("http://localhost:3000/playlist/detail", {
    params: {
      id: id,
    },
  });
  return result;
}
type TopList={
  id:number
  coverImgUrl:string
  playlist:{name:string,ar:{id:number,name:string}[]}[]
  updateFrequency:number
}
let topLists = ref<TopList[]>([]);
onMounted(async () => {
  await axios.get("http://localhost:3000/toplist").then(async (response) => {
    for (let i = 0; i < 4; i++) {
      topLists.value.push(response.data.list[i]);
      //针对返回的排行榜单进行细节获取
      await getDetail(topLists.value[i].id).then((response) => {
        for (let j = 0; j < 5; j++) {
          if (j == 0) topLists.value[i].playlist = [];
          topLists.value[i].playlist.push(response.data.playlist.tracks[j]);
        }
      });
    }
  });
});
</script>
<style lang="less" scoped>
.main {
  width: 100%;
  margin-top: 0.1rem;
  min-width: 9rem;
  max-width: @fWidth;
  h2 {
    font-size: 18px;
    font-family: "黑体";
  }
  .lists {
    margin-top: 0.1rem;
    display: flex;
    flex-direction: column;
    .list {
      display: flex;
      flex-direction: row;
      flex-grow: 1;
      margin-top: 0.1rem;
      width: 100%;
      .img {
        flex-grow: 1;
        position: relative;
        width: 2rem;
        max-width: 2rem;
        border-radius: 5%;
        img {
          width: 2rem;
          height: 2rem;
          border-radius: 5%;
        }
        .play {
          position: absolute;
          left: 35%;
          top: 35%;
          font-size: 50px;
          background-color: #fff;
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.5s;
          transition-timing-function: ease-in-out;
        }
        :hover .play {
          opacity: 0.8;
          transition: opacity 0.5s;
          transition-timing-function: ease-in-out;
        }
        span {
          position: absolute;
          font-size: 14px;
          color: @myW;
          top: 62%;
          left: 35%;
        }
      }
      .songs {
        flex-grow: 10;
        padding-left: 0.5rem;
        li {
          max-width: 6rem;
          height: 0.3rem;
          padding-left: 0.1rem;
          border-radius: 5%;
          div {
            transform: translateY(10%);
          }
          span {
            color: @myCZC;
          }
        }
        li:hover {
          background-color: @myAbC;
        }
        span:first-of-type {
          font-size: 14px;
          font-weight: bold;
          color: @myP;
          margin-right: 0.3rem;
        }
        .name {
          color: black;
          margin-right: 0.1rem;
        }

        .writer {
          float: right;
          margin-right: 0.1rem;
          a {
            margin-left: 0.05rem;
          }
        }
        .one {
          background-color: @myAbC;
        }
        p {
          margin-top: 0.1rem;
          cursor: pointer;
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
.ar:after {
  content: "/";
  margin-left: 0.05rem;
}
</style>
