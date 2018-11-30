const debug = require('debug')('set-once');

const DEFAULT_OPTIONS = {
  seal: false,
  throwException: false
};

module.exports = function setOnce(setOnceProperties, options = DEFAULT_OPTIONS) {
  const setProperties = {};
  const backingObj = {};

  const proxy = {};

  setOnceProperties.forEach(prop => {
    Object.defineProperty(proxy, prop, {
      configurable: false,
      set(value) {
        debug(`Attempting to set property '${prop}'`);
        if (!setProperties[prop]) {
          backingObj[prop] = value;
          setProperties[prop] = true;
          debug(`Property '${prop}' set successfully`);
        } else {
          debug(`Property '${prop}' was already set, doing nothing`);
          if (options.throwException) {
            throw new Error(`Property '${prop}' was already set`);
          }
        }
      },
      get() {
        return backingObj[prop];
      }
    });
  });

  if (options.seal) {
    debug('Sealing object');
    Object.seal(proxy);
  }

  return proxy;
};
