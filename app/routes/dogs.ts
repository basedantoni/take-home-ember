import Route from '@ember/routing/route';
import dogs from '../db';

export default class DogsRoute extends Route {
  model() {
    return dogs;
  }
}
