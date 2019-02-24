
export interface Profile {
  aid: number;
  id: number;
  name: string;
  age: number;
  gender: string;
  login: string;
  state: string;
}

export interface Userpic {
  id: number;
  aid: number;
  square: string;
  squareLarge: string;
  squareSmall: string;
  huge: string;
  medium: string;
  small: string;
  smallWithFace: string;
}

export interface PhotoCounters {
  total: number;
  adult: number;
}

export interface Real {
  isOn: boolean;
  name: string;
  statusCode: number;
  text: string;
  url: string;
}

export interface GeoCoords {
  isOn: boolean;
  name: string;
  statusCode: number;
  text: string;
  url: string;
}

export interface AnketaStatuses {
  real: Real;
  geoCoords: GeoCoords;
}

export interface OneList {
  profile: Profile;
  userpic: Userpic;
  photoCounters: PhotoCounters;
  aid: number;
  name: string;
  login: string;
  gender: string;
  selfAge: number;
  photo: string;
  location: string;
  lookFor: string;
  lookForAge: string;
  isOnline: boolean;
  onlineStatusText: string;
  isIntim: boolean;
  anketaStatuses: AnketaStatuses;
  theme: string;
  noid: number;
  nchanged: number;
  nactive: number;
  hitId: number;
}



export interface Request {
  myGender: string;
  lookFor: string;
  ageFrom: number;
  ageTo: number;
  country: number;
  region: number;
  city: number;
  metro: number;
  target: any[];
  sign: any[];
  whoAreNear: boolean;
  withPhoto: boolean;
  withCompatibleSign: boolean;
  periodType: string;
  period: string;
  replyRate: number;
  marital: any[];
  children: any[];
  weightFrom: number;
  weightTo: number;
  weightUnit: string;
  heightFrom: number;
  heightTo: number;
  heightUnit: string;
  education: any[];
  constitution: any[];
  orientation: any[];
  race: any[];
  lang: any[];
  smoke: any[];
  drink: any[];
  circumstance: any[];
  home: any[];
  limit: number;
  offset: number;
  navChanged: number;
  navOid: number;
  navActive: number;
  isExtended: boolean;
  isRestored: boolean;
  location: string;
  statusNames?: any;
  requestSearchSource: number;
}

export interface SearchRequest {
  request: Request;
  items: OneList;
  paging: {
    total: number,
    limit: number,
    offset: number
  },
  "needPayForSearch": false
}