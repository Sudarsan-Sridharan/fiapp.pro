import {atom} from "recoil";

export interface IQuery {
    timeframe: '30M' | '1H' | '4H' | '1D',
    name: string
}

const queryAtom = atom<IQuery>({
    key: "query",
    default: {
        timeframe: '30M',
        name: 'BTCUSDT'
    }
})

export default queryAtom