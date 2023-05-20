export default interface ISeat {
    seat_no: number|string;
    thea_no: number|string;
    seat_grade_no: number|string;
}
export interface ISeats {
    [index:string]: ISeat[];
}