import {Attachment, Comments, Likes, PostSource, Reposts} from "./vk-post-user.interface";

export interface CopyHistory extends IOnePostCore{
  owner_id: number;
  attachments: Attachment[];
  post_source: PostSource;
}

export interface IOnePostCopy extends IOnePostCommon {
  to_id: number;
  copy_history: CopyHistory[];
}

export interface IOnePostCommon extends IOnePostCore {
  comments: Comments;
  reposts: Reposts;
  likes: Likes;
}
export interface IOnePostCore {
  id: number;
  from_id: number;
  date: number;
  post_type: string;
  text: string;
}