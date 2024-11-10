import type Store from '@ember-data/store';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export interface DogEditSignature {
  // The arguments accepted by the component
  Args: {
    model: {
      name: string;
      breed: string;
      owner: string;
      size: string;
      description: string;
    };
    onSave: (dog: any) => void;
    onCancel: () => void;
    onError: (message: string) => void;
  };
  // Any blocks yielded by the component
  Blocks: {
    default: [];
  };
  // The element to which `...attributes` is applied in the component template
  Element: null;
}

export default class DogEdit extends Component<DogEditSignature> {
  @service declare store: Store;

  @tracked name = this.args.model.name;
  @tracked breed = this.args.model.breed;
  @tracked owner = this.args.model.owner;
  @tracked size = this.args.model.size;
  @tracked description = this.args.model.description;

  @action async onSubmit(event: Event) {
    event.preventDefault();

    const dog = {
      name: this.name,
      breed: this.breed,
      owner: this.owner,
      size: this.size,
      description: this.description,
    };

    if (
      !dog.name ||
      !dog.breed ||
      !dog.owner ||
      !dog.size ||
      !dog.description
    ) {
      this.args.onError('Please fill in all fields correctly.');
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
