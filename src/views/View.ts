import { Model } from '../models/Model';

export abstract class View<T extends Model<K>, K> {
  abstract template(): string;
  regions: { [key: string]: Element } = {};

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  regionMap(): { [key: string]: string } {
    return {};
  }

  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventMap = this.eventsMap();

    for (let eventKey in eventMap) {
      const [eventName, selector] = eventKey.split(':');
      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventMap[eventKey]);
      });
    }
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionMap = this.regionMap();

    for (let regionName in regionMap) {
      const element = fragment.querySelector(regionMap[regionName]);
      if (element) {
        this.regions[regionName] = element;
      }
    }
  }

  onRender(): void {}

  render() {
    // remove previous html fragment
    this.parent.innerHTML = '';
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);
    this.onRender();
    this.parent.append(templateElement.content);
  }
}
