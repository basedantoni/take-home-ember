import type Store from '@ember-data/store';
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class DogController extends Controller {
  @service declare store: Store;

  @tracked isAdding = false;
  @tracked errorMessage = '';

  @action
  toggleAdd() {
    console.log('toggleAdd');
    this.isAdding = !this.isAdding;
    this.errorMessage = '';
  }

  @action
  async handleSave(dog: any) {
    let newDog = this.store.createRecord('dog', dog);
    try {
      await newDog.save();
      console.log('newDog', newDog);
      this.store.push(newDog);
      this.toggleAdd();
    } catch (error) {
      console.error(error);
      this.setErrorMessage('Please fill in all fields correctly.');
    }
  }

  @action
  setErrorMessage(message: string) {
    this.errorMessage = message;
  }
}
