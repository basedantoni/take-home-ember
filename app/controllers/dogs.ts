import type Store from '@ember-data/store';
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class DogsController extends Controller {
  @service declare store: Store;

  @tracked isAdding = false;
  @tracked isEditing = false;
  @tracked errorMessage = '';

  @action
  toggleAdd() {
    this.isAdding = !this.isAdding;
    this.errorMessage = '';
  }

  @action
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  @action
  async handleSave(dog: any) {
    this.store.createRecord('dog', dog);
    this.toggleAdd();
  }

  @action
  setErrorMessage(message: string) {
    this.errorMessage = message;
  }
}
