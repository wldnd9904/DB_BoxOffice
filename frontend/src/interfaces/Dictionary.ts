export interface IDictionary {
    [key:string]:string;
}

export const ICustomerDictionary:IDictionary = {
    ["cus_no"]: "고객번호",
    ["resident_no"]: "주민등록번호",
    ["phone_no"]: "휴대전화번호",
    ["cus_nm"]: "고객명",
    ["regi_date"]: "가입일",
    ["email"]: "이메일",
    ["address"]: "주소",
    ["cus_pw"]: "비밀번호",
    ["cus_grade_no"]: "고객등급",
    ["cus_point"]: "포인트"
}

export const ICodeDictionary:IDictionary = {
    ["detail_code_no"]: "상세코드번호",
    ["detail_code_nm"]: "상세코드명",
    ["code_no"]: "코드번호",
}

export const ITicketDictionary:IDictionary = {
    ["tic_no"]: "티켓번호",
    ["sched_no"]: "상영일정정보",
    ["seat_no"]: "좌석번호",
    ["thea_no"]: "상영관번호",
    ["pay_no"]: "결제번호",
    ["cus_no"]: "고객번호",
    ["price"]: "표준가격",
    ["reserv_date"]: "예약일시",
    ["issue"]: "발권여부",
}

export const ITheaterDictionary:IDictionary = {
    ["thea_no"]: "상영관번호",
    ["thea_nm"]: "상영관이름",
    ["thea_loc"]: "상영관위치",
}

export const IScheduleDictionary:IDictionary = {
    ["sched_no"]: "상영일정번호",
    ["mov_no"]: "영화번호",
    ["thea_no"]: "상영관번호",
    ["run_round"]: "상영회차",
    ["run_type"]: "상영종류",
    ["run_date"]: "상영시작일시",
    ["run_end_date"]: "상영종료일시",
}

export const IPaymentDictionary:IDictionary = {
    ["pay_no"]: "결제번호",
    ["cus_no"]: "고객번호",
    ["pay_met_no"]: "결제방법",
    ["pay_state"]: "결재상태",
    ["pay_amount"]: "결제금액",
    ["pay_date"]: "결제일시",
    ["pay_point"]: "결제포인트",
    ["pay_detail"]: "결제세부정보",
}

export const IMovieDictionary:IDictionary = {
    ["mov_no"]: "영화번호",
    ["mov_nm"]: "영화명",
    ["run_time_min"]: "상영시간(분)",
    ["mov_grade_no"]: "영화등급",
    ["gen_no"]: "장르",
    ["dir_nm"]: "감독명",
    ["act_nm"]: "배우명",
    ["mov_detail"]: "영화상세정보",
    ["distributor"]: "배급사",
    ["lang"]: "언어",
    ["image_url"]: "이미지URL",
    ["release_date"]: "개봉일",
};