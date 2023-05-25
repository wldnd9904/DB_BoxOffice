export default interface ICustomer {
    cus_no: number|string;
    resident_no: number|string;
    phone_no: number|string;
    cus_nm: number|string;
    regi_date: Date;
    email: string;
    address: string;
    password: string;
    cus_grade_no: number|string;
    point: number;
}

export interface IRegisterForm extends ICustomer{
    password1: string;
    extraError?: string;
}
