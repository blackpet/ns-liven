import {writable} from 'svelte/store';

const _storage = {};

function storage() {
  console.log('init liven-store!!!!');

  const set = (key, data) => {
    if (Object.keys(_storage).includes(key)) {
      throw new Error(`'${key}' key already exists!`);
    }
    _storage[key] = store(data);
  };


  const get = (key) => {
    if (!Object.keys(_storage).includes(key)) {
      throw new Error(`'${key}' key does not exists!`);
    }

    return _storage[key];
  };

  const store = (data) => {
    return writable(data);
  };

  return {
    set,
    get
  }
}

const Storage = storage();
export default Storage;
