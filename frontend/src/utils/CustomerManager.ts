import ICustomer, { IRegisterForm, demoCustomer } from "../interfaces/Customer";

export default class CustomerManager {
    public static logout():void{
    }
    public static async getUserListData(){
    }
    public static async login(id:string,pw:string):Promise<ICustomer>{
        return demoCustomer;
    }
    public static async getUserData(id:string){
    }
    public static async deleteUser(userID:string){
    }
    public static async editUserData(data:IRegisterForm){
    }
    public static async editUserDataStaff(data:ICustomer){
    }
    public static async register(data:IRegisterForm):Promise<string>{
        return "ok";
    }
    public static removeUserData(userID:string):void{
    }
}