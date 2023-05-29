import IMovie from '../interfaces/Movie';
import ISchedule from '../interfaces/Schedule';
import ITheater from '../interfaces/Theater';
import ICustomer from './../interfaces/Customer';
import { atom } from "recoil";

export const customerAtom = atom<ICustomer>({
    key : "customer",
    default : undefined,
});

export const movieListAtom = atom<IMovie[]>({
    key : "movieList",
    default : [],
});

export const theaterListAtom = atom<ITheater[]>({
    key : "theaterList",
    default : [],
});

export const selectedMovieAtom = atom<IMovie>({
    key : "selectedMovie",
    default : undefined
});

export const selectedScheduleAtom = atom<ISchedule>({
    key : "selectedSchedule",
    default : undefined
});
