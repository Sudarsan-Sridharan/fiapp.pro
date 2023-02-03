import { atom, useRecoilState } from 'recoil';
import useSWR from 'swr';
import { fetcher } from '@/ network/fether';
import { useEffect } from 'react';

interface IFutureUsdtAsset {
  availableBalance: string;
  asset: string;
  balance: string;
}

interface ISpotUsdtAsset {
  asset: string;
  free: string;
}

interface IUserAssert {
  userFutureWalletAsset?: string;
  userSpotWalletAsset?: string;
  spotUsdtAsset?: ISpotUsdtAsset;
  futureUsdtAsset?: IFutureUsdtAsset;
}

export const useUserAssert = () => {
  const userAssertAtom = atom<IUserAssert>({
    key: 'UserAssertAtom',
    default: {
      userFutureWalletAsset: '',
      userSpotWalletAsset: '',
    },
  });

  const [userAssert, setUserAssert] = useRecoilState(userAssertAtom);
  const { data } = useSWR<any>('/BinanceSpot/user-assert', fetcher, { refreshInterval: 1000 * 5 });

  useEffect(() => {
    const spotWalletAsset = JSON.parse(data?.data?.data?.userSpotWalletAsset || '[]');
    const futureWalletAsset = JSON.parse(data?.data?.data?.userFutureWalletAsset || '[]');
    let spotUsdtAsset = spotWalletAsset.filter((item: ISpotUsdtAsset) => item.asset === 'USDT');
    let futureUsdtAsset = futureWalletAsset.filter((item: IFutureUsdtAsset) => item.asset === 'USDT');

    spotUsdtAsset = spotUsdtAsset.length > 0 ? spotUsdtAsset[0] : undefined;
    futureUsdtAsset = futureUsdtAsset.length > 0 ? futureUsdtAsset[0] : undefined;

    setUserAssert({
      userSpotWalletAsset: spotWalletAsset,
      userFutureWalletAsset: futureWalletAsset,
      spotUsdtAsset,
      futureUsdtAsset,
    });
  }, [data]);

  return {
    userAssert,
    setUserAssert,
  };
};