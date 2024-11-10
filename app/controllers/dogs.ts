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

  // Search
  @tracked searchTerm = '';

  // Filter
  @tracked selectedBreed: string | null = null;
  @tracked selectedOwner: string | null = null;
  @tracked selectedSize: string | null = null;

  // Sort
  @tracked sortKey: keyof DogModel | null = null;
  @tracked sortOrder: 'asc' | 'desc' = 'asc';

  get uniqueBreeds() {
    return [...new Set(this.model.map((dog) => dog.breed))];
  }

  get uniqueOwners() {
    return [...new Set(this.model.map((dog) => dog.owner))];
  }

  get uniqueSizes() {
    return [...new Set(this.model.map((dog) => dog.size))];
  }

  get filteredDogs() {
    return this.model.filter((dog) => {
      // console.log(dog.breed, dog.owner, dog.size);
      // console.log(this.selectedBreed, this.selectedOwner, this.selectedSize);
      const matchesSearchTerm = !this.searchTerm.trim() || this.isMatch(dog);
      const matchesBreed =
        !this.selectedBreed || dog.breed === this.selectedBreed;
      const matchesOwner =
        !this.selectedOwner || dog.owner === this.selectedOwner;
      const matchesSize = !this.selectedSize || dog.size === this.selectedSize;

      return matchesSearchTerm && matchesBreed && matchesOwner && matchesSize;
    });
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

  @action
  updateSelectedBreed(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedBreed = target.value || null;
  }

  @action
  updateSelectedOwner(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedOwner = target.value || null;
  }

  @action
  updateSelectedSize(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedSize = target.value || null;
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
