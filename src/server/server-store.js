
let _storage = {}
const _defaultData = {
  quiz: null, poll: null, survey: null, qna: null, share: null
}

function createStorage() {

  // create namespace and store action data
  function namespace(ns, data = _defaultData) {
    // exists ns?
    if (!Object.keys(_storage).includes(ns)) {
      _storage[ns] = {}
    }
    debugger;
    _storage[ns][data.act] = data
    // active Action
    _storage[ns].act = data.act

    // TODO blackpet: debugging
    console.log('namespace', JSON.stringify(_storage))
  }

  // parse real namespace name
  function parseNamespace(nsp) {
    return nsp.name.replace(/^\/liven-/, '')
  }

  // get active Action data
  function activeActionData(ns) {
    if (!Object.keys(_storage).includes(ns) || !_storage[ns].act) {
      return null;
    }
    return _storage[ns][_storage[ns].act];
  }

  function getStorage() {
    return _storage;
  }

  return {
    namespace,
    parseNamespace,
    activeActionData,
    getStorage,
  }
}

const ServerStorage = createStorage()
export default ServerStorage
