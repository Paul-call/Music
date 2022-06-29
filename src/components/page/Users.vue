<template>
  <div id="Users">
    <p v-if="isEx" class="isEx">暂无此用户</p>
    <div class="user" v-if="!isEx">
      <div
        class="detail"
        :style="{ backgroundUrl: userDetail.backgroundUrl, backgroundColorL: 'green' }"
      >
        <div class="img">
          <img :src="userDetail.avatarUrl" />
        </div>
        <div class="name">
          <p>{{ userDetail.nickname }}</p>
          <div class="profile">
            <p>性别:{{ userDetail.gender ? "男" : "女" }}</p>
            <p v-if="userDetail.signature">个人介绍:{{ userDetail.signature }}</p>
          </div>
        </div>
      </div>
      <div>
        <p class="list">创建的歌单</p>
        <div class="playLists">
          <router-link
            v-for="(item, index) in songLists"
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
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute, LocationQueryValue } from "vue-router";
import { ref, onMounted, reactive } from "vue";
import axios from "axios";
let uid = ref<number | LocationQueryValue | LocationQueryValue[]>(useRoute().query.id)!;
let isEx = ref<boolean>(false);
type User = {
  nickname: string;
  avatarUrl: string;
  signature: string;
  backgroundUrl: string;
  gender: number;
};
let userDetail = ref<User>({
  nickname: "",
  avatarUrl: "",
  signature: "",
  gender: 0,
  backgroundUrl: "",
});
type SongList = {
  name: string;
  id: number;
  creator: {
    nickname: string;
  };
  coverImgUrl: string;
  playCount: number;
};
let songLists = ref<SongList[]>([]);
onMounted(async () => {
  try {
    await axios
      .get("http://localhost:3000/user/detail", {
        params: { uid: uid.value },
      })
      .then(
        (response) => {
          userDetail.value = response.data.profile;
        },
        (error) => {
          isEx.value = true;
        }
      );
  } catch (e) {
    console.log(e);
  }
  if (!isEx.value) {
    await axios
      .get("http://localhost:3000/user/playlist", {
        params: { uid: uid.value },
      })
      .then((response) => {
        songLists.value = response.data.playlist;
      });
  }
});
</script>
<style lang="less" scoped>
#Users {
  margin-top: 0.1rem;
  min-width: 9rem;
  .isEx {
    font-size: 20px;
    font-weight: bold;
    margin: 0 40%;
  }
  .detail {
    display: flex;
    flex-direction: row;
    .img {
      width: 2rem;
      height: 2rem;
      img {
        border-radius: 50%;
        width: 2rem;
        height: 2rem;
      }
    }
    .name {
      margin-top: 0.2rem;
      margin-left: 0.2rem;
      p:first-of-type {
        font-size: 20px;
        font-weight: bold;
      }
    }
    .profile {
      margin-top: 0.1rem;
      p:first-of-type {
        font-size: 14px;
        font-weight: initial;
      }
    }
  }
  .list {
    margin-top: 0.1rem;
    font-size: 18px;
    font-weight: bold;
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
</style>
