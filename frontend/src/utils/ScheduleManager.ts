
import * as api from "./api/api";
import IPayment from "../interfaces/Payment";
import { ISeats } from "../interfaces/Seat";
import ISchedule from "../interfaces/Schedule";

export default class ScheduleManager {
    public static async getAllScheduleList():Promise<ISchedule[]>{
        let tmpSchedules:ISchedule[] = await api.getAllScheduleListAPI();
        let tmpSchedules2:ISchedule[] = []
        for(let i in tmpSchedules){
            tmpSchedules2.push({
                sched_no: tmpSchedules[i].sched_no,
                mov_no: tmpSchedules[i].sched_no,
                thea_no: tmpSchedules[i].thea_no,
                run_round: tmpSchedules[i].run_round,
                run_type: tmpSchedules[i].run_type,
                run_date: new Date(tmpSchedules[i].run_date),
                run_end_date: new Date(tmpSchedules[i].run_end_date),
            })
        }
        console.log(tmpSchedules);
        return tmpSchedules;
    }
    public static async deleteSchedule(sched_no:number|string){
        return await api.deleteScheduleAPI(sched_no);
    }
    public static async addSchedule(data:ISchedule){
        return await api.addScheduleAPI(data);
    }
    public static async editSchedule(schedule:ISchedule){
        return await api.editScheduleAPI(schedule);
    }
    public static async getTicketSchedule(tic_no:number|string):Promise<ISchedule>{
        return await api.getTicketScheduleAPI(tic_no);
    }
}