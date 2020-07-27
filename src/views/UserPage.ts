import { User, UserProp } from '../models/User';
import { View } from './View';
import { UserForm } from './UserForm';
import { UserDetail } from './UserDetail';

export class Userpage extends View<User, UserProp> {
  regionMap(): { [key: string]: string } {
    return {
      userDetail: '.user-detail',
      userForm: '.user-form',
    };
  }

  onRender(): void {
    new UserForm(this.regions.userForm, this.model).render();
    new UserDetail(this.regions.userDetail, this.model).render();
  }

  template(): string {
    return `
      <div>
        <div class='user-detail'></div>
        <div class='user-form'></div>
      </div>
    `;
  }
}
