import IGenre, { ICode, ICustomerGrade, IMovieGrade, IPayMethod, ISeatGrade } from '../interfaces/Codes';
import IMovie from '../interfaces/Movie';
import IPayment, { IReceipt } from '../interfaces/Payment';
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
export const paymentListAtom = atom<IPayment[]>({
    key : "paymentList",
    default : [],
});

export const scheduleListAtom = atom<ISchedule[]>({
    key : "scheduleList",
    default : [],
})
export const selectedMovieAtom = atom<IMovie>({
    key : "selectedMovie",
    default : undefined
});
export const selectedTheaterAtom = atom<ITheater>({
    key : "selectedTheater",
    default : undefined
});
export const currentPayNoAtom = atom<string>({
    key : "currentPayNo",
    default : ""
});
export const allScheduleDatesAtom = atom<string[]>({
    key : "allScheduleDates",
    default : []
})

export const selectedScheduleAtom = atom<ISchedule>({
    key : "selectedSchedule",
    default : undefined
});
export const reservationsAtom = atom<IReceipt[]>({
    key : "reservations",
    default : []
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
export const codeListAtom = atom<ICode[]>({
    key : "codes",
    default: [],
})