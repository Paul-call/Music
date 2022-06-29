import axios from "axios"
//封装数据请求函数
async function getData(audio:any,id:any) {
    await axios
      .get("http://localhost:3000/song/detail", { params: { ids: id.value } })
      .then((response) => {
        audio.value.id = response.data.songs[0].id;
        audio.value.name = response.data.songs[0].name;
        audio.value.ar = response.data.songs[0].ar;
        audio.value.al = response.data.songs[0].al;
        audio.value.publishTime = response.data.songs[0].publishTime;
      });
    await axios
      .get("http://localhost:3000/song/url", { params: { id: id.value } })
      .then((response) => {
        audio.value.url = response.data.data[0].url;
      });
    await axios
      .get("http://localhost:3000/song/url", { params: { id: id.value } })
      .then((response) => {
        audio.value.url = response.data.data[0].url;
      });
    await axios
      .get("http://localhost:3000/lyric", { params: { id: id.value } })
      .then((response) => {
        audio.value.lyric = response.data.lrc;
      });
  }
  export {getData}