import useSWR, { SWRResponse } from 'swr';
import { fetcher } from './fetcher';

export const useSWRWithEndpoint = <T>(
  url: string | string[] | null
): SWRResponse<T, any> => {
  const result = useSWR<T>(`api/${url}`, (url) => fetcher({ url }), {
    revalidateOnFocus: false,
  });
  return result;
};
