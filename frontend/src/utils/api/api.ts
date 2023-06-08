import axios from "axios";
import * as demos from "../demos";
import ICustomer, { IRegisterForm } from "../../interfaces/Customer";
import IMovie from "../../interfaces/Movie";
import ITheater from "../../interfaces/Theater";
import {Cookies, useCookies} from 'react-cookie';
import IGenre, { IMovieGrade, IPayMethod, ICustomerGrade, ISeatGrade } from "../../interfaces/Codes";
import IPayment, { IPayForm, IReceipt, ISeatInfo } from "../../interfaces/Payment";
import ISeat, { ISeats } from "../../interfaces/Seat";
import ISchedule from "../../interfaces/Schedule";
import ITicket from "../../interfaces/Ticket";

const cookies = new Cookies();

export const setCookie = (name: string, value: string, options?: any) => {
 	return cookies.set(name, value, {...options}); 
}
export const getCookie = (name: string) => {
 return cookies.get(name); 
}
export const BASE_URL = "http://118.32.109.123:8000"; // 도영이형컴
//export const BASE_URL = "http://203.236.100.247:8000"; //송모
//export const BASE_URL = "http://localhost:8000";//로컬호스트
axios.defaults.withCredentials = true;
export const demo:boolean=false;


//------------------Payment-----------------//
export async function getPaymentListDataAPI():Promise<IReceipt[]>{
    if(demo)return [demos.demoReceipt1, demos.demoReceipt2];
    let message = await axios.get(BASE_URL+"/booking/confirmReserv",{headers:{'Authorization':getCookie("jwt")}}).then((response)=>response.data).catch((error)=>error.response.data);
    console.log("payments",message);
    return message;
}
export async function getSeatInfoAPI(pay_no:number|string):Promise<ISeatInfo[]>{
    if(demo) return demos.demoSeatInfos;
    let message = await axios.post(BASE_URL+"/booking/getSeatInfo/",{pay_no:pay_no},{headers:{'Authorization':getCookie("jwt")}}).then((response)=>response.data).catch((error)=>[]);
    console.log("getSeatInfo",message);
    return message;
}
export async function payAPI(data:IPayForm) {
    if(demo)return {};
    let message = await axios.post(BASE_URL+"/booking/pay/",data,{headers:{'Authorization':getCookie("jwt")}}).then((response)=>response.data).catch((error)=>error.response.data);
    console.log("pay",message);
    return message; 
}
export async function getAllPaymentListDataAPI():Promise<IPayment[]>{
    if(demo)return [demos.demoPayment1, demos.demoPayment2];
    let message = await axios.get(BASE_URL+"/booking/getAllPayments/",{headers:{'Authorization':getCookie("jwt")}}).then((response)=>response.data).catch((error)=>error);
    console.log("allPays:",message);
    return message;
}
export async function bookTicketsAPI(tic_no_string:string, discount_seat_string:string){
    if(demo) return {};
    let message = await axios.post(BASE_URL+"/booking/reserve/",{tic_no_string,discount_seat_string},{headers:{'Authorization':getCookie("jwt")}}).then((response)=>response.data).catch((error)=>error);
    console.log(message);
    return message;
}
export async function cancelReservationsAPI(pay_no:number|string){
    if(demo) return {};
    let message = await axios.post(BASE_URL+"/booking/cancelReserv/",{pay_no:pay_no},{headers:{'Authorization':getCookie("jwt")}}).then((response)=>response.data).catch((error)=>error);
    console.log(message);
    return message;
}
//------------------Schedule-----------------//
export async function addScheduleAPI(data:ISchedule){
    console.log("schedule:",data);
    let tmpData:{[key:string]:any}={};
    Object.keys(data).forEach(key=>{tmpData[key] = data[key]});
    tmpData["sched_no"]=99999;
    tmpData["run_date"]= data.run_date.toString().replace("T", " ")+":00";
    tmpData["run_end_date"]= data.run_end_date.toString().replace("T", " ")+":00";
    console.log("tmpschedule:",tmpData);
    let message = await axios.post(BASE_URL+"/schedule/",tmpData,{headers:{'Authorization':getCookie("jwt")}}).then((response)=>response.data).catch((error)=>error);
    console.log(message);
    return message;
}
export async function getTicketScheduleAPI(tic_no:number|string):Promise<ISchedule>{
    if(demo)return demos.demoSchedule
    let message = await axios.post(BASE_URL+"/theateredit",{},{headers:{'Authorization':getCookie("jwt")}}).then((response)=>response.data).catch((error)=>error);
    console.log(message);
    return message;
}
export async function getAllScheduleListAPI():Promise<ISchedule[]> {
    if(demo)return demos.demoSchedules;
    let message = await axios.get(BASE_URL+"/schedule/",{headers:{'Authorization':getCookie("jwt")}}).then((response)=>response.data).catch((error)=>error);
    console.log(message);
    return message;
}
export async function deleteScheduleAPI(sched_no: string | number) {
    let message = await axios.delete(BASE_URL+`/schedule/${sched_no}`,{headers:{'Authorization':getCookie("jwt")}}).then((response)=>response.data).catch((error)=>error);
    console.log(message);
    return message;
}
export async function editScheduleAPI(schedule:ISchedule) {
    let message = await axios.put(BASE_URL+`/schedule/${schedule.sched_no}`,schedule,{headers:{'Authorization':getCookie("jwt")}}).then((response)=>response.data).catch((error)=>error);
    console.log(message);
    return message;
}