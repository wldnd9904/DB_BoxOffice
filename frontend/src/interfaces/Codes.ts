export interface ICode {
    [index:string]:string;
    detail_code_no: string;
    detail_code_nm: string;
    code_no: string;
}
export default interface IGenre {
    [index:string]:{
        gen_no: string;
        gen_nm: string;
    }
}
export interface IMovieGrade {
    [index:string]:{
        mov_grade_no: string;
        mov_grade_nm: string;
    }
}
export interface IPayMethod {
    [index:string]:{
        pay_met_no: string;
        pay_met_nm: string;
    }
}
export interface ICustomerGrade {
    [index:string]:{
        cus_grade_no: string;
        cus_grade_nm: string;
    }
}
export interface ISeatGrade {
    [index:string]:{
        seat_grade_no: string;
        seat_grade_nm: string;
    }
}
