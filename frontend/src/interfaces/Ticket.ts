export default interface ITicket {
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