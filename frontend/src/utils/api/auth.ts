import { BASE_URL, demo } from "./api";
import * as demos from "../demos";
import axios from "axios";
import ICustomer, { IRegisterForm } from "../../interfaces/Customer";

export async function loginAPI(email:string,pw:string){
    if(demo)return demos.demoCustomer;
    const request={email:email, cus_pw:pw};
    let data = await axios.post(BASE_URL+"/auth/login/",request,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response).catch((error)=>error);
    console.log(data);
    return data;
}
export async function logoutAPI(){
    if(demo)return demos.demoCustomer;
    let error;
    let data = await axios.post(BASE_URL+"/auth/logout/",{},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response).catch((err)=>error=err);
    console.log(data);
    return data;
}
//회원가입
export async function registerAPI(data:IRegisterForm){
    if(demo)return {result:"ok"};
    //console.log(data);
    const result = await axios.post(BASE_URL+"/auth/signup/",data,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response).catch((error)=>error);
    return result;
}
export async function getUserDataAPI(cus_no:number|string):Promise<ICustomer>{
    if(demo)return demos.demoCustomer;
    let result = await axios.post<ICustomer>(BASE_URL+"//a",{cus_no},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response).catch((error)=>error);
    console.log(result);
    return result;
}
export async function getUserListDataAPI():Promise<ICustomer[]>{
    if(demo)return demos.demoCustomers;
    const result = await axios.post(BASE_URL+"/userlist",{},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response).catch((error)=>error);
    console.log(result);
    return result;
}
export async function deleteUserAPI(cus_no:number|string){
    if(demo)return {result:"ok"};
    let message = await axios.post(BASE_URL+"/userdelete",{cus_no},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response).catch((error)=>error);
    console.log(message);
    return message;
}
export async function editUserDataAPI(data:ICustomer){
    if(demo)return {result:"ok"};
    let message = await axios.post(BASE_URL+"/useredit",data,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response).catch((error)=>error);
    console.log(data);
    return message;
}
export async function editUserDataStaffAPI(data:ICustomer){
    if(demo)return {result:"ok"};
    let message = await axios.post(BASE_URL+"/useredit",data,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response).catch((error)=>error);
    console.log(data);
    return message;
}