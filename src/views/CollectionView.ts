import { Collection } from '../models/Collection';
import { Model } from '../models/Model';

export abstract class CollectionView<T extends Model<K>, K> {
  constructor(public collection: Collection<T, K>, public parent: Element) {
    this.collection.on('change', () => {
      this.render();
    });
  }

  abstract renderItem(model: T, itemParent: Element): void;

  render(): void {
    this.parent.innerHTML = '';
    const templateElement = document.createElement('template');
    this.collection.models.forEach((element) => {
      const divElement = document.createElement('div');
      this.renderItem(element, divElement);
      templateElement.content.append(divElement);
    });
    this.parent.append(templateElement.content);
  }
}
