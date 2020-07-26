import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';
import { AxiosResponse } from 'axios';

export interface UserProp {
  id?: number;
  age?: number;
  name?: string;
}

const RootUrl = 'http://localhost:3000/users';

export class User {
  private events: Eventing = new Eventing();
  private sync: Sync<UserProp> = new Sync<UserProp>(RootUrl);
  private attributes: Attributes<UserProp>;

  constructor(data: UserProp) {
    this.attributes = new Attributes<UserProp>(data);
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(data: UserProp): void {
    this.attributes.set(data);
    this.events.trigger('changed');
  }

  fetch() {
    const id = this.get('id');

    if (typeof id !== 'number') {
      throw new Error('Must provide user id!');
    }
    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }

  save() {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.set(response.data);
        this.trigger('saved');
      })
      .catch(() => {
        this.trigger('error');
      });
  }
}
