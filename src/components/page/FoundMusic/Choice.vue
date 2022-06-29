<template>
  <div id="choice">
    <div class="all">
      <p>全部歌单</p>
    </div>
    <div class="categroies">
      <div>
        <span
          ><svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wangluo"></use></svg
          >语种</span
        >
        <ul>
          <li
            v-for="(item, index) in categroies[0]"
            :key="index"
            @click="sub(item.name)"
            :class="{ show: item.name == cat }"
          >
            <span>{{ item.name }}<sup v-show="item.hot">hot</sup></span>
          </li>
        </ul>
      </div>
      <div>
        <span
          ><svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gangqin"></use></svg
          >风格</span
        >
        <div>
          <ul>
            <li
              v-for="(item, index) in categroies[1]"
              :key="index"
              @click="sub(item.name)"
              :class="{ show: item.name == cat }"
            >
              <span>{{ item.name }}<sup v-show="item.hot">hot</sup></span>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <span
          ><svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-kafei"></use></svg
          >场景</span
        >
        <div>
          <ul>
            <li
              v-for="(item, index) in categroies[2]"
              :key="index"
              @click="sub(item.name)"
            >
              <span>{{ item.name }}<sup v-show="item.hot">hot</sup></span>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <span
          ><svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiaolian"></use></svg
          >情感</span
        >
        <div>
          <ul>
            <li
              v-for="(item, index) in categroies[3]"
              :key="index"
              @click="sub(item.name)"
              :class="{ show: item.name == cat }"
            >
              <span>{{ item.name }}<sup v-show="item.hot">hot</sup></span>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <span
          ><svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zhuti"></use></svg
          >主题</span
        >
        <div>
          <ul>
            <li
              v-for="(item, index) in categroies[4]"
              :key="index"
              @click="sub(item.name)"
              :class="{ show: item.name == cat }"
            >
              <span>{{ item.name }}<sup v-show="item.hot">hot</sup></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, inject, defineEmits, defineProps, Ref } from "vue";
defineComponent({
  name: "Choice",
});
let categroy: Ref = inject("cats")!;
let categroies: any[] = [];
for (let v of categroy.value.sub) {
  switch (v.category) {
    case 0:
      if (!categroies[0]) {
        categroies[0] = [];
        categroies[0].push(v);
      } else {
        categroies[0].push(v);
      }
      break;
    case 1:
      if (!categroies[1]) {
        categroies[1] = [];
        categroies[1].push(v);
      } else {
        categroies[1].push(v);
      }
      break;
    case 2:
      if (!categroies[2]) {
        categroies[2] = [];
        categroies[2].push(v);
      } else {
        categroies[2].push(v);
      }
      break;
    case 3:
      if (!categroies[3]) {
        categroies[3] = [];
        categroies[3].push(v);
      } else {
        categroies[3].push(v);
      }
      break;
    case 4:
      if (!categroies[4]) {
        categroies[4] = [];
        categroies[4].push(v);
      } else {
        categroies[4].push(v);
      }
      break;
  }
}
const emit = defineEmits(["sub"]);
function sub(category: string): void {
  emit("sub", category);
}
defineProps({ cat: String });
</script>
<style lang="less">
#choice {
  border-radius: 2%;
  width: 8.3rem;
  background-color: #fff;
  height: 5rem;
  .all {
    border-bottom: 1px @myLC solid;
    font-size: 18px;
    margin: 0.15rem 0 0 0;
    p {
      width: 2rem;
      margin-left: 0.2rem;
      margin-bottom: 0.15rem;
    }
  }
}
.categroies {
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    flex-direction: row;
    span {
      min-width: 1rem;
      font-size: 16px;
    }
    ul {
      flex-grow: 1;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .show {
        color: @myP;
        background-color: @myAbC;
      }
      li {
        margin: 0.1rem 0.1rem 0 0.1rem;
        font-size: 12px;
        border-radius: 20%;
        span {
          padding: 0.03rem 0.07rem;
          font-size: 14px;
          position: relative;
        }
        span:hover {
          cursor: default;
          color: @myP;
        }
        sup {
          position: absolute;
          top: -20%;
          font-size: 12px;
          transform: scale(0.83);
          right: -33%;
          color: @myP;
        }
      }
    }
  }
}
</style>
