export interface ITheater {
    theaterID: number|string;
    name: string;
    location: string;
}
export interface ISeat {
    seatID: string;
    class: string;
}
export interface ISeats {
    [index:string]: ISeat[];
}
export const demoTheater: ITheater = {
    theaterID: 1,
    name: "1관",
    location: "2층"
}
export const demoTheater2: ITheater = {
    theaterID: 2,
    name: "2관",
    location: "2층"
}
export const demoTheater3: ITheater = {
    theaterID: 3,
    name: "3관",
    location: "3층"
}
export const demoTheaters: ITheater[] = [demoTheater,demoTheater2,demoTheater3];

export const demoSeats:ISeats = (() =>  {
    const demoV = ["A","B","C","D","E","F","G","H"];
    const demoH = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    var ret: ISeats = {};
    demoV.forEach((row) => {
        var tmpSeats:ISeat[] =[]; 
        demoH.forEach((column)=> {
            const tmpSeat:ISeat = {
                seatID: column.toString(),
                class: "일반석",
            }
            tmpSeats.push(tmpSeat)
        });
        ret[row] = tmpSeats;
    });
    return ret;
})();