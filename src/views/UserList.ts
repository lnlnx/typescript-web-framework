import { CollectionView } from './CollectionView';
import { User, UserProp } from '../models/User';
import { Model } from '../models/Model';
import { UserDetail } from './UserDetail';

export class UserList extends CollectionView<User, UserProp> {
  renderItem(model: User, itemParent: Element): void {
    new UserDetail(itemParent, model).render();
  }
}
