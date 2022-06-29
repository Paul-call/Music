import { reactive } from "vue";
class Data {
  name: string;
  show: boolean;
  params: number | string;
  constructor(name: string, show: boolean, params: number | string) {
    this.name = name;
    this.show = show;
    this.params = params;
  }
}
// tslint:disable-next-line: max-line-length
const area: Data[] = reactive([
  new Data("全部", true, -1),
  new Data("华语", false, 7),
  new Data("欧美", false, 96),
  new Data("日本", false, 8),
  new Data("韩国", false, 16),
  new Data("其他", false, 0),
]);
// tslint:disable-next-line: max-line-length
const type: Data[] = reactive([
  new Data("全部", true, -1),
  new Data("男歌手", false, 1),
  new Data("女歌手", false, 2),
  new Data("乐队组合", false, 3),
]);
const word = " ABCDEFGHIJKLMNOPQRSTUVWXYZ#";
const initial = reactive(
  ((): Data[] => {
    let result: Data[] = [];
    for (let i = 0; i <= 27; i++) {
      if (i == 0) {
        result.push(new Data("热门", true, -1));
      } else if (i == 27) {
        result.push(new Data(word[i], false,0));
      } else {
        result.push(new Data(word[i], false, word[i].toLowerCase()));
      }
    }
    return result;
  })()
);

export { Data, area, type, initial };
