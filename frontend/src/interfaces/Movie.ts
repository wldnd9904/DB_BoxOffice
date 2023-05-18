export default interface IMovie{
    mov_no: number|string;
    mov_nm: string;
    run_time_min: number|string;
    grade_no: number|string;
    gen_no: number|string;
    dir_nm: string;
    act_nm: string;
    mov_detail: string;
    distributor: string;
    lan: string;
    image_url: string;
};


export const demoMovie:IMovie = {
    mov_no: 87032,
    mov_nm: "너의 이름은",
    run_time_min: 120,
    grade_no: "12",
    gen_no: "애니메이션",
    dir_nm: "신카이 마코토",
    act_nm: "미츠하, 타키쿤",
    mov_detail: "아직 만난 적 없는 너를, 찾고 있어.\nまだ会ったことのない君を、探している。",
    distributor: "TOHO",
    lan: "Japanese",
    image_url: "https://github.com/wldnd9904/DB_BoxOffice/blob/master/frontend/images/posters/87032_320.jpg?raw=true",
};

export const demoMovie2:IMovie = {
    mov_no: 87002,
    mov_nm: "문재인",
    run_time_min: 120,
    grade_no: "18",
    gen_no: "애니메이션",
    dir_nm: "신카이 마코토",
    act_nm: "미츠하, 타키쿤",
    mov_detail: "아직 만난 적 없는 너를, 찾고 있어.\nまだ会ったことのない君を、探している。",
    distributor: "TOHO",
    lan: "Japanese",
    image_url: "https://github.com/wldnd9904/DB_BoxOffice/blob/master/frontend/images/posters/87002_320.jpg?raw=true",
};

export const demoMovie3:IMovie = {
    mov_no: 86995,
    mov_nm: "짱구",
    run_time_min: 120,
    grade_no: "all",
    gen_no: "애니메이션",
    dir_nm: "신카이 마코토",
    act_nm: "미츠하, 타키쿤",
    mov_detail: "아직 만난 적 없는 너를, 찾고 있어.\nまだ会ったことのない君を、探している。",
    distributor: "TOHO",
    lan: "Japanese",
    image_url: "https://github.com/wldnd9904/DB_BoxOffice/blob/master/frontend/images/posters/86995_320.jpg?raw=true",
};

export const demoMovies:IMovie[] =[
    demoMovie,demoMovie2,demoMovie3,
    demoMovie,demoMovie2,demoMovie3,
    demoMovie,demoMovie2,demoMovie3
];