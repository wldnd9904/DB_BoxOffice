import { atom, useRecoilState } from "recoil";
import * as api from "./api/theater";
import ITheater from "../interfaces/Theater";
import ISeat, { ISeats } from "../interfaces/Seat";

export default class TheaterManager{
    public static async putSeats(seats:ISeats, thea_no:string|number){
        console.log(seats);
        console.log("----");
        let tmpSeats:ISeat[] = [];
        Object.keys(seats).forEach((label:string) => {
            seats[label].forEach((seat:ISeat) => {
                let tmpSeat:ISeat = {
                    seat_no: label+(seat.seat_no).toString().padStart(2,'0'),
                    thea_no: thea_no,
                    seat_grade_no: seat.seat_grade_no
                }
                tmpSeats.push(tmpSeat);
            })
        })
        console.log(tmpSeats);
        return await api.putSeatsAPI(tmpSeats,thea_no);
    }
    public static async updateSeats(seats:ISeats, thea_no:string|number){
        console.log(seats);
        console.log("----");
        let tmpSeats:ISeat[] = [];
        Object.keys(seats).forEach((label:string) => {
            seats[label].forEach((seat:ISeat) => {
                let tmpSeat:ISeat = {
                    seat_no: label+(seat.seat_no).toString().padStart(2,'0'),
                    thea_no: thea_no,
                    seat_grade_no: seat.seat_grade_no
                }
                tmpSeats.push(tmpSeat);
            })
        })
        console.log(tmpSeats);
        return await api.updateSeatsAPI(tmpSeats,thea_no);
    }
    public static async getTheater(thea_no:number|string):Promise<ITheater>{
        return await api.getTheaterAPI(thea_no);
    }
    public static async getTheaterList(){
        return await api.getTheaterListAPI();
    }
    public static async addTheater(data:ITheater){
        await api.addTheaterAPI(data);
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