export interface ITheater {
    thea_no: number|string;
    thea_nm: string;
    thea_loc: string;
}
export const demoTheater: ITheater = {
    thea_no: 1,
    thea_nm: "1관",
    thea_loc: "2층"
}
export const demoTheater2: ITheater = {
    thea_no: 2,
    thea_nm: "2관",
    thea_loc: "2층"
}
export const demoTheater3: ITheater = {
    thea_no: 3,
    thea_nm: "3관",
    thea_loc: "3층"
}
export const demoTheaters: ITheater[] = [demoTheater,demoTheater2,demoTheater3];