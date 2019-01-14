import {Link, Photo, Video} from "./vk-post-attachments.interface";
import {IVKError} from "./vk-error";
import {IOnePostCommon, IOnePostCopy} from "./vk-post-copy.interface";

const user = {
  "response": {
    "count": 4167,
    "items": [{
      "id": 1391050,
      "from_id": 129244038,
      "owner_id": 129244038,
      "date": 1545390150,
      "post_type": "post",
      "text": "Координатору ",
      "is_pinned": 1,
      "attachments": [{
        "type": "video",
        "video": {
          "id": 456239286,
          "owner_id": 129244038,
          "title": "9889;65039;Арестовали банковские счета",
          "duration": 113,
          "description": "Неделю ",
          "date": 1545390147,
          "comments": 0,
          "views": 1206,
          "photo_130": "pp.userapef5/ps01NVGSiiM.jpg",
          "photo_320": "pp.userapef7/Lhcpi27YwAY.jpg",
          "photo_800": "pp.userapef8/8Oz-4BlL4sI.jpg",
          "photo_640": "pp.userapef8/8Oz-4BlL4sI.jpg",
          "is_favorite": false,
          "access_key": "d862285d4856f5cea0",
          "platform": "YouTube",
          "can_add": 0
        }
      }],
      "post_source": {
        "type": "vk"
      },
      "comments": {
        "count": 1084,
        "can_post": 1,
        "groups_can_post": true
      },
      "likes": {
        "count": 1367,
        "user_likes": 0,
        "can_like": 1,
        "can_publish": 1
      },
      "reposts": {
        "count": 95,
        "user_reposted": 0
      },
      "views": {
        "count": 63201
      },
      "is_favorite": false
    }],
    "profiles": [],
    "groups": []
  }
};



export interface Attachment {
  type: 'video' | 'photo' | 'link';
  video?: Video | Photo | Link;
}

export interface PostSource {
  type: string;
}

export interface Comments {
  count: number;
  can_post: number;
  groups_can_post: boolean;
}

export interface Likes {
  count: number;
  user_likes: number;
  can_like: number;
  can_publish: number;
}

export interface Reposts {
  count: number;
  user_reposted: number;
}

export interface Views {
  count: number;
}

export interface IOnePost extends IOnePostCommon {
  owner_id: number;
  is_pinned: number;
  attachments: Attachment[];
  post_source: PostSource;
  views: Views;
  is_favorite: boolean;
}

export interface IVKPostResponse extends IVKError {
  response: {
    count: number;
    items: (IOnePost | IOnePostCopy)[];
    profiles?: any[];
    groups?: any[];
  }
}

export function isCopyPost(post: IOnePost | IOnePostCopy): post is IOnePostCopy {
  return !!post['copy_history'];
}