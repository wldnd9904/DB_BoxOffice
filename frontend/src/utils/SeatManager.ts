import { demoSeats } from './demos';
import { atom, useRecoilState } from "recoil";
import * as api from "./api/seat";
import ITheater from "../interfaces/Theater";
import ISeat, { ISeatIssueList, ISeats } from '../interfaces/Seat';
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
    public static async getIssueList(sched_no:number|string):Promise<ISeatIssueList>{
        const tmpIssueList:{tic_no:number, seat_no:string, issue: number}[] = await api.getIssueListAPI(sched_no);
        let retIssueList:ISeatIssueList = {}
        tmpIssueList.forEach((item)=>{
            retIssueList[item.seat_no]={tic_no:item.tic_no, issue:(item.issue!=0)};
        });
        console.log("seat",retIssueList)
        return retIssueList;
    }
   /* public static async getTickets(thea_no:number|string):Promise<ITicketSeats>{
        if(demo)return {};
        let seatData:ISeat[] = await api.getSeatsAPI(thea_no);
        let ticketData:ITicket[] = await api.getTicketsAPI(thea_no);
        let tmpSeat:ITicketSeats = {}; 
        for(let i in seatData){
            let tmpTicketSeat:ITicketSeat = {
                tic_no: ticketData[i].tic_no,
                sched_no: ticketData[i].sched_no,
                seat_no: seatData[i].seat_no,
                thea_no: ticketData[i].thea_no,
                pay_no: ticketData[i].pay_no,
                cus_no: ticketㅇ,
                price: 0,
                reserv_date: undefined,
                issue: false,
                seat_grade_no: ''
            };
                if(tmpSeat[(seat.seat_no as string)[0]] == undefined) tmpSeat[(seat.seat_no as string)[0]]=[];
                tmpSeat[(seat.seat_no as string)[0]].push({
                    seat_no: parseInt((seat.seat_no as string).slice(1)),
                    seat_grade_no: seat.seat_grade_no,
                    thea_no: thea_no
                });
            })
        }
        return tmpSeat;
    }*/
}