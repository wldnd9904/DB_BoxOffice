import IMovie from '../interfaces/Movie';
import ITheater from '../interfaces/Theater';
import ICustomer from './../interfaces/Customer';
import { atom } from "recoil";

export const customerAtom = atom<ICustomer>({
    key : "customer",
    default : undefined,
});

export const movieListAtom = atom<IMovie[]>({
    key : "movieList",
    default : undefined,
});

export const theaterListAtom = atom<ITheater[]>({
    key : "theaterList",
    default : undefined,
});