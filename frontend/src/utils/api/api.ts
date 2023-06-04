import axios from "axios";
import * as demos from "../demos";
import ICustomer, { IRegisterForm } from "../../interfaces/Customer";
import IMovie from "../../interfaces/Movie";
import ITheater from "../../interfaces/Theater";
import {Cookies, useCookies} from 'react-cookie';
import IGenre, { IMovieGrade, IPayMethod, ICustomerGrade, ISeatGrade } from "../../interfaces/Codes";
import IPayment from "../../interfaces/Payment";
import { ISeats } from "../../interfaces/Seat";
import ISchedule from "../../interfaces/Schedule";
import ITicket from "../../interfaces/Ticket";

const cookies = new Cookies();

export const setCookie = (name: string, value: string, options?: any) => {
 	return cookies.set(name, value, {...options}); 
}
export const getCookie = (name: string) => {
 return cookies.get(name); 
}
//export const BASE_URL = "http://118.32.109.123:8000"; // 도영이형컴
export const BASE_URL = "http://203.236.100.247:8000"; //송모
//export const BASE_URL = "http://localhost:8000";//로컬호스트
axios.defaults.withCredentials = true;
export const demo:boolean=false;

//---------------------Theater---------------------//
export async function getTheaterListAPI():Promise<ITheater[]> {
    if(demo) return demos.demoTheaters;
    let data = await axios.get(BASE_URL+"/theater/",{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(data);
    return data;
}
export async function addTheaterAPI() {
    if(demo)return {result:"ok"};
    let message = await axios.post(BASE_URL+"/theateradd",{},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(message);
    return message;
}
export async function getTheaterAPI(thea_no:number|string) {
    if(demo)return demos.demoTheater2;
    let data = await axios.post(BASE_URL+"/theateredelete",{thea_no},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(data);
    return data;
}
export async function deleteTheaterAPI(thea_no:number|string) {
    if(demo)return {result:"ok"};
    let data = await axios.post(BASE_URL+"/theateredelete",{thea_no},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(data);
    return data;
}
export async function editTheaterAPI(data:ITheater) {
    if(demo)return {result:"ok"};
    let message = await axios.post(BASE_URL+"/theateredit",{data},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(message);
    return message;
}

//------------------Payment-----------------//
export async function getPaymentListDataAPI(cus_no:number|string):Promise<IPayment[]>{
    if(demo)return [demos.demoPayment, demos.demoPayment];
    let message = await axios.post(BASE_URL+"/theateredit",{},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(message);
    return message;
}
export async function getAllPaymentListDataAPI():Promise<IPayment[]>{
    if(demo)return [demos.demoPayment, demos.demoPayment];
    let message = await axios.post(BASE_URL+"/theateredit",{},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(message);
    return message;
}
export async function getPaymentTicketsAPI(pay_no:number|string):Promise<ITicket[]>{
    if(demo) return [demos.demoTicket,demos.demoTicket2];
    let message = await axios.post(BASE_URL+"/theateredit",{},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(message);
    return message;
}
//------------------Schedule-----------------//
export async function getMovieScheduleAPI(mov_no:number|string):Promise<ISchedule[]>{
    if(demo)return demos.demoSchedules;
    let message = await axios.post(BASE_URL+"/theateredit",{},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(message);
    return message;
}
export async function addScheduleAPI(){
    if(demo)return demos.demoSchedules;
    let kkangtong = {
        sched_no: "0",
        mov_no: "1",
        thea_no: "1",
        run_round: 0,
        run_type: "0",
        run_date: "2023-06-03 23:00:00",
        run_end_date: "2023-06-03 23:00:00",
    };
    console.log(kkangtong)
    let message = await axios.post(BASE_URL+"/schedule/",kkangtong,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(message);
    return message;
}
export async function getTicketScheduleAPI(tic_no:number|string):Promise<ISchedule>{
    if(demo)return demos.demoSchedule
    let message = await axios.post(BASE_URL+"/theateredit",{},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(message);
    return message;
}
export async function getAllScheduleListAPI():Promise<ISchedule[]> {
    if(demo)return demos.demoSchedules;
    let message = await axios.get(BASE_URL+"/schedule/",{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(message);
    return message;
}
export async function deleteScheduleAPI(sched_no: string | number) {
    let message = await axios.delete(BASE_URL+`/schedule/${sched_no}`,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(message);
    return message;
}
export async function editScheduleAPI(schedule:ISchedule) {
    let message = await axios.put(BASE_URL+`/schedule/${schedule.sched_no}`,schedule,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(message);
    return message;
}
/*

export async function getEventData() {
    if(demo)return demoEvents;
    let data = await axios.post(BASE_URL+"/event",{},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    //console.log(data);
    return data;
}
export async function deleteEventAPI(eventID:string) {
    if(demo)return {result:"ok"};
    let data = await axios.post(BASE_URL+"/eventdelete",{eventID},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    //console.log(data);
    return data;
}
export async function editEventAPI(data:IEvent) {
    if(demo)return {result:"ok"};
    let message = await axios.post(BASE_URL+"/eventedit",{data},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    //console.log(message);
    return message;
}
export async function addEventAPI() {
    if(demo)return {result:"ok"};
    let message = await axios.post(BASE_URL+"/eventadd",{},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    //console.log(message);
    return message;
}
export async function getMovieData(id:string) {
    if(demo) return demoMovies
    let data = await axios.post(BASE_URL+"/Movie",{cus_no:id},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    //console.log(data);
    return data;
}
export async function grantMovieAPI(cus_no:string, mov_no:number) {
    if(demo) return {result:"ok"};
    let data = await axios.post(BASE_URL+"/Moviegrant",{cus_no, mov_no},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    //console.log(data);
    return data;
}
export async function _useMovieAPI(cus_no:string, mov_no:number) {
    if(demo) return {result:"ok"};
    let data = await axios.post(BASE_URL+"/Movieuse",{cus_no, mov_no},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    //console.log(data);
    return data;
}

export async function getStyleData() {
    if(demo)return demoStyles;
    let data = await axios.post(BASE_URL+"/style",{},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    //console.log(data);
    return data;
}
export async function deleteStyleAPI(styleID:string) {
    if(demo)return {result:"ok"};
    let data = await axios.post(BASE_URL+"/styledelete",{styleID},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    //console.log(data);
    return data;
}
export async function editStyleAPI(data:IStyle) {
    if(demo)return {result:"ok"};
    let message = await axios.post(BASE_URL+"/styleedit",{data},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    //console.log(message);
    return message;
}
export async function addStyleAPI() {
    if(demo)return {result:"ok"};
    let message = await axios.post(BASE_URL+"/styleadd",{},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    //console.log(message);
    return message;
}
export async function getDinnerData() {
    if(demo)return demoDinners;
    let data = await axios.post(BASE_URL+"/dinner",{},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    //console.log(data);
    return data;
}
export async function deleteDinnerAPI(dinnerID:string) {
    if(demo)return {result:"ok"};
    let data = await axios.post(BASE_URL+"/dinnerdelete",{dinnerID},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    //console.log(data);
    return data;
}
export async function editDinnerAPI(data:IDinner) {
    if(demo)return {result:"ok"};
    let message = await axios.post(BASE_URL+"/dinneredit",{data},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    //console.log(message);
    return message;
}
export async function addDinnerAPI() {
    if(demo)return {result:"ok"};
    let message = await axios.post(BASE_URL+"/dinneradd",{},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    //console.log(message);
    return message;
}
export async function getDetailedMenuTypeListData() {
    if(demo)return demoDetailedMenuTypeList;
    let data = await axios.post(BASE_URL+"/detail",{},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    //console.log(data);
    return data;
}
export async function getAddressData(id:string) {
    if(demo)return demoAddress;
    let data = await axios.post(BASE_URL+"/address2",{cus_no:id},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    //console.log(data);
    return data;
}
export async function addAddressAPI(addr:IAddress){
    if(demo)return {result:"ok"};
    let data = await axios.post(BASE_URL+"/address",{...addr},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    //console.log(data);
    return data;
}
export async function removeAddressAPI(cus_no:string, addressID:number){
    if(demo)return {result:"ok"};
    let data = await axios.post(BASE_URL+"/address3",{cus_no,addressID},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    //console.log(data);
    return data;
}

export async function getRecentOrderAPI(cus_no:string){
    if(demo)return demoRecentOrder;
    let data = await axios.post(BASE_URL+"/recentorder",{cus_no},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    //console.log(data);
    return data;
}
export async function getStockAPI(){
    if(demo)return demoStock;
    let data = await axios.post(BASE_URL+"/stockget",{},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    //console.log(data);
    return data;
}
export async function setStockAPI(name:string,stock:string,price:string){
    if(demo)return {result:"ok"};
    let data = await axios.post(BASE_URL+"/stockset",{name,stock,price},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    //console.log(data);
    return data;
}
export async function removeStockAPI(data:{name:string,count:number}[]){
    if(demo)return {result:"ok"};
    let message = await axios.post(BASE_URL+"/stockuse",{data},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    //console.log("x");
    //console.log(message);
    //console.log("gd");
    return message;
}
export async function sendOrderAPI(orderList:IOrder[]){
    if(demo)return {result:"ok"};
    let data = await axios.post(BASE_URL+"/order",{orderList},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    //console.log(data);
    return data;
}
export async function editOrderAPI(order:IOrder){
    if(demo)return {result:"ok"};
    let data = await axios.post(BASE_URL+"/orderedit",{order},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    //console.log(data);
    return data;
}
export async function cancelOrderAPI(orderID:number){
    if(demo)return {result:"ok"};
    let data = await axios.post(BASE_URL+"/ordercancel",{orderID},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    //console.log(data);
    return data;
}
export async function getPendingOrderAPI(){
    if(demo)return demoPendingOrder;
    let data = await axios.post(BASE_URL+"/orderpending",{},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    //console.log(data);
    return data;
}
export async function alterOrderStateAPI(orderID:number,state:string){
    if(demo)return {result:"ok"};
    let data = await axios.post(BASE_URL+"/orderalter",{orderID,state},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    //console.log("alter done");
    //console.log(data);
    return data;
}
*/