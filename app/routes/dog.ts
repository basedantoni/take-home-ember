import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import type Store from '@ember-data/store';

interface DogModel {
  id: string;
  name: string;
  breed: string;
  owner: string;
  size: string;
  description: string;
}

export default class DogRoute extends Route<DogModel> {
  @service declare store: Store;

  async model(params: { id: string }): Promise<DogModel> {
    const { name, breed, owner, size, description } =
      await this.store.findRecord('dog', params.id);

    return {
      id: params.id,
      name,
      breed,
      owner,
      size,
      description,
    };
  }
}
