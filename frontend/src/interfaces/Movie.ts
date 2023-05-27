export default interface IMovie{
    [index:string]:any;
    mov_no: number|string;
    mov_nm: string;
    run_time_min: number|string;
    mov_grade_no: number|string;
    gen_no: number|string;
    dir_nm: string;
    act_nm: string;
    mov_detail: string;
    distributor: string;
    lang: string;
    image_url: string;
    release_date:Date;
};