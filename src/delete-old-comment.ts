import {deleteCommentOnWall} from "./vk.helpers";
import {storage} from "./storage";

let postIdsByDate: {[key: string]: number[]} = storage.get('postIdsByDate') || {};

let checkAndDeleteCommentI = -1;

Object.keys(postIdsByDate).forEach(postDate => {
  checkAndDeleteComment(postDate);
})

function checkAndDeleteComment(postDate: string) {
  const delta = new Date().valueOf() - new Date(postDate).valueOf();
  console.log(delta /(24 *60 * 60 * 1000));
  // посты более 2-3 дней удаляю
  if(delta > 3 * 24 * 60 * 60 * 1000) {
    checkAndDeleteCommentI++;
    setTimeout(() => {
      deleteComments(postIdsByDate[postDate]).then(() => {
        delete postIdsByDate[postDate];
        storage.set('postIdsByDate', postIdsByDate);
        console.log('this dates comments have deleted');
      })
    }, 48111 * checkAndDeleteCommentI);
  }
}

async function deleteComments(commentIds: number[]) {
  for (var i = 0; i < commentIds.length; i++) {
    try {
      await deleteCommentOnWall(commentIds[i]);
      await delay(300);
    } catch (e) {
      await delay(300);
    }
  }
}

const delay = ms => new Promise(res => setTimeout(res, ms));


