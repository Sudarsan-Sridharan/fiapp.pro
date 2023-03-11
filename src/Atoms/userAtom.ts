import {atom} from "recoil";
import {IUser} from "../API/userAPI";

const userAtom = atom<IUser | undefined>({
    key: "userAtom",
    default: undefined
})

export default userAtom