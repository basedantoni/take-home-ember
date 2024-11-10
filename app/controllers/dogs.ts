import type Store from '@ember-data/store';
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import type DogModel from 'voyant-take-home/models/dog';

export default class DogsController extends Controller {
  declare model: DogModel[];

  @service declare store: Store;

  @tracked isAdding = false;
  @tracked isEditing = false;
  @tracked errorMessage = '';
  @tracked searchTerm = '';
  @tracked sortKey: keyof DogModel | null = null;
  @tracked sortOrder: 'asc' | 'desc' = 'asc';

  get filteredDogs() {
    if (!this.searchTerm.trim()) {
      // If searchTerm is empty, return all dogs
      return this.model;
    }

    return this.model.filter((dog) => this.isMatch(dog));
  }

  get filteredAndSortedDogs() {
    let filteredDogs = this.filteredDogs;

    if (this.sortKey) {
      filteredDogs = filteredDogs.slice().sort((a, b) => {
        const aValue = a[this.sortKey ?? 'name'];
        const bValue = b[this.sortKey ?? 'name'];

        if (aValue === null || bValue === null) {
          return 0;
        }

        if (aValue < bValue) {
          return this.sortOrder === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return this.sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredDogs;
  }

  @action
  updateSearchTerm(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
  }

  @action
  setSortKey(sortKey: keyof DogModel) {
    if (this.sortKey === sortKey) {
      // Toggle the sort order if the sort key is the same
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      // Set the new sort key and reset to ascending order
      this.sortKey = sortKey;
      this.sortOrder = 'asc';
    }
  }

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

  // Helper function to check if a dog matches the search term
  private isMatch(dog: any) {
    let term = this.searchTerm.toLowerCase();
    return (
      dog.name.toLowerCase().includes(term) ||
      dog.breed.toLowerCase().includes(term) ||
      dog.owner.toLowerCase().includes(term) ||
      dog.size.toLowerCase().includes(term) ||
      dog.description.toLowerCase().includes(term)
    );
  }
}
