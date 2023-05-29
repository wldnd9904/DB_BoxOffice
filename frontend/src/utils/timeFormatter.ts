export const HHMM = (time:Date) => {
const hour = time.getHours().toString().padStart(2,'0');
const min = time.getMinutes().toString().padStart(2,'0');
return  `${hour}:${min}`;
};