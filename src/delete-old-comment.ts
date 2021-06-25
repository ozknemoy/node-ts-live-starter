import {deleteCommentOnWall} from "./vk.helpers";
import {storage} from "./storage";

let postIdsByDate: {[key: string]: number[]} = storage.get('postIdsByDate') || {};
let needToUpdateFile = false;

for(let postDate in postIdsByDate) {
  const delta = new Date().valueOf() - new Date(postDate).valueOf();
  console.log(delta /(24 *60 * 60 * 1000));
  // посты более 2-3 дней удаляю
  if(delta > 3 * 24 * 60 * 60 * 1000) {
    needToUpdateFile = true
    console.log('more than 3 days');
    postIdsByDate[postDate].forEach(commentId => deleteCommentOnWall(commentId));
    //postIdsByDate[postDate].forEach(commentId => console.log);
    delete postIdsByDate[postDate];
  }
}
console.log(postIdsByDate);
if(needToUpdateFile) {
  storage.set('postIdsByDate', postIdsByDate)
}



