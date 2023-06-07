import { IPeopleSelected } from './../interfaces/Ticket';
import * as api from "./api/api";
import IPayment, { IPayForm, IReceipt, ISeatInfo } from "../interfaces/Payment";
import { ISeats } from "../interfaces/Seat";
import ITicket from "../interfaces/Ticket";

export default class PaymentManager {
    public static async pay(data:IPayForm):Promise<string>{
        return await api.payAPI(data);
    }
    public static async getSeatInfo(pay_no:number|string):Promise<ISeatInfo[]>{
        return await api.getSeatInfoAPI(pay_no);
    }
    public static async getAllPaymentListData():Promise<IPayment[]>{
        return await api.getAllPaymentListDataAPI();
    }
    public static async getPaymentListData():Promise<IReceipt[]>{
        return await api.getPaymentListDataAPI();
    }
    public static async cancelReservations(pay_no:number|string){
        return await api.cancelReservationsAPI(pay_no);
    }
    public static async bookTickets(people:IPeopleSelected){
        let ticketString = `${people.adult} ${people.teen} ${people.senior} ${people.disabled} `+ people.detail2;
        return await api.bookTicketsAPI(people.ticketNumbers.join(" "), ticketString.slice(0,-1));
    }
    public static async getPaymentData(pay_id:number|string){
    }
    public static removePaymentData(cus_no:number|string):void{
    }

}