<template>
  <div id="song">
    <div class="mainData">
      <div class="img">
        <img :src="playList.coverImgUrl" />
      </div>
      <div class="detail">
        <div :class="{ name: !detail.highQuality, good: detail.highQuality }">
          <span v-if="!detail.highQuality">歌单</span>
          <span v-if="detail.highQuality">精品歌单</span>
          <span>{{ playList.name }}</span>
        </div>
        <div class="user">
          <!-- 这里要做个超链接通往用户 -->
          <img :src="user.avatarUrl" />
          <router-link :to="{ path: 'users', query: { id: user.uid } }" class="router">{{
            user.name
          }}</router-link>
          <span
            >{{
              new Date(parseInt(detail.updateTime))
                .toLocaleString()
                .replace(/:\d{1,2}$/, " ")
                .replace("/", "-")
                .replace("/", "-")
            }}创建</span
          >
        </div>
        <div class="op">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofang"></use></svg
            >播放全部
          </div>
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-tianjiawenjianjia"></use></svg
            >收藏
          </div>
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-fenxiang"></use></svg
            >分享
          </div>
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiazai1"></use></svg
            >下载全部
          </div>
        </div>
        <div class="data">
          <p v-if="typeof detail.tags == 'undefind'">
            标签:
            <router-link
              class="router lable"
              v-for="(item, index) in detail.tags"
              :key="index"
              :to="{ path: 'songList', query: { tag: item } }"
              >{{ item }}</router-link
            >
          </p>
          <p>歌曲:{{ songs.length + 1 }}首 播放:{{ detail.playCount }}万</p>
          <div class="mark">
            <p
              :class="{ description2: showAll, description: !showAll }"
              v-if="playList.description"
            >
              简介:{{ playList.description }}
            </p>
            <div
              @click="showAll = !showAll"
              :class="{ btn2: showAll, btn: !showAll }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="look">
      <router-link :to="{ path: 'songs' }">歌曲列表</router-link>
      <router-link :to="{ path: 'commits' }">评论</router-link>
      <router-link to="collecter">收藏者</router-link>
    </div>
    <div class="songView">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, onMounted, ref, Ref, provide } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
defineComponent({
  name: "Song",
});
type Song = {
  name: string;
  id: number;
  ar: { id: number; name: string }[];
  al: { name: string };
  dt: number;
  mv: number;
};
let showAll = ref(false);
const route = useRoute();
const router = useRouter();
let playList = ref({}) as Ref;
let songs = ref<Song[]>([]);
let detail = ref({ tag: "", playCount: "", highQuality: false }) as Ref;
let commits = ref([]) as Ref;
let user = ref([]) as Ref;
//下发id
provide("id", route.query.id);
onMounted(async () => {
  //请求歌单项请
  await axios
    .get("http://localhost:3000/playlist/detail", {
      params: {
        id: route.query.id,
      },
    })
    .then((response) => {
      playList.value = response.data.playlist;
      //分发歌单细节信息
      detail.value.tags = response.data.playlist.tags;
      detail.value.playCount = response.data.playlist.playCount.toString().slice(0, 2);
      detail.value.highQuality = response.data.playlist.highQuality;
      detail.value.updateTime = response.data.playlist.updateTime;
      //分发用户信息
      user.value.uid = response.data.playlist.creator.userId;
      user.value.name = response.data.playlist.creator.nickname;
      user.value.avatarUrl = response.data.playlist.creator.avatarUrl;
    });
  //请求歌单评论
  await axios
    .get("http://localhost:3000/comment/playlist", {
      params: {
        id: route.query.id,
      },
    })
    .then((response) => {
      commits.value = response.data.hotComments;
    });
});
</script>
<style lang="less" scoped>
.mainData {
  margin-top: 0.2rem;
  min-width: 9rem;
  display: flex;
  flex-direction: row;
  .img {
    img {
      width: 2rem;
      height: 2rem;
      border-radius: 3px;
    }
  }
  .songs {
    div:nth-of-type(2) {
      max-width: 328.083px;
    }
  }
  .detail {
    margin-left: 0.2rem;
    .name {
      span:first-of-type {
        color: @myP;
        padding: 3px 2px 1px 2px;
        border-radius: 5px;
        border: 1px solid @myP;
        margin-right: 0.1rem;
      }
    }
    .good {
      span:first-of-type {
        color: #ec4141;
        padding: 3px 2px 1px 2px;
        border-radius: 5px;
        border: 1px solid #ec4141;
      }
      span:nth-of-type(2) {
        margin-left: 0.2rem;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
  .user {
    margin-top: 0.1rem;
    img {
      border-radius: 50%;
      width: 0.25rem;
      height: 0.25rem;
      margin-left: 0.1rem;
    }
    a {
      margin-left: 0.1rem;
    }
    span {
      margin-left: 0.1rem;
    }
  }
  .op {
    margin-top: 0.1rem;
    div {
      cursor: pointer;
      display: inline;
      font-size: 16px;
      padding: 6px;
      border-radius: 15px;
      margin: 0 0.1rem 0 0.1rem;
    }
    div:first-of-type {
      color: @myW;
      border: 1px solid @myP;
      background-color: @myP;
    }
    div:first-of-type:hover {
      color: @myW;
      border: 1px solid @myP;
      background-color: @myDP;
    }
    div {
      border: 1px solid @myLC;
    }
    div:hover {
      background-color: @myAbC;
    }
  }
  .data {
    margin-top: 0.1rem;
    position: relative;
    p {
      margin-top: 2px;
    }
  }
  .mark {
    position: relative;
    min-width: 6.2rem;
    max-width: 6.2rem;
  }
  .description {
    max-height: 0.2rem;
    max-width: 6rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .description2 {
    max-width: 6rem;
    max-height: none;
    white-space: wrap;
  }
  .btn {
    border-style: solid;
    border-width: 0px 0px 10px 10px;
    position: absolute;
    right: 0;
    top: 0;
    transform: rotate(45deg);
    border-color: transparent transparent #dfdfdf transparent;
    width: 0px;
    height: 0px;
    cursor: pointer;
  }
  .btn2 {
    cursor: pointer;
    border-style: solid;
    border-width: 0px 0px 10px 10px;
    position: absolute;
    right: 0;
    top: 0;
    transform: rotate(225deg);
    border-color: transparent transparent #dfdfdf transparent;
    width: 0px;
    height: 0px;
  }
}
.look {
  margin-top: 0.2rem;
  a {
    font-size: 16px;
    margin: 0.1rem 0.15rem 0.1rem 0.15rem;
  }
  .router-link-active {
    font-size: 18px;
    font-weight: bold;
    border-radius: 3px;
    padding-bottom: 2px;
    border-bottom: 3px @myP solid;
  }
}
.songView {
  min-width: 9rem;
  margin-top: 0.2rem;
  margin-left: 0.1rem;
}
.router {
  color: #0b58b0;
}
.lable {
  margin-right: 0.1rem;
}
.lable:after {
  content: "/";
}
.lable:last-of-type:after {
  content: "";
}
</style>
