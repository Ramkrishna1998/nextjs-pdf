import { Logger } from './logger';

export const Storage = {
  /**
   * Sets the value of the pair identified by key to value in Local Storage
   * @param {string} key
   * @param {unknown} value
   */
  set: (key: string, value: unknown): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      Logger.error('Storage.set ERROR::', error);
    }
  },
  /**
   * Returns the current value associated with the given key, or null if the given key does not exist.
   * @param {string} key
   */
  get: <T = unknown>(key: string): T | null => {
    try {
      const parsedData = JSON.parse(localStorage.getItem(key) as string) as T;
      return parsedData;
    } catch (error) {
      Logger.error('Storage.set ERROR::', error);
      return null;
    }
  },
};
