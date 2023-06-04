import IGenre, { ICode, ICustomerGrade, IMovieGrade, IPayMethod, ISeatGrade } from './../../interfaces/Codes';
import { BASE_URL, demo } from "./api";
import * as demos from "../demos";
import axios from "axios";

export async function getCustomerGradeAPI():Promise<ICustomerGrade> {
    if(demo)return demos.demoCustomerGrade;
    let message = await axios.get(BASE_URL+"/code/003",{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    let gradeSet:ICustomerGrade = {};
    message.forEach((data:{detail_code_no:string, detail_code_nm:string})=>{
        gradeSet[data.detail_code_no] = {cus_grade_no: data.detail_code_no, cus_grade_nm: data.detail_code_nm};
    })
    console.log(gradeSet)
    return gradeSet;
}
export async function getSeatGradeAPI():Promise<ISeatGrade> {
    if(demo)return demos.demoSeatGrade;
    let message = await axios.get(BASE_URL+"/code/005",{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    let gradeSet:ISeatGrade = {};
    message.forEach((data:{detail_code_no:string, detail_code_nm:string})=>{
        gradeSet[data.detail_code_no] = {seat_grade_no: data.detail_code_no, seat_grade_nm: data.detail_code_nm};
    })
    console.log(gradeSet)
    return gradeSet;
}
export async function getGenreAPI():Promise<IGenre> {
    if(demo)return demos.demoGenre;
    let message = await axios.get(BASE_URL+"/code/001",{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    let gradeSet:IGenre = {};
    message.forEach((data:{detail_code_no:string, detail_code_nm:string})=>{
        gradeSet[data.detail_code_no] = {gen_no: data.detail_code_no, gen_nm: data.detail_code_nm};
    })
    console.log(gradeSet)
    return gradeSet;
}

export async function getMovieGradeAPI():Promise<IMovieGrade> {
    if(demo)return demos.demoMovieGrade;
    let message = await axios.get(BASE_URL+"/code/002",{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    let gradeSet:IMovieGrade = {};
    message.forEach((data:{detail_code_no:string, detail_code_nm:string})=>{
        gradeSet[data.detail_code_no] = {mov_grade_no: data.detail_code_no, mov_grade_nm: data.detail_code_nm};
    })
    console.log("df")
    return gradeSet;
}

export async function getPayMethodAPI():Promise<IPayMethod> {
    if(demo)return demos.demoPayMethod;
    let message = await axios.get(BASE_URL+"/code/004",{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    let gradeSet:IPayMethod = {};
    message.forEach((data:{detail_code_no:string, detail_code_nm:string})=>{
        gradeSet[data.detail_code_no] = {pay_met_no: data.detail_code_no, pay_met_nm: data.detail_code_nm};
    })
    console.log(gradeSet)
    return gradeSet;
}

export async function getCodeListAPI():Promise<ICode[]>{
    if(demo)return [];
    let message = await axios.get(BASE_URL+"/code/",{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>response.data).catch((error)=>error);
    console.log(message);
    return message;
}

export async function addCodeAPI() {
    throw new Error("Function not implemented.");
}

export async function deleteCodeAPI(code_no: string) {
    throw new Error("Function not implemented.");
}

export async function editCodeAPI(CodeData: ICode) {
    throw new Error("Function not implemented.");
}

