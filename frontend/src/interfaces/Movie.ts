export interface IMovie{
    movieID: number|string;
    runningTime: number|string;
    grade: number|string;
    genre: number|string;
    director: string;
    actors: string;
    description: string;
    distributor: string;
    language: string;
    imageURL: string;
};

export const demoMovie:IMovie = {
    movieID: 87032,
    runningTime: 120,
    grade: "12",
    genre: "애니메이션",
    director: "신카이 마코토",
    actors: "미츠하, 타키쿤",
    description: "아직 만난 적 없는 너를, 찾고 있어.\nまだ会ったことのない君を、探している。",
    distributor: "TOHO",
    language: "Japanese",
    imageURL: "https://github.com/wldnd9904/DB_BoxOffice/blob/master/frontend/images/posters/87032_320.jpg?raw=true",
};

export const demoMovie2:IMovie = {
    movieID: 87032,
    runningTime: 120,
    grade: "18",
    genre: "애니메이션",
    director: "신카이 마코토",
    actors: "미츠하, 타키쿤",
    description: "아직 만난 적 없는 너를, 찾고 있어.\nまだ会ったことのない君を、探している。",
    distributor: "TOHO",
    language: "Japanese",
    imageURL: "https://github.com/wldnd9904/DB_BoxOffice/blob/master/frontend/images/posters/87002_320.jpg?raw=true",
};

export const demoMovie3:IMovie = {
    movieID: 87032,
    runningTime: 120,
    grade: "all",
    genre: "애니메이션",
    director: "신카이 마코토",
    actors: "미츠하, 타키쿤",
    description: "아직 만난 적 없는 너를, 찾고 있어.\nまだ会ったことのない君を、探している。",
    distributor: "TOHO",
    language: "Japanese",
    imageURL: "https://github.com/wldnd9904/DB_BoxOffice/blob/master/frontend/images/posters/86995_320.jpg?raw=true",
};

export const demoMovies:IMovie[] =[
    demoMovie,demoMovie2,demoMovie3,
    demoMovie,demoMovie2,demoMovie3,
    demoMovie,demoMovie2,demoMovie3
];