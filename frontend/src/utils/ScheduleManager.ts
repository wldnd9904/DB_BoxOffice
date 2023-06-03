
import { demoPayment } from "./demos";
import * as api from "./api/api";
import IPayment from "../interfaces/Payment";
import { ISeats } from "../interfaces/Seat";
import ISchedule from "../interfaces/Schedule";

export default class ScheduleManager {
    public static async getAllScheduleList():Promise<ISchedule[]>{
        let tmpSchedules:ISchedule[] = await api.getAllScheduleListAPI();
        for(let i in tmpSchedules){
            tmpSchedules[i].run_date = new Date(tmpSchedules[i].run_date);
            tmpSchedules[i].run_end_date = new Date(tmpSchedules[i].run_end_date);
        }
        return tmpSchedules;
    }
    public static async deleteSchedule(sched_no:number|string){
        return await api.deleteScheduleAPI(sched_no);
    }
    public static async editSchedule(schedule:ISchedule){
        return await api.editScheduleAPI(schedule);
    }
    public static async getMovieSchedule(mov_no:number|string):Promise<ISchedule[]>{
        return await api.getMovieScheduleAPI(mov_no);
    }
    public static async getTicketSchedule(tic_no:number|string):Promise<ISchedule>{
        return await api.getTicketScheduleAPI(tic_no);
    }
}