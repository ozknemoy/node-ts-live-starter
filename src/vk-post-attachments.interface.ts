
export interface Video {
  id: number;
  owner_id: number;
  title: string;
  duration: number;
  description: string;
  date: number;
  comments: number;
  views: number;
  photo_130: string;
  photo_320: string;
  photo_800: string;
  photo_640: string;
  is_favorite: boolean;
  access_key: string;
  platform: string;
  can_add: number;
}

export interface Photo {
  id: number;
  album_id: number;
  owner_id: number;
  photo_75: string;
  photo_130: string;
  photo_604: string;
  photo_807: string;
  photo_1280: string;
  width: number;
  height: number;
  text: string;
  date: number;
  post_id: number;
  access_key: string;
}

export interface Link {
  url: string;
  title: string;
  description: string;
  target: string;
  image_src: string;
  image_big: string;
}