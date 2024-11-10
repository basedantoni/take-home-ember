import type Store from '@ember-data/store';
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class DataLoaderService extends Service {
  @service declare store: Store;

  @tracked isDataLoaded = false;

  async loadInitialData() {
    const dogsInStorage = this.store.peekAll('dog');

    if (dogsInStorage.length === 0) {
      const response = await fetch('/api/v1/dogs.json');
      const data = await response.json();

      data.dogs.forEach((dog: any) => {
        this.store.createRecord('dog', dog).save();
      });
    }

    this.isDataLoaded = true;
  }
}

// Don't remove this declaration: this is what enables TypeScript to resolve
// this service using `Owner.lookup('service:data-loader')`, as well
// as to check when you pass the service name as an argument to the decorator,
// like `@service('data-loader') declare altName: DataLoaderService;`.
declare module '@ember/service' {
  interface Registry {
    'data-loader': DataLoaderService;
  }
}
