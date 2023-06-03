export default interface ICustomer {
    cus_no: number|string;
    resident_no: number|string;
    phone_no: number|string;
    cus_nm: number|string;
    regi_date: Date;
    email: string;
    address: string;
    cus_pw: string;
    cus_grade_no: number|string;
    cus_point: number;
}

export interface IRegisterForm extends ICustomer{
    password1: string;
    extraError?: string;
}

//비회원
export interface INCustomer {
    resident_no: number|string;
    phone_no: number|string;
    cus_nm: number|string;
    cus_pw: string;
}