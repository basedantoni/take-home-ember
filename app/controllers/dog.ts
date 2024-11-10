import type Store from '@ember-data/store';
import type RouterService from '@ember/routing/router-service';
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class DogController extends Controller {
  @service declare store: Store;
  @service declare router: RouterService;

  @tracked isEditing = false;
  @tracked errorMessage = '';

  @action
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  @action
  async handleSave(dog: any) {
    return;
    // this.store.createRecord('dog', dog);
  }

  @action
  async handleDelete(dog: any) {
    const dogRecord = await this.store.findRecord('dog', dog.id);
    if (!dogRecord) {
      this.setErrorMessage('Dog not found');
      return;
    }

    await dogRecord.destroyRecord();
    this.router.transitionTo('dogs');
  }

  @action
  setErrorMessage(message: string) {
    this.errorMessage = message;
  }
}
