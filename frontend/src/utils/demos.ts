import IGenre, { IMovieGrade, IPayMethod, ICustomerGrade, ISeatGrade } from "../interfaces/Codes"
import ICustomer from "../interfaces/Customer"
import IMovie from "../interfaces/Movie"
import IPayment, { IReceipt } from "../interfaces/Payment"
import ISchedule from "../interfaces/Schedule"
import ISeat, { ISeats } from "../interfaces/Seat"
import ITheater from "../interfaces/Theater"
import ITicket from "../interfaces/Ticket"

export const demoGenre:IGenre = {
    ["CD00101"]:{gen_no: "CD00101",gen_nm: "스릴러 demo"},
    ["CD00102"]:{gen_no: "CD00102",gen_nm: "액션 demo"},
    ["CD00103"]:{gen_no: "CD00103",gen_nm: "어드벤쳐 demo"},
    ["CD00104"]:{gen_no: "CD00104",gen_nm: "SF demo"},
    ["CD00105"]:{gen_no: "CD00105",gen_nm: "애니메이션 demo"},
};
export const demoMovieGrade:IMovieGrade = {
    ["CD00200"]:{mov_grade_no: "CD00200",mov_grade_nm: "전체이용가 demo"},
    ["CD00201"]:{mov_grade_no: "CD00201",mov_grade_nm: "12세 demo"},
    ["CD00202"]:{mov_grade_no: "CD00202",mov_grade_nm: "15세 demo"},
    ["CD00203"]:{mov_grade_no: "CD00203",mov_grade_nm: "청불 demo"},
    ["CD00204"]:{mov_grade_no: "CD00204",mov_grade_nm: "제한 demo"},
};
export const demoPayMethod:IPayMethod = {
    ["CD00400"]:{pay_met_no: "CD00400",pay_met_nm: "신용카드"},
    ["CD00401"]:{pay_met_no: "CD00401",pay_met_nm: "휴대폰결제"},
    ["CD00402"]:{pay_met_no: "CD00402",pay_met_nm: "간편결제"},
};
export const demoCustomerGrade:ICustomerGrade = {
    ["CD00300"]:{cus_grade_nm:"관리자 demo",cus_grade_no:"CD00300"},
    ["CD00301"]:{cus_grade_nm:"비회원 demo",cus_grade_no:"CD00301"},
    ["CD00302"]:{cus_grade_nm:"일반 demo",cus_grade_no:"CD00302"},
    ["CD00303"]:{cus_grade_nm:"VIP demo",cus_grade_no:"CD00303"},
}
export const demoSeatGrade:ISeatGrade =  {
    ["CD00500"]:{seat_grade_no: "CD00500", seat_grade_nm: "빈 좌석 demo"},
    ["CD00501"]:{seat_grade_no: "CD00501", seat_grade_nm: "일반석 demo"},
    ["CD00502"]:{seat_grade_no: "CD00502", seat_grade_nm: "장애인석 demo"},
    ["CD00503"]:{seat_grade_no: "CD00503", seat_grade_nm: "Light석 demo"},
    ["CD00504"]:{seat_grade_no: "CD00504", seat_grade_nm: "SWEETBOX demo"},
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
    cus_grade_no: "CD00301",
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
    cus_grade_no: "CD00301",
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
    cus_grade_no: "CD00300",
    cus_point: 9999999
};
export const demoCustomers:ICustomer[] = [demoCustomer, demoCustomer2, demoCustomer3];
export const demoMovie:IMovie = {
    mov_no: 87032,
    mov_nm: "너의 이름은",
    run_time_min: 120,
    mov_grade_no: "CD00201",
    gen_no: "CD00104",
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
    mov_nm: "문재인입니다",
    run_time_min: 120,
    gen_no: "CD00100",
    dir_nm: "신카이 마코토",
    act_nm: "미츠하, 타키쿤",
    mov_detail: "아직 만난 적 없는 너를, 찾고 있어.\nまだ会ったことのない君を、探している。",
    distributor: "TOHO",
    lang: "Japanese",
    image_url: "https://github.com/wldnd9904/DB_BoxOffice/blob/master/frontend/images/posters/87002_320.jpg?raw=true",
    mov_grade_no: "CD00203",
    release_date: new Date()
};
export const demoMovie3:IMovie = {
    mov_no: 86995,
    mov_nm: "극장판 짱구는 못말려: 동물소환 닌자 배꼽수비대",
    run_time_min: 120,
    mov_grade_no: "CD00200",
    gen_no: "CD00104",
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
export const demoPayment1:IPayment = {
    pay_no: "1",
    cus_no: "1",
    pay_met_no: "CD00400",
    pay_state: false,
    pay_amount: 15000,
    pay_date: new Date(),
    pay_point: 0,
    pay_detail: "A1 A2",
};
export const demoPayment2:IPayment = {
    pay_no: "1",
    cus_no: "1",
    pay_met_no: "CD00400",
    pay_state: false,
    pay_amount: 15000,
    pay_date: new Date(),
    pay_point: 0,
    pay_detail: "A1 A2",
};

export const demoReceipt1:IReceipt = {
    pay_no: "1",
    cus_no: "1",
    pay_met_no: "CD00400",
    pay_state: false,
    pay_amount: 15000,
    pay_date: new Date(),
    pay_point: 0,
    pay_detail: "A1 A2",
    mov_no: "",
    run_type: "",
    run_date: new Date(),
    run_end_date: new Date(),
    thea_nm: "",
    thea_loc: ""
};
export const demoReceipt2:IReceipt = {
    pay_no: "1",
    cus_no: "1",
    pay_met_no: "CD00400",
    pay_state: false,
    pay_amount: 15000,
    pay_date: new Date(),
    pay_point: 0,
    pay_detail: "A3 A4",
    mov_no: "",
    run_type: "",
    run_date: new Date(),
    run_end_date: new Date(),
    thea_nm: "",
    thea_loc: ""
};

export const demoSchedule:ISchedule ={
    sched_no: 0,
    mov_no: 87032,
    thea_no: 1,
    run_round: 1,
    run_type: "2D(더빙)",
    run_date: new Date(2023, 5, 6, 19, 20, 0),
    run_end_date: new Date(2023, 5, 6, 21, 20, 0)
};
export const demoSchedule2:ISchedule ={
    sched_no: 1,
    mov_no: 87032,
    thea_no: 1,
    run_round: 2,
    run_type: "2D(더빙)",
    run_date: new Date(2023, 5, 7, 21, 40, 0),
    run_end_date: new Date(2023, 5, 7, 23, 40, 0)
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
                seat_grade_no:row==="A"?"CD00503":"CD00501",
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
    seat_no: "A11",
    thea_no: "1",
    pay_no: "1",
    cus_no: "1",
    price: 15000,
    reserv_date: new Date(),
    issue: false
};
export const demoTicket2:ITicket = {
    tic_no: "2",
    sched_no: "1",
    seat_no: "A12",
    thea_no: "1",
    pay_no: "1",
    cus_no: "1",
    price: 15000,
    reserv_date: new Date(),
    issue: false
};

export const demoSeatInfos = [
    {seat:"장애인석",price:13000,count:3},
    {seat:"일반석",price:10000,count:3}
];