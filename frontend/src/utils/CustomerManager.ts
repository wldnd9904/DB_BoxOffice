import ICustomer, { IRegisterForm } from "../interfaces/Customer";
import { demoCustomer } from "./demos";
import * as api from "./api";

export default class CustomerManager {
    public static logout():void{
    }
    public static async getUserListData():Promise<ICustomer[]>{
        return await api.getUserListDataAPI();
    }
    public static async login(id:string,pw:string):Promise<ICustomer>{
        return await api.getUserDataAPI(id);
    }
    public static async getUserData(id:string){
    }
    public static async deleteUser(cus_no:number|string){
    }
    public static async editUserData(data:IRegisterForm){
    }
    public static async editUserDataStaff(data:ICustomer){
    }
    public static async register(data:IRegisterForm):Promise<string>{
        return "ok";
    }
    public static removeUserData(cus_no:number|string):void{
    }
}