<template>
  <div id="main">
    <Top></Top>
    <Navigator></Navigator>
    <Audioplay></Audioplay>
  </div>
</template>
<script setup lang="ts">
import Top from "./components/basics/Top.vue";
import "../node_modules/element-plus/theme-chalk/index.css";
import Navigator from "./components/basics/Navigator.vue";
import Audioplay from "./components/basics/Audioplay.vue";
import AudioplayMax from "./components/basics/AudioplayMax.vue";
import { useRouter } from "vue-router";
import { defineComponent, onMounted } from "vue";
defineComponent({
  name: "App",
  components: {
    Top,
    Navigator,
    Audioplay,
    AudioplayMax,
  },
});
onMounted(() => {
  const router = useRouter();
  router.push({ path: "/recommend" });
});
</script>
<style lang="less">
@import "./assets/format.less";
#main {
  max-width: 11.4rem;
  overflow-x: hidden;
  :-webkit-scrollbar {
    width: 0 !important;
  }
  :-webkit-scrollbar {
    display: none;
  }
}
a:hover {
  text-decoration: none;
  color: @myZC;
}
div::-webkit-scrollbar {
  display: none;
}
ul::-webkit-scrollbar {
  display: none;
}
body::-webkit-scrollbar {
  display: none;
}
</style>
