
export interface City {
  id: number;
  title: string;
}

export interface Country {
  id: number;
  title: string;
}

export class IVkUser {

  constructor(newEntity) {
    if (newEntity) {
      Object.assign(this, newEntity);
    }
  }

  first_name: string;
  id: number;
  last_name: string;
  can_access_closed: boolean;
  is_closed: boolean;
  sex: number;
  nickname: string;
  bdate: string;
  city: City;
  country: Country;
  followers_count: number;

  get isWoman() {
    return this.sex === 1
  }

  get isMan() {
    return this.sex === 2
  }
}
