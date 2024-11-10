import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import type DataLoaderService from 'voyant-take-home/services/data-loader';

export default class ApplicationRoute extends Route {
  @service declare dataLoader: DataLoaderService;

  async beforeModel() {
    await this.dataLoader.loadInitialData();
  }
}
