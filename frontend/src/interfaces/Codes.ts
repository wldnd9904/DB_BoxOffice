export default interface IGenre {
    [index:number|string]:{
        gen_no: number|string;
        gen_nm: string;
    }
}
export interface IMovieGrade {
    [index:number|string]:{
        mov_grade_no: number|string;
        mov_grade_nm: string;
    }
}
export interface IPayMethod {
    [index:number|string]:{
        pay_met_no: number|string;
        pay_met_nm: string;
    }
}
export interface ICustomerGrade {
    [index:number|string]:{
        cus_grade_no: number|string;
        cus_grade_nm: string;
    }
}
export interface ISeatGrade {
    [index:number|string]:{
        seat_grade_no: number|string;
        seat_grade_nm: string;
    }
}
