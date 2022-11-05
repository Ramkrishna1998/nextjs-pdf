import { QueryClientProvider } from 'react-query';
import { StoreProvider } from '@/store';
import { queryClient } from '@/utils';

type Props = {
  children: JSX.Element;
};

const AllProviders = ({ children }: Props): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <StoreProvider>{children}</StoreProvider>{' '}
  </QueryClientProvider>
);

export default AllProviders;
