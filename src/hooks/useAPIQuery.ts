import {useState} from "react";

interface IQuery {
    timeframe?: string;
}

export const useAPIQuery = () => {
    const [value, setValue] = useState<IQuery>({
        timeframe: '30M'
    });

    return {
        value,
        setValue
    }
}