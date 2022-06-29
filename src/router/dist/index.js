"use strict";
exports.__esModule = true;
var vue_router_1 = require("vue-router");
//横导航栏--------------------------------
var FoundMusic_vue_1 = require("@/components/page/FoundMusic/FoundMusic.vue");
var TopList_vue_1 = require("@/components/page/FoundMusic/TopList.vue");
var Recommend_vue_1 = require("@/components/page/FoundMusic/Recommend.vue");
var SongList_vue_1 = require("@/components/page/FoundMusic/SongList.vue");
var Singer_vue_1 = require("@/components/page/FoundMusic/Singer.vue");
//纵导航栏--------------------------------
var Blog_vue_1 = require("@/components/page/nav/Blog.vue");
var MV_vue_1 = require("@/components/page/nav/MV.vue");
//歌单-------
var Song_vue_1 = require("@/components/page/songs/Song.vue");
var Collecter_vue_1 = require("@/components/page/songs/Collecter.vue");
var Songs_vue_1 = require("@/components/page/songs/Songs.vue");
var Commits_vue_1 = require("@/components/page/songs/Commits.vue");
//Mv--------------------------------
var TopMv_vue_1 = require("@/components/page/nav/TopMv.vue");
var AllMv_vue_1 = require("@/components/page/nav/AllMv.vue");
//歌手--------------------------------
var Artist_vue_1 = require("@/components/page/art/Artist.vue");
var ArtistSongs_vue_1 = require("@/components/page/art/ArtistSongs.vue");
var ArtistMv_vue_1 = require("@/components/page/art/ArtistMv.vue");
var ArtistDetail_vue_1 = require("@/components/page/art/ArtistDetail.vue");
//用户-------------
var Users_vue_1 = require("@/components/page/Users.vue");
//搜索-------------
var SearchAr_vue_1 = require("@/components/page/search/SearchAr.vue");
var Search_vue_1 = require("@/components/page/search/Search.vue");
var SearchMv_vue_1 = require("@/components/page/search/SearchMv.vue");
var SearchSong_vue_1 = require("@/components/page/search/SearchSong.vue");
var SearchSonglist_vue_1 = require("@/components/page/search/SearchSonglist.vue");
var SearchUser_vue_1 = require("@/components/page/search/SearchUser.vue");
//other----------------------
var order_vue_1 = require("@/components/page/others/order.vue");
var new_vue_1 = require("@/components/page/others/new.vue");
var private_vue_1 = require("@/components/page/others/private.vue");
var star_vue_1 = require("@/components/page/others/star.vue");
//播放-------------------
var MvPlay_vue_1 = require("@/components/page/MvPlay.vue");
var VideoPlay_vue_1 = require("@/components/page/VideoPlay.vue");
var routes = [
    {
        path: "/",
        component: FoundMusic_vue_1["default"],
        redirect: "/recommend",
        children: [
            {
                path: "/recommend",
                component: Recommend_vue_1["default"]
            },
            {
                path: "/songlist",
                component: SongList_vue_1["default"]
            },
            {
                path: "/toplist",
                component: TopList_vue_1["default"]
            },
            {
                path: "/singer",
                component: Singer_vue_1["default"]
            },
            {
                path: "/order",
                component: order_vue_1["default"]
            },
            {
                path: "/new",
                component: new_vue_1["default"]
            },
        ]
    },
    {
        path: "/songlist",
        component: SongList_vue_1["default"]
    },
    {
        path: "/blog",
        component: Blog_vue_1["default"]
    },
    {
        path: "/mv",
        component: MV_vue_1["default"]
    },
    {
        path: "/topMv",
        component: TopMv_vue_1["default"]
    },
    {
        path: "/allMv",
        component: AllMv_vue_1["default"]
    },
    {
        path: "/song",
        component: Song_vue_1["default"],
        redirect: "/songs",
        children: [
            {
                path: "/songs",
                component: Songs_vue_1["default"]
            },
            {
                path: "/collecter",
                component: Collecter_vue_1["default"]
            },
            {
                path: "/commits",
                component: Commits_vue_1["default"]
            },
        ]
    },
    {
        path: "/private",
        component: private_vue_1["default"]
    },
    {
        path: "/star",
        component: star_vue_1["default"]
    },
    {
        path: "/artist",
        component: Artist_vue_1["default"],
        redirect: "/artistSongs",
        children: [
            {
                path: "/artistSongs",
                component: ArtistSongs_vue_1["default"]
            },
            {
                path: "/artistMv",
                component: ArtistMv_vue_1["default"]
            },
            {
                path: "/artistDetail",
                component: ArtistDetail_vue_1["default"]
            },
        ]
    },
    {
        path: "/users",
        component: Users_vue_1["default"]
    },
    {
        path: "/search",
        component: Search_vue_1["default"],
        redirect: "/searchsong",
        children: [
            {
                path: "/searchsong",
                component: SearchSong_vue_1["default"]
            },
            {
                path: "/searchsonglist",
                component: SearchSonglist_vue_1["default"]
            },
            {
                path: "/searchar",
                component: SearchAr_vue_1["default"]
            },
            {
                path: "/searchuser",
                component: SearchUser_vue_1["default"]
            },
            {
                path: "/searchmv",
                component: SearchMv_vue_1["default"]
            },
        ]
    },
    {
        path: "/mvplay",
        component: MvPlay_vue_1["default"]
    }, {
        path: "/videoplay",
        component: VideoPlay_vue_1["default"]
    }
];
var router = vue_router_1.createRouter({
    history: vue_router_1.createWebHistory(process.env.BASE_URL),
    routes: routes
});
exports["default"] = router;
