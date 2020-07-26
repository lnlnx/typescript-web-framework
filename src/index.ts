import { User } from './models/User';
import { UserForm } from './views/UserForm';

const user = User.build({ age: 23, name: 'some name' });

const rootElement = document.getElementById('root');
if (rootElement) {
  const userElement = new UserForm(rootElement, user);
  userElement.render();
}
