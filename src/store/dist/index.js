"use strict";
exports.__esModule = true;
var vuex_1 = require("vuex");
var mode;
(function (mode) {
    mode[mode["\u987A\u5E8F"] = 0] = "\u987A\u5E8F";
    mode[mode["\u5355\u66F2"] = 1] = "\u5355\u66F2";
    mode[mode["\u968F\u673A"] = 2] = "\u968F\u673A";
})(mode || (mode = {}));
exports["default"] = vuex_1.createStore({
    state: {
        update: {
            singerHeight: 0,
            artHeight: 0,
            topHeight: 0,
            outHeight: 0
        },
        keywords: "海阔天空",
        //profile userId  nickname avatarUrl
        profile: {
            status: false,
            userId: "",
            nickname: "",
            avatarUrl: ""
        },
        isPlay: false,
        AudioPlay: {
            audioes: [33894312],
            pointer: 0,
            mode: mode[0],
            play: true,
            dur: 0
        },
        history: {
            collection: [],
            index: 0
        }
    },
    mutations: {
        change: function (state, value) {
            state.update = value;
        },
        changeKeyword: function (state, value) {
            state.keywords = value;
        },
        login: function (state, value) {
            state.profile.status = true;
            state.profile.userId = value.userId;
            state.profile.nickname = value.nickname;
            state.profile.avatarUrl = value.avatarUrl;
        },
        logout: function (state) {
            state.profile.status = false;
        },
        MvPlay: function (state, value) {
            state.isPlay = value;
        },
        //添加单曲 参数 歌曲id
        AudioPush: function (state, value) {
            var pointer = state.AudioPlay.pointer;
            if (!state.AudioPlay.audioes.some(function (item) { return item == value; })) {
                state.AudioPlay.audioes.splice(pointer, 0, value);
                state.AudioPlay.pointer++;
            }
        },
        changeMode: function (state, value) {
            state.AudioPlay.mode = mode[value];
        },
        changePointer: function (state, value) {
            if (value > state.AudioPlay.audioes.length - 1) {
                value = 0;
            }
            else if (value < 0) {
                value = state.AudioPlay.audioes.length - 1;
            }
            state.AudioPlay.pointer = value;
        },
        Play: function (state, value) {
            state.AudioPlay.play = value;
        },
        changeDur: function (state, value) {
            state.AudioPlay.dur = value;
        },
        push: function (state, id) {
            state.history.collection.push(id);
            state.history.index++;
        },
        back: function (state) {
            state.history.index--;
        }
    },
    actions: {},
    modules: {}
});
