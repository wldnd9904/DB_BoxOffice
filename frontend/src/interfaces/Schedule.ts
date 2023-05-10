export interface ISchedule {
    scheduleID: number;
    movieID: number|string;
    theaterID: number|string;
    round: number; //상영회차
    type: string; //상영종류
    startAt: Date;
    endAt: Date;
}

export const demoSchedule:ISchedule ={
    scheduleID: 0,
    movieID: 87032,
    theaterID: 1,
    round: 1,
    type: "2D(더빙)",
    startAt: new Date(2023, 5, 10, 19, 20, 0),
    endAt: new Date(2023, 5, 10, 21, 20, 0)
};
export const demoSchedule2:ISchedule ={
    scheduleID: 1,
    movieID: 87032,
    theaterID: 1,
    round: 2,
    type: "2D(더빙)",
    startAt: new Date(2023, 5, 10, 21, 40, 0),
    endAt: new Date(2023, 5, 10, 23, 40, 0)
};
export const demoSchedule3:ISchedule ={
    scheduleID: 2,
    movieID: 87002,
    theaterID: 2,
    round: 1,
    type: "IMAX 4D",
    startAt: new Date(2023, 5, 10, 19, 0, 0),
    endAt: new Date(2023, 5, 10, 21, 0, 0)
};
export const demoSchedules:ISchedule[] = [demoSchedule,demoSchedule2,demoSchedule3];