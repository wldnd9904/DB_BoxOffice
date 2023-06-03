
import { demoPayment } from "./demos";
import * as api from "./api/api";
import IPayment from "../interfaces/Payment";
import { ISeats } from "../interfaces/Seat";
import ISchedule from "../interfaces/Schedule";

export default class ScheduleManager {
    public static ():void{
    }
    public static async getMovieSchedule(mov_no:number|string):Promise<ISchedule[]>{
        return await api.getMovieScheduleAPI(mov_no);
    }
    public static async getTicketSchedule(tic_no:number|string):Promise<ISchedule>{
        return await api.getTicketScheduleAPI(tic_no);
    }
}