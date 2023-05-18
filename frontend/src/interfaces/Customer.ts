export interface ICustomer {
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

export const demoCustomer:ICustomer = {
    cus_no: "1",
    resident_no: "1",
    phone_no: "010-0000-0000",
    cus_nm: "1",
    regi_date: new Date(),
    email: "wldnd9904@uos.ac.kr",
    address: "earth",
    password: "password",
    cus_grade_no: "1",
    point: 9999999
}