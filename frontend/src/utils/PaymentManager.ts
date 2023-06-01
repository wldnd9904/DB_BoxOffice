
import { demoPayment } from "./demos";
import * as api from "./api";
import IPayment from "../interfaces/Payment";
import { ISeats } from "../interfaces/Seat";
import ITicket from "../interfaces/Ticket";

export default class PaymentManager {
    public static async getAllPaymentListData():Promise<IPayment[]>{
        return await api.getAllPaymentListDataAPI();
    }
    public static async getPaymentListData(cus_no:number|string):Promise<IPayment[]>{
        return await api.getPaymentListDataAPI(cus_no);
    }
    public static async getPaymentTickets(pay_no:number|string):Promise<ITicket[]>{
        return await api.getPaymentTicketsAPI(pay_no);
    }
    public static async getPaymentData(pay_id:number|string){
    }
    public static removePaymentData(cus_no:number|string):void{
    }
}