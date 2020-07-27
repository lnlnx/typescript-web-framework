import { Eventing } from './Eventing';
import Axios, { AxiosResponse } from 'axios';

export class Collection<T, K> {
  models: T[] = [];
  eventing: Eventing = new Eventing();

  constructor(public rootUrl: string, private deserialize: (json: K) => T) {}

  get on() {
    return this.eventing.on;
  }

  get trigger() {
    return this.eventing.trigger;
  }

  fetch() {
    Axios.get(this.rootUrl).then((response: AxiosResponse): void => {
      response.data.forEach((data: K) => {
        this.models.push(this.deserialize(data));
      });
      this.trigger('change');
    });
  }
}
