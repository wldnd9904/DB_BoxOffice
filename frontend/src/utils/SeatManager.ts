import { demoSeats } from './demos';
import { atom, useRecoilState } from "recoil";
import * as api from "./api/seat";
import ITheater from "../interfaces/Theater";
import ISeat, { ISeats } from "../interfaces/Seat";
import { demo } from './api/api';

export default class SeatManager{
    public static async getSeats(thea_no:number|string):Promise<ISeats>{
        if(demo)return demoSeats;
        let apiData:ISeat[] = await api.getSeatsAPI(thea_no);
        let tmpSeat:ISeats = {}; 
        apiData.forEach((seat:ISeat) => {
            if(tmpSeat[(seat.seat_no as string)[0]] == undefined) tmpSeat[(seat.seat_no as string)[0]]=[];
            tmpSeat[(seat.seat_no as string)[0]].push({
                seat_no: parseInt((seat.seat_no as string).slice(1)),
                seat_grade_no: seat.seat_grade_no,
                thea_no: thea_no
            });
        })
        return tmpSeat;
    }
}