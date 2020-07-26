import { AxiosPromise, AxiosResponse } from 'axios';

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  getAll(): T;
  set(update: T): void;
}

export interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private events: Events,
    private attributes: ModelAttributes<T>,
    private sync: Sync<T>
  ) {}

  // This shorthand syntax won't work if events/attributes are assigned inside consturctor method
  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attributes.get;

  set(data: T): void {
    this.attributes.set(data);
    this.events.trigger('changed');
  }

  fetch() {
    const id = this.get('id');

    if (typeof id !== 'number') {
      throw new Error('Must provide user id!');
    }
    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }

  save() {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.set(response.data);
        this.trigger('saved');
      })
      .catch(() => {
        this.trigger('error');
      });
  }
}
