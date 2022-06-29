import { createStore } from "vuex";
import axios from "axios";
enum mode {
  "顺序",
  "单曲",
  "随机",
}
export default createStore({
  state: {
    update: {
      singerHeight: 0,
      artHeight: 0,
      topHeight: 0,
      outHeight: 0,
    },
    keywords: "海阔天空",
    //profile userId  nickname avatarUrl
    profile: {
      status: false,
      userId: "",
      nickname: "",
      avatarUrl: "",
    },
    isPlay: false,
    AudioPlay: {
      audioes: [33894312],
      pointer: 0,
      mode: mode[0],
      play: true,
      dur:0
    },
    history:{
      collection:[] as number[],
      index:0,
    }
  },
  mutations: {
    change(state, value) {
      state.update = value;
    },
    changeKeyword(state, value) {
      state.keywords = value;
    },
    login(state, value) {
      state.profile.status = true;
      state.profile.userId = value.userId;
      state.profile.nickname = value.nickname;
      state.profile.avatarUrl = value.avatarUrl;
    },
    logout(state) {
      state.profile.status = false;
    },
    MvPlay(state, value: boolean) {
      state.isPlay = value;
    },
    //添加单曲 参数 歌曲id
    AudioPush(state, value: number) {
      let pointer = state.AudioPlay.pointer;
      if(!state.AudioPlay.audioes.some(item=>{return item==value})){
        state.AudioPlay.audioes.splice(pointer, 0, value);
        state.AudioPlay.pointer++;
      } 
      
    },
    changeMode(state, value: number) {
      state.AudioPlay.mode = mode[value];
    },
    changePointer(state, value: number) {
      if(value>state.AudioPlay.audioes.length-1){
        value=0
      }else if(value<0){
        value=state.AudioPlay.audioes.length-1
      }
      state.AudioPlay.pointer = value;
    },
    Play(state, value: boolean) {
      state.AudioPlay.play = value;
    },
    changeDur(state,value:number){
      state.AudioPlay.dur = value;
    },
    push(state,id:number){
      state.history.collection.push(id) ;
      state.history.index++
    },
    back(state){
      state.history.index--
    }
  },
  actions: {
  },
  modules: {},
});
