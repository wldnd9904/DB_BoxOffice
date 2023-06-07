export default interface ISchedule {
    [index:string]:any;
    sched_no: number|string;
    mov_no: number|string;
    thea_no: number|string;
    run_round: number; //상영회차
    run_type: string; //상영종류
    run_date: Date;
    run_end_date: Date;
    //추가사항
    max_people?:number;
    cur_people?:number;
    thea_nm?:string;
}
