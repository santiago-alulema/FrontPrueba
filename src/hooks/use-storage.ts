import localForage from 'localforage';
import { useEffect, useState } from 'react';
import { StorageConfigType } from 'types';

const isObjectLiked = (value: Object) =>
  value.constructor.name === 'Array' || value.constructor.name === 'Object';

const rehydrate = (value: any, defaultValue?: any) => {
  if (!value) return defaultValue;
  // if (value === 'false') str = false;
  // if (value === 'true') str = true;
  // if (!isObjectLiked(value)) {
  //   return value;
  // }
  try {
    const parse = JSON.parse(value);
    return parse;
  } catch (err) {
    return defaultValue;
  }
};

const hydrate = (value: Object) => {
  if (!isObjectLiked(value)) {
    return value;
  }
  return JSON.stringify(value);
};

const createMigration = <T>(opts: StorageConfigType<T>, data: T) => {
  return new Promise<T>((resolve, reject) => {
    const key = `${opts.key}-version`;
    localForage.getItem(key, (_err, version) => {
      if (version !== opts.version) {
        data = opts.migrate(data);
        localForage.setItem(opts.key, rehydrate(data), (err) => {
          if (err) return reject(err);
          localForage.setItem(key, opts.version, (err) => {
            if (err) return reject(err);
            return resolve(data);
          });
        });
      } else {
        resolve(data);
      }
    });
  });
};

export type useStorageProps<T> = {
  config: StorageConfigType<T>;
  state: T;
  setState: (payload: T) => void;
}

export const useStorage = <T>({ config, state, setState, }: useStorageProps<T>) => {
  const [rehydrated, setRehydrated] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function init() {
      await localForage.getItem(config.key, (err, value) => {
        if (err) {
          setRehydrated(true);
          return setError(err);
        }
        // Migrate persisted data
        const restoredValue = rehydrate(value);
        if (typeof config.migrate === 'function') {
          createMigration(config, restoredValue)
            .then((data) => setState(data))
            .then(() => setRehydrated(true));
        } else {
          setState(restoredValue);
          setRehydrated(true);
        }
      });
    }
    init();
  }, []);

  useEffect(() => {
    localForage.setItem(config.key, hydrate(state));
  }, [state]);

  return {
    rehydrated,
    error,
  };
};
