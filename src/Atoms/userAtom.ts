import {atom} from "recoil";
import {IUserInfo} from "../API/userAPI";

const userAtom = atom<IUserInfo | undefined>({
    key: "userAtom",
    default: undefined
})

export default userAtom