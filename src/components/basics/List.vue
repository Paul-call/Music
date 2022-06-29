<template>
  <div id="List">
    <p>当前播放</p>
    <span>总{{ list.length }}首</span>
    <ul>
      <li
        class="song"
        v-for="(item, index) in audioes"
        :key="index"
        :class="{ dark: (index + 1) % 2 == 0 }"
        @click="changePointer(index)"
      >
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-aixin"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiazai2"></use>
          </svg>
        </div>
        <div>
          <span :class="{ pink: index == $store.state.AudioPlay.pointer }">{{
            comName(item.name)
          }}</span
          ><span v-if="item.sq">SQ</span
          ><span v-if="item.mv"
            ><router-link class="mv" :to="{ path: 'mvplay', query: { id: item.mv } }"
              >MV</router-link
            ></span
          >
        </div>
        <div>
          <span
            v-for="(ar, index) in item.ar"
            :key="index"
            :class="{ back: index != 0 && index != item.ar.length - 1 }"
            ><router-link :to="{ path: 'artist', query: { id: ar.id } }" class="a">{{
              ar.name
            }}</router-link></span
          >
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import $store from "../../store/index";
import axios from "axios";
import { defineComponent, ref, watchEffect } from "vue";
defineComponent({
  name: "List",
});
function comName(songName: string): string {
  if (songName.length > 10) {
    return songName.slice(0, 10) + "...";
  } else {
    return songName;
  }
}
let list = ref<number[]>($store.state.AudioPlay.audioes);
type Audio = {
  id: number;
  sq: boolean;
  mv: number;
  name: string;
  ar: { id: number; name: string }[];
};
let audioes = ref<Audio[]>([]);
function changePointer(value: number) {
  $store.commit("changePointer", value);
}
async function getData() {
  let params = ``;
  list.value.forEach((item) => {
    params = params + item + ",";
  });
  params = params.slice(0, params.length - 1);
  let result = await axios.get(`http://localhost:3000/song/detail?ids=${params}`);
  console.log(result.data.songs);
  audioes.value = result.data.songs;
}
watchEffect(() => {
  list = ref<number[]>($store.state.AudioPlay.audioes);
  getData();
});
</script>
<style lang="less" scoped>
ul::-webkit-scrollbar{
         display:none
    }
ul {
  height: 6rem;
  overflow: scroll;
}
.song {
  display: flex;
  max-width: 8.5rem;
  flex-direction: row;
  div {
    cursor: default;
    padding: 2px 0 2px 0;
  }
  div:first-of-type {
    width: 1rem;
    span {
      color: @myCZC;
      margin-left: 0.1rem;
    }
    svg {
      margin-left: 0.1rem;
    }
    svg:hover {
      cursor: pointer;
    }
  }
  div:nth-of-type(2) {
    width: 3.1rem;
    padding-left: 0.1rem;
    overflow: hidden;
    span:first-of-type {
      margin-right: 0.1rem;
    }
    span:nth-of-type(2),
    span:nth-of-type(3) {
      font-size: 12px;
      padding: 0 3px 0 3px;
      color: @myP;
      margin-left: 0.05rem;
      border-radius: 3px;
      border: 1px solid @myP;
    }
    span:nth-of-type(3):hover {
      cursor: pointer;
      padding: 0 3px 0 3px;
      color: @myP;
      border-radius: 3px;
      border: 1px solid @myP;
    }
  }
  div:nth-of-type(3) {
    width: 1.2rem;
    max-width: 103.617px;
    overflow: hidden;
    max-height: 21.6px;
  }
  div:nth-of-type(4) {
    width: 2rem;
    text-align: left;
    span {
      margin-left: 0.1rem;
      max-width: 178.433px;
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  div:nth-of-type(5) {
    width: 0.7rem;
    text-align: right;
    span {
      margin-right: 0.1rem;
    }
  }
}
.song:hover {
  background-color: @myAbC;
}
.dark {
  background-color: @myAbC;
}
.a {
  color: @myCZC;
}
.mv {
  color: @myP;
}
.a:hover {
  color: @myZC;
}
.back:after {
  content: "/";
}
.pink {
  color: @myP;
}
</style>
