import { User, UserProp } from '../models/User';
import { View } from './View';

export class UserForm extends View<User, UserProp> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
      'click:.save': this.onSaveClick,
    };
  }

  template(): string {
    return `
      <div>
        <input placeholder='${this.model.get('name')}'/>
        <button class='set-name'>Set Name</button>
        <button class='set-age'>Set Random Age</button>
        <button class='save'>Save user</button>
      </div>
    `;
  }

  onSaveClick = (): void => {
    this.model.save();
  };

  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input');
    if (input) {
      const name = input.value;
      this.model.set({ name });
    }
  };

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };
}
