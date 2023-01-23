import { atom, useRecoilState } from 'recoil';

export interface ICoinList {
  coin_realtime_price?: string;
  exchange?: string,
  name?: string,
}

export const CoinListAtom = atom<ICoinList[]>({
  key: 'CoinListAtom',
  default: [
    {
      coin_realtime_price: '',
    },
  ],
});
export const useCoinList = () => {
  const [value, setValue] = useRecoilState<ICoinList[]>(CoinListAtom);

  return {
    value,
    setValue,
  };
};