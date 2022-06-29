import { createApp } from 'vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/Rem"
import ElementPlus from 'element-plus'
import axios from "axios"
import "./assets/global.less"
import "./assets/font/iconfont.js"
createApp(App).use(store).use(router).use(ElementPlus, { size: 'medium', zIndex: 3000 }).mount('#app')
