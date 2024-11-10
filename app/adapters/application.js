import RESTAdapter from '@ember-data/adapter/rest';

export default class ApplicationAdapter extends RESTAdapter {
  namespace = 'api/v1';

  buildURL(...args) {
    return `${super.buildURL(...args)}.json`;
  }
}
