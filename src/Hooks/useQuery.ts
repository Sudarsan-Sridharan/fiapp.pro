import {useRecoilState} from "recoil";
import queryAtom from "../Atoms/queryAtom";

const useQuery = () => {
    const [query, setQuery] = useRecoilState(queryAtom)
    return {
        get: query,
        set: setQuery
    }
}

export default useQuery