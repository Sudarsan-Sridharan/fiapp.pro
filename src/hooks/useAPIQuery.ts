import {atom, useAtom} from "jotai";

interface IQuery {
    timeframe?: string;
}

const APIQueryAtom = atom<IQuery>({
    timeframe: "30M",
})

export const useAPIQuery = () => {
    const [value, setValue] = useAtom<IQuery>(APIQueryAtom);

    return {
        value,
        setValue
    }
}