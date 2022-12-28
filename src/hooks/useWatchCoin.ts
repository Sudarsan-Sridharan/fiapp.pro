import useSWR from 'swr';

import { domain, fetcher, http } from '@/ network/fether';

export const useWatchCoin = () => {
  const { data } = useSWR<any>(`${domain}/WatchCoin`, fetcher, {
    refreshInterval: 1000,
  });

  const add = (name: string) => {
    http
      .post(`/WatchCoin/add`, {
        name,
      })
      .catch((e) => console.log(e));
  };

  const remove = (name: string) => {
    http
      .post(`/WatchCoin/delete`, {
        name,
      })
      .catch((e) => console.log(e));
  };

  return { data, add, remove };
};