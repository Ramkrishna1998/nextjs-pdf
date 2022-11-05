import { AxiosResponse } from 'axios';
import { QueryFunction } from 'react-query';
import { QueryState } from 'react-query/types/core/query';
import { IQueryOptions } from './api';
import { queryClient } from '@/utils';

export const getCached = async <T = unknown>(
  key: string[],
  queryFn: QueryFunction<AxiosResponse<unknown>>,
  options?: IQueryOptions
) => {
  const alreadyFetched: QueryState<AxiosResponse<T>> | undefined = queryClient.getQueryState(key);

  if (options?.refresh || !alreadyFetched || !alreadyFetched?.data?.data) {
    const res = await queryClient.fetchQuery(key, queryFn);
    return res.data as T;
  }
  return alreadyFetched?.data?.data;
};
