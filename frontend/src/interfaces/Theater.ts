export interface ITheater {
    theaterID: number|string;
    name: string;
    location: string;
}
export interface ISeat {
    seatID: string;
    class: string;
}

export const demoTheater: ITheater = {
    theaterID: 1,
    name: "1관",
    location: "2층"
}
export const demoTheater2: ITheater = {
    theaterID: 2,
    name: "2관",
    location: "2층"
}
export const demoTheater3: ITheater = {
    theaterID: 3,
    name: "3관",
    location: "3층"
}
export const demoTheaters: ITheater[] = [demoTheater,demoTheater2,demoTheater3];
