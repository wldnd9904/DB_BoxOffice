import axios from "axios";
import * as demos from "./demos";
import ICustomer, { IRegisterForm } from "../interfaces/Customer";
import IMovie from "../interfaces/Movie";
import ITheater from "../interfaces/Theater";
import {Cookies, useCookies} from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value: string, options?: any) => {
 	return cookies.set(name, value, {...options}); 
}
export const getCookie = (name: string) => {
 return cookies.get(name); 
}
const BASE_URL = "http://localhost:8000";
axios.defaults.withCredentials = true;
export const demo:boolean=true;

//---------------------User---------------------//
export async function loginAPI(id:string,pw:string){
    if(demo)return demos.demoCustomer;
    const request={cus_no:id, password:pw};
    let data = await axios.post(BASE_URL+"/auth/login/",request,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(data);
    if(data.result==="fail") return undefined;
    return data;
}
export async function logoutAPI(){
    if(demo)return demos.demoCustomer;
    let data = await axios.post(BASE_URL+"/auth/logout/",{},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(data);
    if(data.result==="fail") return undefined;
    return data;
}
export async function registerAPI(data:IRegisterForm){
    if(demo)return {result:"ok"};
    const result = await axios.post(BASE_URL+"/auth/signup/",data,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data.result).catch((error)=>error);
    console.log(data);
    return result;
}
export async function getUserDataAPI(cus_no:number|string):Promise<ICustomer>{
    if(demo)return demos.demoCustomer;
    let result = await axios.post<ICustomer>(BASE_URL+"//a",{cus_no},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(result);
    return result;
}
export async function getUserListDataAPI():Promise<ICustomer[]>{
    if(demo)return demos.demoCustomers;
    const result = await axios.post(BASE_URL+"/userlist",{},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(result);
    return result;
}
export async function deleteUserAPI(cus_no:number|string){
    if(demo)return {result:"ok"};
    let message = await axios.post(BASE_URL+"/userdelete",{cus_no},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data.result).catch((error)=>error);
    console.log(message);
    return message;
}
export async function editUserDataAPI(data:ICustomer){
    if(demo)return {result:"ok"};
    let message = await axios.post(BASE_URL+"/useredit",data,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data.result).catch((error)=>error);
    console.log(data);
    return message;
}
export async function editUserDataStaffAPI(data:ICustomer){
    if(demo)return {result:"ok"};
    let message = await axios.post(BASE_URL+"/useredit",data,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data.result).catch((error)=>error);
    console.log(data);
    return message;
}
//---------------------Movie---------------------//
export async function getMovieListAPI():Promise<IMovie[]> {
    if(demo) return demos.demoMovies;
    let data = await axios.get(BASE_URL+"/movie/").then((response)=>response.data).catch((error)=>error);
    console.log(data);
    return data;
}
export async function addMovieAPI() {
    if(demo)return {result:"ok"};
    const ggangtong:IMovie ={
        mov_no: 10000,
        mov_nm: "새 영화",
        run_time_min: 120,
        mov_grade_no: 1,
        dir_nm: "감독명",
        act_nm: "배우명(들)",
        mov_detail: "설명",
        distributor: "배급사",
        lang: "언어",
        image_url: "이미지URL",
        gen_no: 1,
        release_date:new Date()
    };
    let message = await axios.post(BASE_URL+"/movie/",ggangtong).then((response)=>response.data).catch((error)=>error);
    console.log(message);
    return message;
}
export async function deleteMovieAPI(mov_no:number|string) {
    if(demo)return {result:"ok"};
    let data = await axios.delete(BASE_URL+`/movie/${mov_no}/`).then((response)=>response.data).catch((error)=>error);
    console.log(data);
    return data;
}
export async function editMovieAPI(data:IMovie) {
    if(demo)return {result:"ok"};
    let message = await axios.post(BASE_URL+"/movieedit",{data},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(message);
    return message;
}
//---------------------Theater---------------------//
export async function getTheaterListAPI():Promise<ITheater[]> {
    if(demo) return demos.demoTheaters;
    let data = await axios.post(BASE_URL+"/theaterlist",{},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(data);
    return data;
}
export async function addTheaterAPI() {
    if(demo)return {result:"ok"};
    let message = await axios.post(BASE_URL+"/theateradd",{},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(message);
    return message;
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