import IGenre, { ICustomerGrade, IMovieGrade, IPayMethod, ISeatGrade } from '../interfaces/Codes';
import IMovie from '../interfaces/Movie';
import IPayment from '../interfaces/Payment';
import ISchedule from '../interfaces/Schedule';
import ITheater from '../interfaces/Theater';
import { IPeopleSelected } from '../interfaces/Ticket';
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

export const selectedPeopleAtom = atom<IPeopleSelected>({
    key : "selectedPeople",
    default : undefined
});

export const customerGradeNameAtom = atom<ICustomerGrade>({
    key : "customerGradeName",
    default : undefined
});
export const seatGradeNameAtom = atom<ISeatGrade>({
    key : "seatGradeName",
    default : undefined
});
export const genreNameAtom = atom<IGenre>({
    key : "genreName",
    default : undefined
});
export const payMethodNameAtom = atom<IPayMethod>({
    key : "payMethodName",
    default : undefined
});
export const movieGradeNameAtom = atom<IMovieGrade>({
    key : "movieGradeName",
    default : undefined
});