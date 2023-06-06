export default interface ITicket {
    [index:string]:any;
    tic_no: number|string;
    sched_no: number|string;
    seat_no: number|string;
    thea_no: number|string;
    pay_no: number|string;
    cus_no: number|string;
    price: number;
    reserv_date: Date;
    issue: boolean;
}

export interface IPeopleSelected {
    adult:number;
    teen:number;
    senior:number;
    disabled:number;
    detail:string;
    detail2:string;
    ticketNumbers:number[];
}