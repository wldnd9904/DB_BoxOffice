import IGenre, { ICustomerGrade, IMovieGrade, IPayMethod, ISeatGrade } from './../../interfaces/Codes';
import { BASE_URL, demo } from "./api";
import * as demos from "../demos";
import axios from "axios";
import ITicket from '../../interfaces/Ticket';
import ISeat from '../../interfaces/Seat';

export async function getSeatsAPI(thea_no:number|string):Promise<ISeat[]> {
    if(demo) return [];
    let data = await axios.get(BASE_URL+`/seat/${thea_no}`).then((response)=>response.data).catch((error)=>error);
    console.log(data);
    return data;
}
export async function getIssueListAPI(sched_no:number|string):Promise<{tic_no:number, seat_no:string, issue: number}[]> {
    if(demo) return [];
    let data = await axios.get(BASE_URL+`/ticket/list/${sched_no}`).then((response)=>response.data).catch((error)=>error);
    console.log(data);
    return data;
}
export async function getTicketsAPI(thea_no:number|string):Promise<ITicket[]> {
    if(demo) return [];
    let data = await axios.get(BASE_URL+`/seat/${thea_no}`).then((response)=>response.data).catch((error)=>error);
    console.log(data);
    return data;
}