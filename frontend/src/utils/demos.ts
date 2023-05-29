import IGenre, { IMovieGrade, IPayMethod, ICustomerGrade, ISeatGrade } from "../interfaces/Codes"
import ICustomer from "../interfaces/Customer"
import IMovie from "../interfaces/Movie"
import IPayment from "../interfaces/Payment"
import ISchedule from "../interfaces/Schedule"
import ISeat, { ISeats } from "../interfaces/Seat"
import ITheater from "../interfaces/Theater"
import ITicket from "../interfaces/Ticket"

export const demoGenre:IGenre = {
    gen_no: "1",
    gen_nm: "코미디"
};
export const demoMovieGrade:IMovieGrade = {
    mov_grade_no: "18",
    mov_grade_nm: "18세"
};
export const demoPayMethod:IPayMethod = {
    pay_met_no: "1",
    pay_met_nm: "신용카드"
};
export const demoCustomerGrade:ICustomerGrade = {
    cus_grade_no: "1",
    cus_grade_nm: "일반고객"
};
export const demoSeatGrade:ISeatGrade =  {
    seat_grade_no: "1",
    seat_grade_nm: "일반좌석"
};
export const demoCustomer:ICustomer = {
    cus_no: "0",
    resident_no: "1",
    phone_no: "010-0000-0000",
    cus_nm: "손흥민",
    regi_date: new Date(),
    email: "heungmin@uos.ac.kr",
    address: "earth",
    cus_pw: "password",
    cus_grade_no: "10",
    cus_point: 9999999
};
export const demoCustomer2:ICustomer = {
    cus_no: "1",
    resident_no: "1",
    phone_no: "010-0000-0000",
    cus_nm: "김민재",
    regi_date: new Date(),
    email: "minjae@uos.ac.kr",
    address: "earth",
    cus_pw: "password",
    cus_grade_no: "10",
    cus_point: 9999999
};
export const demoCustomer3:ICustomer = {
    cus_no: "2",
    resident_no: "1",
    phone_no: "010-0000-0000",
    cus_nm: "강송모",
    regi_date: new Date(),
    email: "songmo@uos.ac.kr",
    address: "earth",
    cus_pw: "password",
    cus_grade_no: "10",
    cus_point: 9999999
};
export const demoCustomers:ICustomer[] = [demoCustomer, demoCustomer2, demoCustomer3];
export const demoMovie:IMovie = {
    mov_no: 87032,
    mov_nm: "너의 이름은",
    run_time_min: 120,
    mov_grade_no: "12",
    gen_no: "애니메이션",
    dir_nm: "신카이 마코토",
    act_nm: "미츠하, 타키쿤",
    mov_detail: "아직 만난 적 없는 너를, 찾고 있어.\nまだ会ったことのない君を、探している。",
    distributor: "TOHO",
    lang: "Japanese",
    image_url: "https://github.com/wldnd9904/DB_BoxOffice/blob/master/frontend/images/posters/87032_320.jpg?raw=true",
    release_date: new Date()
};
export const demoMovie2:IMovie = {
    mov_no: 87002,
    mov_nm: "문재인",
    run_time_min: 120,
    gen_no: "애니메이션",
    dir_nm: "신카이 마코토",
    act_nm: "미츠하, 타키쿤",
    mov_detail: "아직 만난 적 없는 너를, 찾고 있어.\nまだ会ったことのない君を、探している。",
    distributor: "TOHO",
    lang: "Japanese",
    image_url: "https://github.com/wldnd9904/DB_BoxOffice/blob/master/frontend/images/posters/87002_320.jpg?raw=true",
    mov_grade_no: "18",
    release_date: new Date()
};
export const demoMovie3:IMovie = {
    mov_no: 86995,
    mov_nm: "짱구",
    run_time_min: 120,
    mov_grade_no: "all",
    gen_no: "애니메이션",
    dir_nm: "신카이 마코토",
    act_nm: "미츠하, 타키쿤",
    mov_detail: "아직 만난 적 없는 너를, 찾고 있어.\nまだ会ったことのない君を、探している。",
    distributor: "TOHO",
    lang: "Japanese",
    image_url: "https://github.com/wldnd9904/DB_BoxOffice/blob/master/frontend/images/posters/86995_320.jpg?raw=true",
    release_date: new Date()
};
export const demoMovies:IMovie[] =[
    demoMovie,demoMovie2,demoMovie3,
    demoMovie,demoMovie2,demoMovie3,
    demoMovie,demoMovie2,demoMovie3
];
export const demoPayment:IPayment = {
    pay_no: "1",
    cus_no: "1",
    pay_met_no: "1",
    pay_state: false,
    pay_amount: 15000,
    pay_date: new Date(),
    pay_point: 0,
    pay_detail: "데모입니당"
};
export const demoSchedule:ISchedule ={
    sched_no: 0,
    mov_no: 87032,
    thea_no: 1,
    run_round: 1,
    run_type: "2D(더빙)",
    run_date: new Date(2023, 5, 10, 19, 20, 0),
    run_end_date: new Date(2023, 5, 10, 21, 20, 0)
};
export const demoSchedule2:ISchedule ={
    sched_no: 1,
    mov_no: 87032,
    thea_no: 1,
    run_round: 2,
    run_type: "2D(더빙)",
    run_date: new Date(2023, 5, 10, 21, 40, 0),
    run_end_date: new Date(2023, 5, 10, 23, 40, 0)
};
export const demoSchedule3:ISchedule ={
    sched_no: 2,
    mov_no: 87002,
    thea_no: 2,
    run_round: 1,
    run_type: "IMAX 4D",
    run_date: new Date(2023, 5, 10, 19, 0, 0),
    run_end_date: new Date(2023, 5, 10, 21, 0, 0)
};
export const demoSchedules:ISchedule[] = [demoSchedule,demoSchedule2,demoSchedule3];
export const demoSeats:ISeats = (() =>  {
    const demoV = ["A","B","C","D","E","F","G","H"];
    const demoH = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    var ret: ISeats = {};
    demoV.forEach((row) => {
        var tmpSeats:ISeat[] =[]; 
        demoH.forEach((column)=> {
            const tmpSeat:ISeat = {
                seat_no: column.toString(),
                thea_no: 1,
                seat_grade_no:"2",
            };
            tmpSeats.push(tmpSeat)
        });
        ret[row] = tmpSeats;
    });
    return ret;
})();
export const demoTheater: ITheater = {
    thea_no: 1,
    thea_nm: "1관",
    thea_loc: "2층"
};
export const demoTheater2: ITheater = {
    thea_no: 2,
    thea_nm: "2관",
    thea_loc: "2층"
};
export const demoTheater3: ITheater = {
    thea_no: 3,
    thea_nm: "3관",
    thea_loc: "3층"
};
export const demoTheaters: ITheater[] = [demoTheater,demoTheater2,demoTheater3];
export const demoTicket:ITicket = {
    tic_no: "1",
    sched_no: "1",
    seat_no: "1",
    thea_no: "1",
    pay_no: "1",
    cus_no: "1",
    price: 15000,
    reserv_date: new Date(),
    issue: false
};