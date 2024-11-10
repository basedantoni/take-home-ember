import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import type Store from '@ember-data/store';

export default class DogRoute extends Route {
  @service declare store: Store;

  async model(params: { id: string }) {
    return await this.store.findRecord('dog', params.id);
  }
}
