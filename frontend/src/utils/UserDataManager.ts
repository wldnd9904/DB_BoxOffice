import { atom } from "recoil";
import { IUserData } from "../interfaces/UserData";

export default class UserDataManager{
}

export const userDataAtom = atom<IUserData>({
    key : "userData",
    default : undefined,
});