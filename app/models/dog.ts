import Model, { attr } from '@ember-data/model';

export default class DogModel extends Model {
  @attr
  declare name: string;

  @attr
  declare breed: string;

  @attr
  declare owner: string;

  @attr
  declare size: string;

  @attr
  declare description: string;
}

declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    dog: DogModel;
  }
}
