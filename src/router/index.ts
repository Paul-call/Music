import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
//横导航栏--------------------------------
import FoundMusic from "@/components/page/FoundMusic/FoundMusic.vue";
import TopList from "@/components/page/FoundMusic/TopList.vue";
import Recommend from "@/components/page/FoundMusic/Recommend.vue";
import SongList from "@/components/page/FoundMusic/SongList.vue";
import Singer from "@/components/page/FoundMusic/Singer.vue";
//纵导航栏--------------------------------
import Blog from "@/components/page/nav/Blog.vue";
import MV from "@/components/page/nav/MV.vue";
//歌单-------
import Song from "@/components/page/songs/Song.vue";
import Collecter from "@/components/page/songs/Collecter.vue";
import Songs from "@/components/page/songs/Songs.vue";
import Commits from "@/components/page/songs/Commits.vue";
//Mv--------------------------------
import TopMv from "@/components/page/nav/TopMv.vue";
import AllMv from "@/components/page/nav/AllMv.vue";
//歌手--------------------------------
import Artist from "@/components/page/art/Artist.vue";
import ArtistSongs from "@/components/page/art/ArtistSongs.vue";
import ArtistMv from "@/components/page/art/ArtistMv.vue";
import ArtistDetail from "@/components/page/art/ArtistDetail.vue";
//用户-------------
import Users from "@/components/page/Users.vue";
//搜索-------------
import SearchAr from "@/components/page/search/SearchAr.vue";
import Search from "@/components/page/search/Search.vue";
import SearchMv from "@/components/page/search/SearchMv.vue";
import SearchSong from "@/components/page/search/SearchSong.vue";
import SearchSonglist from "@/components/page/search/SearchSonglist.vue";
import SearchUser from "@/components/page/search/SearchUser.vue";
//other----------------------
import Order from "@/components/page/others/order.vue";
import New from "@/components/page/others/new.vue";
import Private from "@/components/page/others/private.vue";
import star from "@/components/page/others/star.vue";
//播放-------------------
import MvPlay from "@/components/page/MvPlay.vue";
import VideoPlay from "@/components/page/VideoPlay.vue"
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: FoundMusic,
    redirect: "/recommend",
    children: [
      {
        path: "/recommend",
        component: Recommend,
      },
      {
        path: "/songlist",
        component: SongList,
      },
      {
        path: "/toplist",
        component: TopList,
      },
      {
        path: "/singer",
        component: Singer,
      },
      {
        path: "/order",
        component: Order,
      },
      {
        path: "/new",
        component: New,
      },
    ],
  },
  {
    path: "/songlist",
    component: SongList,
  },
  {
    path: "/blog",
    component: Blog,
  },
  {
    path: "/mv",
    component: MV,
  },
  {
    path: "/topMv",
    component: TopMv,
  },
  {
    path: "/allMv",
    component: AllMv,
  },
  {
    path: "/song",
    component: Song,
    redirect: "/songs",
    children: [
      {
        path: "/songs",
        component: Songs,
      },
      {
        path: "/collecter",
        component: Collecter,
      },
      {
        path: "/commits",
        component: Commits,
      },
    ],
  },
  {
    path: "/private",
    component: Private,
  },
  {
    path: "/star",
    component: star,
  },
  {
    path: "/artist",
    component: Artist,
    redirect: "/artistSongs",
    children: [
      {
        path: "/artistSongs",
        component: ArtistSongs,
      },
      {
        path: "/artistMv",
        component: ArtistMv,
      },
      {
        path: "/artistDetail",
        component: ArtistDetail,
      },
    ],
  },
  {
    path: "/users",
    component: Users,
  },
  {
    path: "/search",
    component: Search,
    redirect: "/searchsong",
    children: [
      {
        path: "/searchsong",
        component: SearchSong,
      },
      {
        path: "/searchsonglist",
        component: SearchSonglist,
      },
      {
        path: "/searchar",
        component: SearchAr,
      },
      {
        path: "/searchuser",
        component: SearchUser,
      },
      {
        path: "/searchmv",
        component: SearchMv,
      },
    ],
  },
  {
    path: "/mvplay",
    component: MvPlay,
  },{
    path:"/videoplay",
    component:VideoPlay
  }
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
