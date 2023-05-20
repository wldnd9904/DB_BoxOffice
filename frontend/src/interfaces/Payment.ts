export default interface IPayment {
    pay_no: number|string;
    cus_no: number|string;
    pay_met_no: number|string;
    pay_state: boolean;
    pay_amount: number;
    pay_date: Date;
    pay_point: number;
    pay_detail: string;
}