import {
  getUrlWithOffset,
  getVKUrl,
  nemoyServiceToken,
  permServiceToken,
  shuffle,
  yServiceToken,
  yToken
} from "./vk.helpers";
import {IUserFromGroup, ISerFromGroupRoot} from "./user-from-group";
import {isVkError} from "./vk-error";
import {IVKPostResponse} from "./vk-post-user.interface";

let success = 0;
let fail = 0;

const request = require('request-promise');
letsDoIt();
function letsDoIt() {
  request(getUrlWithOffset('groups.getMembers?group_id=196882515', yServiceToken, 0, 500))
    .then(d => JSON.parse(d))
    .then(d => !isVkError(d) ? d.response : Promise.reject(d.error))
    .then(async (d: IUserFromGroup) => {
      const ids = shuffle(d.items).slice(0,30);

      ids.forEach((id, i) => setTimeout(() => {
        console.log(new Date());
        likeLastPostOnWall(id);
        success++;
        if(ids.length === i + 1) {
          console.log('провалов: ' + Math.round(100 * fail/(fail + success)));
          console.log('---------------------------------- end ------------------------------------------');
        }
      }, 8374 * i));

    })

    .catch((e) => console.log(e))
}


const likeLastPostOnWall = async (owner_id: number) => {
  const postId = await getFirstPostIdFromWall(owner_id);
  if(!postId) return;
  return doLike(owner_id, postId)
}

function doLike(owner_id: number, postId: number) {
  const url = getVKUrl(`likes.add?owner_id=${owner_id}&item_id=${postId}&type=post`, yToken);
  return request(url).then(d => JSON.parse(d))
    .then(d => !isVkError(d) ? d.response : Promise.reject(d.error))
    /*.then(async (d: IVKPostResponse['response']) => {
      console.log(d);
    })*/
    .catch((e) => {
      console.log(e.error_msg);
      if(e.error_msg === 'Captcha needed') {
        console.log('======================================================>', e.captcha_img, e.captcha_sid, e);
      }
      return null
    });
}


function getFirstPostIdFromWall(owner_id: number) {
  const url = getUrlWithOffset(`wall.get?owner_id=${owner_id}&filter=owner`, yToken, 0, 1);
  return request(url).then(d => JSON.parse(d))
    .then(d => !isVkError(d) ? d.response : Promise.reject(d.error))
    .then(async (d: IVKPostResponse['response']) => {
      return d.items && d.items[0] ? d.items[0].id : null
    })
    .catch((e) => {
      fail++;
      console.log(e.error_msg);
      return null
    });
}

//[ 42196798, 155644421, 451871732, 28733854, 2508981 ]

function testPostIdFromWall(owner_id: number) {
  const url = getUrlWithOffset(`wall.get?owner_id=${owner_id}&filter=owner`, yToken, 0, 5);
  return request(url).then(d => JSON.parse(d))
    .then(d => !isVkError(d) ? d.response : Promise.reject(d.error))
    .then(async (d: IVKPostResponse['response']) => {
      console.log(d.items.sort((a, b) => b.date - a.date)[0]);
      //doLike(owner_id, d.items[0].id)
    })
    .catch((e) => {
      console.log(e.error_msg);
      return null
    });
}
//testPostIdFromWall(42196798)
