import { User } from './models/User';
import { UserForm } from './views/UserForm';

const rootElement = document.getElementById('root');
if (rootElement) {
  const userElement = new UserForm(rootElement);
  userElement.render();
}
