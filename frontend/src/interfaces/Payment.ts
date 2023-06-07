export default interface IPayment {
    [index:string]:any;
    pay_no: number|string;
    cus_no: number|string;
    pay_met_no: number|string;
    pay_state: boolean;
    pay_amount: number;
    pay_date: Date;
    pay_point: number;
    pay_detail: string;
}

export interface IReceipt {
    [index:string]:any;
    cus_no: number|string;
    pay_no: number|string;
    pay_met_no?: number|string;
    pay_state: boolean;
    pay_amount: number;
    pay_date?: Date;
    pay_point?: number;
    pay_detail: string;
    mov_no: number|string;
    run_type: string;
    run_date: Date;
    run_end_date: Date;
    thea_nm: string;
    thea_loc: string;
}

export interface IPayForm {
    pay_no:number|string;
    pay_met_no: number|string;
    pay_point:number;
}

export interface ISeatInfo {
    seat:string;
    count:number;
    price:number;
}