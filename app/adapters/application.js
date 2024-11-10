import Adapter from '@ember-data/adapter';
import { v4 as uuidv4 } from 'uuid';

export default class ApplicationAdapter extends Adapter {
  generateIdForRecord() {
    return uuidv4();
  }

  findRecord(store, type, id) {
    let data = localStorage.getItem(`${type.modelName}:${id}`);
    return Promise.resolve(JSON.parse(data));
  }

  findAll(store, type) {
    let records = [];
    for (let key in localStorage) {
      if (key.startsWith(`${type.modelName}:`)) {
        records.push(JSON.parse(localStorage.getItem(key)));
      }
    }
    return Promise.resolve(records);
  }

  createRecord(store, type, snapshot) {
    let data = this.serialize(snapshot, { includeId: true });
    localStorage.setItem(`${type.modelName}:${data.id}`, JSON.stringify(data));
    return Promise.resolve(data);
  }

  updateRecord(store, type, snapshot) {
    let data = this.serialize(snapshot, { includeId: true });
    localStorage.setItem(`${type.modelName}:${data.id}`, JSON.stringify(data));
    return Promise.resolve(data);
  }

  deleteRecord(store, type, snapshot) {
    let id = snapshot.id;
    localStorage.removeItem(`${type.modelName}:${id}`);
    return Promise.resolve();
  }
}
