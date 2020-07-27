import { User, RootUrl, UserProp } from './models/User';
import { UserForm } from './views/UserForm';
import { Userpage } from './views/UserPage';
import { Collection } from './models/Collection';
import { CollectionView } from './views/CollectionView';
import { UserList } from './views/UserList';

const user = User.build({ age: 23, name: 'some name' });

const rootElement = document.getElementById('root');

const userCollection = new Collection<User, UserProp>(RootUrl, User.build);

if (rootElement) {
  const userCollectionView = new UserList(userCollection, rootElement);
  userCollectionView.render();
  userCollection.fetch();
}
