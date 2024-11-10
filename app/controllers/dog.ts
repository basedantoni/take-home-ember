import type Store from '@ember-data/store';
import type RouterService from '@ember/routing/router-service';
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import type DogRoute from 'voyant-take-home/routes/dog';

export default class DogController extends Controller {
  declare model: Awaited<ReturnType<DogRoute['model']>>;

  get dogId() {
    return this.model.id;
  }

  @service declare store: Store;
  @service declare router: RouterService;

  @tracked isEditing = false;
  @tracked errorMessage = '';

  @action
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  @action
  async handleUpdate(dog: any) {
    const dogRecord = await this.store.findRecord('dog', this.dogId);
    dogRecord.name = dog.name;
    dogRecord.breed = dog.breed;
    dogRecord.owner = dog.owner;
    dogRecord.size = dog.size;
    dogRecord.description = dog.description;

    this.router.transitionTo('dogs');
  }

  @action
  handleCancelEdit() {
    this.toggleEdit();
  }

  @action
  handleError(message: string) {
    this.errorMessage = message;
  }

  @action
  async handleDelete(dog: any) {
    if (!dog.id) {
      this.setErrorMessage('Dog ID is missing');
      return;
    }
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
