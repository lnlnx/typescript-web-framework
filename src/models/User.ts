import { Eventing } from './Eventing';
import { Model } from './Model';
import { Attributes } from './Attributes';
import { ApiSync } from './Sync';

export interface UserProp {
  id?: number;
  age?: number;
  name?: string;
}

const RootUrl = 'http://localhost:3000/users';

export class User extends Model<UserProp> {
  static build(attrs: UserProp): User {
    return new User(
      new Eventing(),
      new Attributes<UserProp>(attrs),
      new ApiSync<UserProp>(RootUrl)
    );
  }
}
