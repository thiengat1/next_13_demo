import useSWR, { SWRResponse } from 'swr';
import { fetcher } from './fetcher';

export const useSWRWithEndpoint = <T>(
  url: string | string[] | null
): SWRResponse<T, any> => {
  console.log('url', url);

  const result = useSWR<T>(`${url}`, (url) => fetcher({ url }), {
    revalidateOnFocus: false,
  });
  console.log('result', result);

  return result;
};
