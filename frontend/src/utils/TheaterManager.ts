import { atom, useRecoilState } from "recoil";
import * as api from "./api";
import ITheater from "../interfaces/Theater";

export default class TheaterManager{
    public static async getTheaterList(){
        return await api.getTheaterListAPI();
    }
    public static async addTheater(){
        await api.addTheaterAPI();
    }
    public static async deleteTheater(thea_no:number|string){
        await api.deleteTheaterAPI(thea_no);
    }
    public static async editTheater(theaterData:ITheater){
        await api.editTheaterAPI(theaterData);
    }
    /*
    public static async _useTheater(userID:string, thea_no:number){
        return await _useTheaterAPI(userID, thea_no);
    }
    public static async grantTheater(userID:string, thea_no:number){
        return await grantTheaterAPI(userID, thea_no);
    }




    
    */
}