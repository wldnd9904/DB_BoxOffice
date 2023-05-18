export default interface ISchedule {
    sched_no: number|string;
    mov_no: number|string;
    thea_no: number|string;
    round: number; //상영회차
    run_type: string; //상영종류
    run_date: Date;
    run_end_date: Date;
}

export const demoSchedule:ISchedule ={
    sched_no: 0,
    mov_no: 87032,
    thea_no: 1,
    round: 1,
    run_type: "2D(더빙)",
    run_date: new Date(2023, 5, 10, 19, 20, 0),
    run_end_date: new Date(2023, 5, 10, 21, 20, 0)
};
export const demoSchedule2:ISchedule ={
    sched_no: 1,
    mov_no: 87032,
    thea_no: 1,
    round: 2,
    run_type: "2D(더빙)",
    run_date: new Date(2023, 5, 10, 21, 40, 0),
    run_end_date: new Date(2023, 5, 10, 23, 40, 0)
};
export const demoSchedule3:ISchedule ={
    sched_no: 2,
    mov_no: 87002,
    thea_no: 2,
    round: 1,
    run_type: "IMAX 4D",
    run_date: new Date(2023, 5, 10, 19, 0, 0),
    run_end_date: new Date(2023, 5, 10, 21, 0, 0)
};
export const demoSchedules:ISchedule[] = [demoSchedule,demoSchedule2,demoSchedule3];