import {atom} from "recoil";

interface IChartAtom {
    target: {
        timestamp: number | null,
    }
}

const chartAtom = atom<IChartAtom>({
    key: "chart",
    default: {
        target: {
            timestamp: null,
        }
    }
})

export default chartAtom