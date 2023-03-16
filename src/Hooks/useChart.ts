import {useRecoilState} from "recoil";
import chartAtom from "../Atoms/chartAtom";

const useChart = () => {
    const [get, set] = useRecoilState(chartAtom);

    const setTargetTimestamp = (timestamp: number | null) => {
        set({
            ...get,
            target: {
                timestamp,
            }
        })
    }

    return {
        get,
        set,
        setTargetTimestamp,
    }
}

export default useChart