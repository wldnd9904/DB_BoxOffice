import IGenre, { IMovieGrade, IPayMethod, ICustomerGrade, ISeatGrade, ICode } from "../interfaces/Codes";
import * as api from "./api/code";

export default class CodeManager {
    public static async getGenreData():Promise<IGenre>{
        return await api.getGenreAPI();
    }
    public static async getMovieGradeData():Promise<IMovieGrade>{
        return await api.getMovieGradeAPI();
    }
    public static async getPayMethodData():Promise<IPayMethod>{
        return await api.getPayMethodAPI();
    }
    public static async getCustomerGradeData():Promise<ICustomerGrade>{
        return await api.getCustomerGradeAPI();
    }
    public static async getSeatGradeData():Promise<ISeatGrade>{
        return await api.getSeatGradeAPI();
    }
    public static async getCodeList(){
        return await api.getCodeListAPI();
    }
    public static async addCode(){
        await api.addCodeAPI();
    }
    public static async deleteCode(mov_no:number|string){
       // await api.deleteCodeAPI();
    }
    public static async editCode(CodeData:ICode){
        //await api.editCodeAPI();
    }
}