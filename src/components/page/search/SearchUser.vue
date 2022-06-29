<template>
  <div class="SearchUser">
    <ul>
      <router-link
        v-for="(item, index) in Users"
        :key="index"
        :to="{ path: 'users', query: { id: item.userId } }"
      >
        <li :class="{ dark: (index + 1) % 2 == 0 }">
          <div class="img"><img :src="item.avatarUrl" /></div>
          <p>{{ item.nickname }}</p>
          <p v-if="item.gender">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-nan"></use>
            </svg>
          </p>
          <p v-if="!item.gender">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-nv"></use>
            </svg>
          </p>
        </li>
      </router-link>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, onMounted, watchEffect, ref } from "vue";
defineComponent({
  name: "SearchUser",
});
import $store from "../../../store/index";
import axios from "axios";
let keywords = ref<string>($store.state.keywords);
type User = {
  userId: number;
  nickname: string;
  avatarUrl: string;
  gender: number;
};
let Users = ref<User[]>([]);
onMounted(async () => {
  axios
    .get("http://localhost:3000/cloudsearch?", {
      params: {
        keywords: keywords.value,
        type: 1002,
        limit: 50,
      },
    })
    .then((response) => {
      Users.value = response.data.result.userprofiles;
    });
});
</script>
<style lang="less" scoped>
li {
  padding: 0.075rem 0 0.1rem 0.075rem;
  display: flex;
  flex-direction: row;
  position: relative;
  p {
    margin-top: 3%;
    margin-left: 0.1rem;
  }
}
.img {
  img {
    width: 0.75rem;
    border-radius: 50%;
    height: 0.75rem;
  }
}
li:hover {
  background-color: @myAbC;
}
.dark {
  background-color: @myAbC;
}
.account {
  display: block;
  max-height: 0.2rem;
  border-radius: 50%;
  position: absolute;
  right: 5%;
  top: 50%;
  background-color: #ec4b3e;
}
</style>
