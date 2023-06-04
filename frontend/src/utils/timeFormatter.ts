const days = [
    '일',
    '월',
    '화',
    '수',
    '목',
    '금',
    '토'
  ];

export const YYYYMMDD = (time:Date) => {
    const year = time.getFullYear().toString().padStart(4,'0');
    const month = (time.getMonth()+1).toString().padStart(2,'0');
    const date = time.getDate().toString().padStart(2,'0');
    const day = days[time.getDay()];
    return `${year}.${month}.${date}(${day})`;
}

export const YYYYMMDD2 = (time:Date) => {
  const year = time.getFullYear().toString().padStart(4,'0');
  const month = (time.getMonth()+1).toString().padStart(2,'0');
  const date = time.getDate().toString().padStart(2,'0');
  const day = days[time.getDay()];
  return `${year}-${month}-${date}`;
}

export const HHMM = (time:Date) => {
const hour = time.getHours().toString().padStart(2,'0');
const min = time.getMinutes().toString().padStart(2,'0');
return  `${hour}:${min}`;
};