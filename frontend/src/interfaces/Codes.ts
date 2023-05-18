export interface IGenre {
    gen_no: number|string;
    gen_nm: string;
}
export interface IMovieGrade {
    mov_grade_no: number|string;
    mov_grade_nm: string;
}
export interface IPayMethod {
    pay_met_no: number|string;
    pay_met_nm: string;
}
export interface ICustomerGrade {
    cus_grade_no: number|string;
    cus_grade_nm: string;
}
export interface ISeatGrade {
    seat_grade_no: number|string;
    seat_grade_nm: string;
}


export const  demoGenre:IGenre = {
    gen_no: "1",
    gen_nm: "코미디"
}
export const  demoMovieGrade:IMovieGrade = {
    mov_grade_no: "18",
    mov_grade_nm: "18세"
}
export const  demoPayMethod:IPayMethod = {
    pay_met_no: "1",
    pay_met_nm: "신용카드"
}
export const  demoCustomerGrade:ICustomerGrade = {
    cus_grade_no: "1",
    cus_grade_nm: "일반고객"
}
export const  demoSeatGrade:ISeatGrade =  {
    seat_grade_no: "1",
    seat_grade_nm: "일반좌석"
}
