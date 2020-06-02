import {writable} from 'svelte/store';

const _storage = {};

function storage() {
  const {subscribe, set, update} = writable(_storage);
  console.log('init liven-store!!!!');

  const put = (key, data) => {
    // if (Object.keys(_storage).includes(key)) {
    //   throw new Error(`'${key}' key already exists!`);
    // }
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
    subscribe,
    set,
    put,
    get,
    keys: () => Object.keys(_storage)
  }
}

const LivenStorage = storage();

/**
 * @deprecated action 으로 대체
 */
export default LivenStorage;
