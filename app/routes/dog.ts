import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import type Store from '@ember-data/store';
import type DogCeoService from 'voyant-take-home/services/dog-ceo';

interface DogModel {
  id: string;
  name: string;
  breed: string;
  owner: string;
  size: string;
  description: string;
  dogImageUrl: string;
}

export default class DogRoute extends Route<DogModel> {
  @service declare store: Store;
  @service('dog-ceo') declare dogCeoApi: DogCeoService;

  async model(params: { dog_id: string }): Promise<DogModel> {
    const { name, breed, owner, size, description } =
      await this.store.findRecord('dog', params.dog_id);

    const dogImageUrl = await this.dogCeoApi.getRandomDogImage(breed);

    return {
      id: params.dog_id,
      name,
      breed,
      owner,
      size,
      description,
      dogImageUrl,
    };
  }

  async afterModel(model: DogModel) {
    // Fetch the random image URL for the breed and set it on the model
    try {
      const dogImageUrl = await this.dogCeoApi.getRandomDogImage(model.breed);
      model.dogImageUrl = dogImageUrl;
    } catch (error) {
      console.error('Error fetching dog image:', error);
    }
  }
}
