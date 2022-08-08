import {atom, useRecoilState} from "recoil";

interface IQuery {
    timeframe?: string;
    risk?: number | null,
    currentTrending?: string,
    name?: string,
}

export const APIQueryAtom = atom<IQuery>({
    key: "APIQueryAtom",
    default: {
        timeframe: "30M"
    }
})

export const useAPIQuery = () => {
    const [value, setValue] = useRecoilState<IQuery>(APIQueryAtom);

    return {
        value,
        setValue
    }
}