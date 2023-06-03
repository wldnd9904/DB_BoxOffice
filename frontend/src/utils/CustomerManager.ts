import ICustomer, { IRegisterForm } from "../interfaces/Customer";
import { demoCustomer } from "./demos";
import * as api from "./api/api";
import * as auth from "./api/auth";

export default class CustomerManager {
    public static logout():void{
    }
    public static async getUserListData():Promise<ICustomer[]>{
        return await auth.getUserListDataAPI();
    }
    public static async login(id:string,pw:string):Promise<ICustomer>{
        return await auth.loginAPI(id,pw);
    }
    public static async getUserData(id:string){
    }
    public static async deleteUser(cus_no:number|string){
        return await auth.deleteUserAPI(cus_no);
    }
    public static async editUserData(data:IRegisterForm){
        return await auth.editUserDataAPI(data);
    }
    public static async editUserDataStaff(data:ICustomer){
        return await auth.editUserDataStaffAPI(data);
    }
    public static async register(data:IRegisterForm){
        return await auth.registerAPI(data);
    }
    public static removeUserData(cus_no:number|string):void{
    }
}