import { User, UserProp } from '../models/User';
import { View } from './View';

export class UserDetail extends View<User, UserProp> {
  template(): string {
    return `
      <div>
        <h1>User Detail</h1>
        <div>User name: ${this.model.get('name')}</div>
        <div>User age: ${this.model.get('age')}</div>
      </div>
    `;
  }
}
