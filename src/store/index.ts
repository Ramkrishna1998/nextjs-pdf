import createStore from './createStore';
import MainStore from './main';

export const store = {
  mainStore: new MainStore(),
};
export const { Consumer: StoreConsumer, Provider: StoreProvider, useStore } = createStore(store);
