import type Store from '@ember-data/store';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export interface DogFormSignature {
  // The arguments accepted by the component
  Args: {
    name: string;
    breed: string;
    owner: string;
    size: string;
    description: string;
    onSave: (dog: any) => void;
    setErrorMessage: (message: string) => void;
  };
  // Any blocks yielded by the component
  Blocks: {
    default: [];
  };
  // The element to which `...attributes` is applied in the component template
  Element: null;
}

export default class DogForm extends Component<DogFormSignature> {
  @service declare store: Store;

  @tracked name = '';
  @tracked breed = '';
  @tracked owner = '';
  @tracked size = '';
  @tracked description = '';

  @action async onSubmit(event: Event) {
    event.preventDefault();

    const dog = {
      name: this.name,
      breed: this.breed,
      owner: this.owner,
      size: this.size,
      description: this.description,
    };

    // Validate data (simple example)
    if (
      !dog.name ||
      !dog.breed ||
      !dog.owner ||
      !dog.size ||
      !dog.description
    ) {
      // Handle validation errors (you can display messages)
      this.args.setErrorMessage('Please fill in all fields correctly.');
      return;
    }

    this.args.onSave(dog);
  }

  @action
  updateName(event: Event) {
    this.name = (event.target as HTMLInputElement).value;
  }

  @action
  updateBreed(event: Event) {
    this.breed = (event.target as HTMLInputElement).value;
  }

  @action
  updateOwner(event: Event) {
    this.owner = (event.target as HTMLInputElement).value;
  }

  @action
  updateSize(event: Event) {
    this.size = (event.target as HTMLInputElement).value;
  }

  @action
  updateDescription(event: Event) {
    this.description = (event.target as HTMLInputElement).value;
  }
}
