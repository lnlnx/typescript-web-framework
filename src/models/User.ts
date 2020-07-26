import { Eventing } from './Eventing';
import { Sync } from './Sync';

export interface UserProp {
  id?: number;
  age?: number;
  name?: string;
}

const RootUrl = 'http://localhost:3000/users';

export class User {
  events: Eventing = new Eventing();
  sync: Sync<UserProp> = new Sync<UserProp>(RootUrl);

  constructor(private data: UserProp) {}

  get(propName: string): number | string {
    return this.data[propName];
  }

  set(update: UserProp): void {
    Object.assign(this.data, update);
  }
}
