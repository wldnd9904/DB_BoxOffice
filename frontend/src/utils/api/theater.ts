import { BASE_URL, demo, getCookie } from "./api";
import * as demos from "../demos";
import axios from "axios";
import ISeat from "../../interfaces/Seat";
import ITheater from "../../interfaces/Theater";

//---------------------Theater---------------------//
export async function getTheaterListAPI():Promise<ITheater[]> {
    if(demo) return demos.demoTheaters;
    let data = await axios.get(BASE_URL+"/theater/",{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(data);
    return data;
}
export async function addTheaterAPI(data:ITheater) {
    if(demo)return {result:"ok"};
    let message = await axios.post(BASE_URL+"/theater/",data,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(message);
    return message;
}
export async function getTheaterAPI(thea_no:number|string) {
    if(demo)return demos.demoTheater2;
    let data = await axios.get(BASE_URL+`/theater/${thea_no}`,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(data);
    return data[0];
}
export async function putSeatsAPI(seat:ISeat[],thea_no:number|string) {
    if(demo)return {result:"ok"}
    let seatlist:{[key:string]:any[]}={};
    seat.map((seat,idx)=>seatlist[idx]=([seat.seat_no, seat.thea_no, seat.seat_grade_no]));
    let data = await axios.post(BASE_URL+"/seat/"+thea_no,seatlist,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(data);
    return data;
}
export async function updateSeatsAPI(seat:ISeat[],thea_no:number|string) {
    if(demo)return {result:"ok"}
    let seatlist:{[key:string]:any[]}={};
    seat.map((seat,idx)=>seatlist[idx]=([seat.seat_no, seat.thea_no, seat.seat_grade_no]));
    let data = await axios.put(BASE_URL+"/seat/"+thea_no,seatlist,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(data);
    return data;
}
export async function deleteTheaterAPI(thea_no:number|string) {
    if(demo)return {result:"ok"};
    let data = await axios.delete(BASE_URL+"/theater/"+thea_no,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(data);
    return data;
}
export async function editTheaterAPI(data:ITheater) {
    if(demo)return {result:"ok"};
    let message = await axios.put(BASE_URL+`/theater/${data.thea_no}`,data,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(message);
    return message;
}