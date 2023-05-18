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

export const demoPayment:IPayment = {
    pay_no: "1",
    cus_no: "1",
    pay_met_no: "1",
    pay_state: false,
    pay_amount: 15000,
    pay_date: new Date(),
    pay_point: 0,
    pay_detail: "데모입니당"
}