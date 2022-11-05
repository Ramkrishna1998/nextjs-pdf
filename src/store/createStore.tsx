import { Consumer, createContext, ReactNode, useContext } from 'react';

export interface ProviderProps {
  children: ReactNode;
}
export interface ReturnType<T> {
  Provider: ({ children }: ProviderProps) => JSX.Element;
  useStore: () => T;
  Consumer: Consumer<T>;
}
const createStore = <T,>(store: T): ReturnType<T> => {
  const Context = createContext(store);

  const Provider = ({ children }: ProviderProps) => (
    <Context.Provider value={store}>{children}</Context.Provider>
  );

  const useStore = () => useContext(Context);
  return { Provider, useStore, Consumer: Context.Consumer };
};

export default createStore;
