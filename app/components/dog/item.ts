// app/components/dog-item.js
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DogItemComponent extends Component {
  @tracked isEditing = false;

  @action
  toggleDetails() {
    this.isEditing = !this.isEditing;
  }
}
