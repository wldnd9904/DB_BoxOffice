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

export const demoTicket:ITicket = {
    tic_no: "1",
    sched_no: "1",
    seat_no: "1",
    thea_no: "1",
    pay_no: "1",
    cus_no: "1",
    price: 15000,
    reserv_date: new Date(),
    issue: false
}