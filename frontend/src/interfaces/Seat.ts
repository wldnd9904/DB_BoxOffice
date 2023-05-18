export interface ISeat {
    seat_no: number|string;
    thea_no: number|string;
    seat_grade_no: number|string;
}
export interface ISeats {
    [index:string]: ISeat[];
}

export const demoSeats:ISeats = (() =>  {
    const demoV = ["A","B","C","D","E","F","G","H"];
    const demoH = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    var ret: ISeats = {};
    demoV.forEach((row) => {
        var tmpSeats:ISeat[] =[]; 
        demoH.forEach((column)=> {
            const tmpSeat:ISeat = {
                seat_no: column.toString(),
                thea_no: 1,
                seat_grade_no: "일반석",
            }
            tmpSeats.push(tmpSeat)
        });
        ret[row] = tmpSeats;
    });
    return ret;
})();