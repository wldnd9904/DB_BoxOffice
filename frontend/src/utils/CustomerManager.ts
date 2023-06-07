import ICustomer, { IRegisterForm } from "../interfaces/Customer";
import { demoCustomer } from "./demos";
import * as api from "./api/api";
import * as auth from "./api/auth";

export default class CustomerManager {
    public static async logout(){
        return await auth.logoutAPI();
    }
    public static async getUserListData():Promise<ICustomer[]>{
        return await auth.getUserListDataAPI();
    }
    public static async login(id:string,pw:string){
        return await auth.loginAPI(id,pw);
    }
    public static async nlogin(id:string,pw:string){
        return await auth.nloginAPI(id,pw);
    }
    public static async sessionLogin():Promise<ICustomer|undefined>{
        console.log("세션로그인 시도");
        let userData = await auth.sessionLoginAPI();
        if (userData!=undefined)console.log("세션로그인 성공!");
        else console.log("세션로그인 실패");
        return userData;
    }
    public static async editUserData(data:IRegisterForm){
        return await auth.editUserDataAPI(data);
    }
    public static async register(data:IRegisterForm){
        return await auth.registerAPI(data);
    }
    public static async nregister(data:IRegisterForm){
        return await auth.nregisterAPI(data);
    }
}