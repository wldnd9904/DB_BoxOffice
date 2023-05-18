import ICustomer from './../interfaces/Customer';
import { atom } from "recoil";

export const customerAtom = atom<ICustomer>({
    key : "customer",
    default : undefined,
});