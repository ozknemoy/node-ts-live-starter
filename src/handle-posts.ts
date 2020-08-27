import {getUrlWithOffset, getVKUrl, urlRegexp, writeHtmlFile} from "./vk.helpers";
import {isCopyPost, IVKPostResponse} from "./vk-post-user.interface";
import {IOnePostCopy} from "./vk-post-copy.interface";
import {IOnePost} from "./vk-post-group.interface";
const request = require('request-promise');
const url = getUrlWithOffset('wall.get?owner_id=129244038');


Promise.all(
  new Array(1).fill(1)
    .map((ret, i) =>
      request(getUrlWithOffset('wall.get?owner_id=129244038', i, 100))
        .then(d => JSON.parse(d).response.items)
    )
).then(resp =>  [].concat(...resp))
.then((posts: (IOnePost | IOnePostCopy)[]) => {
  /*const body: IVKPostResponse = JSON.parse(_body);
  if(body.error) {
    return console.error(body.error.error_msg)
  }*/
  let reposts = [];
  let likes = [];
  let comments = [];
  let text = [];
  posts.map(post=> {
    if(isCopyPost(post)) {
      //post.copy_history

    } else {

    }
    reposts.push(post.reposts.count);
    likes.push(post.likes.count);
    comments.push(post.comments.count);
    text.push(post.text);
  });

  //makeGraphWithMessage(reposts, 'reposts', body.response.items);
  makeGraph(likes, 'likes'/*, body.response.items*/);
  ////makeGraph(comments, 'comments');
  makeTable([likes, comments, reposts /*, text*/],[ 'likes', 'comments', 'reposts'/*, 'text'*/])
});

const maxSigns = 30;
function makeGraph(arr: number[], name: string) {
  const max = arr.reduce((prev, current) => Math.max(prev, current), 0);
  const k = max / maxSigns;
  let graph =  `\n---------------${name}(${max})---------------------- \n`;
  arr.forEach(num => {
    graph += makePlusLine(num / k) + '\n'
  });
  //console.log(graph);
  return graph
}


function makeGraphWithMessage(arr: number[], name: string, posts: (IOnePost | IOnePostCopy)[]) {
  const max = arr.reduce((prev, current) => Math.max(prev, current), 0);
  const k = max / maxSigns;
  let graph =  `\n---------------${name}(${max})---------------------- `;
  arr.forEach((num, i) => {
    graph += '\n' + makePlusLine(num / k);
    if(num > (max/2)) {
      let text = posts[i].text
        .replace('\n\n', ' ')
        .replace(urlRegexp, ' ');
      graph += text
    }
  });
  //console.log(graph)
  writeHtmlFile(graph)
}

function makePlusLine(n) {
  let a = new Array(Math.round(n));
  a.fill('+');
  return a.join('');
}


function makeTable(arr: (number | string)[][], headers: string[]) {
  const tbl = `<table><tr>${headers.map(h=> `<th>${h}</th>`).join('')}</tr>`;
  let tblBody = '<tr>';
  arr.forEach((v, i) => {
    tblBody += `<th>${typeof v[0] ==='number' ? makeGraph(<number[]>v, headers[i]) : v.slice(0, 300)}</th>`
  });
  const body = tbl + tblBody + '</tr></table>';
  writeHtmlFile(body)
}














