import { BASE_URL, demo } from "./api";
import * as demos from "../demos";
import axios from "axios";
import IMovie from "../../interfaces/Movie";

export async function getMovieAPI(mov_no: string | number):Promise<IMovie> {
    if(demo) return demos.demoMovie;
    let data = await axios.get(BASE_URL+"/movie/").then((response)=>response.data).catch((error)=>error);
    console.log(data);
    return data;
}
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