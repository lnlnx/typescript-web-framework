import { Eventing } from './Eventing';
import { Model } from './Model';
import { Attributes } from './Attributes';
import { ApiSync } from './Sync';
import { Collection } from './Collection';

export interface UserProp {
  id?: number;
  age?: number;
  name?: string;
}

export const RootUrl = 'http://localhost:3000/users';

export class User extends Model<UserProp> {
  static build(attrs: UserProp): User {
    return new User(
      new Eventing(),
      new Attributes<UserProp>(attrs),
      new ApiSync<UserProp>(RootUrl)
    );
  }

  static buildCollections(): Collection<User, UserProp> {
    return new Collection<User, UserProp>(
      RootUrl,
      (json: UserProp): User => User.build(json)
    );
  }

  setRandomAge(): void {
    const age = Math.round(Math.random() * 100);
    this.set({ age });
  }
}
