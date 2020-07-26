import { Eventing } from './Eventing';

export interface UserProp {
  id?: number;
  age?: number;
  name?: string;
}

export class User {
  events: Eventing = new Eventing();

  constructor(private data: UserProp) {}

  get(propName: string): number | string {
    return this.data[propName];
  }

  set(update: UserProp): void {
    Object.assign(this.data, update);
  }
}
