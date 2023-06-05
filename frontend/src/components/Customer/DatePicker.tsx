/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import {  addDays,  addMonths,  differenceInMonths,  format,  isLastDayOfMonth,  isSameDay,  lastDayOfMonth,  startOfMonth} from "date-fns";
import styled from "styled-components";
import ISchedule from "../../interfaces/Schedule";
import { useRecoilValue } from "recoil";
import { allScheduleDatesAtom } from "../../utils/recoilAtoms";

const DatePickerContainer = styled.div`
  display: flex;
  width:100%;
  max-width: 800px;
  margin-left:auto;
  margin-right:auto;
  background: inherit;
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  z-index: 2;
  background: inherit;
`;
const Button = styled.div`
  border: none;
  text-decoration: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: lightgray;
  cursor:pointer;
  font-size: 20px;
  font-weight: bold;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-bottom: 5px;
  transition: color 0.4s ease;
  :hover {
    color:gray;
  }
`;
const DateListScrollable = styled.div`
  display: flex;
  overflow-x: scroll;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;scroll-behavior: smooth;
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    display: none;
  }
`;
const MonthContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const MonthYearLabel = styled.span`
  align-self: flex-start;
  z-index: 3;
  font-size: 15px;
  font-weight: bold;
  position: sticky;
  top: 0;
  left: 0;
  width: max-content;
  margin: 0 14px 10px 0;
`;
const DateDayItem = styled.div<{selectable:boolean, selected:boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 0 0 5px;
  width: 45px;
  height: 45px;
  border: 2px solid none;
  border-radius: 50%;
  box-sizing: border-box;
  flex-shrink: 0;
  ${props=>!props.selectable?`
    color: lightgray;
    cursor:default;
    pointer-events: none;
    `:null
  }
  ${props=>props.selected?`
    font-weight: bold;
    border: 2px solid rgb(54, 105, 238);
    color: rgb(54, 105, 238);
    pointer-events: none;
    `:null
  }
`;
const DaysContainer = styled.div`
  display: flex;
  z-index: 1;
`;
const DayLabel = styled.div`
  font-size: 12px;
  margin: 4px 0 0 0;
`;
const DateLabel = styled.div`
  font-size: 18px;
`;

interface DatePickerParams {
  getSelectedDay: (date:Date)=>void,
}
export default function DatePicker(params:DatePickerParams) {
  const allScheduleDates = useRecoilValue(allScheduleDatesAtom);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [months, setMonths] = useState<Date[][]>([]);
  const today=new Date();
  const startDate = addDays(today,-3);
  const lastDate = addDays(startDate, 60);
  const scrollRef = useRef<any>(null);
  useEffect(() => {
    console.log(allScheduleDates);
    const finalDate:Date = addDays(lastDate,1);
    let tmpMonths:Date[][] = [];
    let month:Date[] = [];
    for(let i = startDate; !isSameDay(i,finalDate); i = addDays(i,1)){
      month.push(i);
      if(isLastDayOfMonth(i) || isSameDay(i,lastDate)){
        tmpMonths.push(month);
        month=[];
      }
    }
    setMonths(tmpMonths);
    if (params.getSelectedDay) {
      params.getSelectedDay(startDate);
    }
  },[]);

  const onDateClick = (day:Date) => {
    setSelectedDate(day);
    if (params.getSelectedDay) {
      params.getSelectedDay(day);
    }
  };
  const nextWeek = () => {
    let e = scrollRef.current;
    let width = e.getBoundingClientRect().width;
    e.scrollLeft += width;
  };
  const prevWeek = () => {
    let e = scrollRef.current;
    let width = e.getBoundingClientRect().width;
    e.scrollLeft -= width;
  };
  return (
    <DatePickerContainer>
      <ButtonWrapper>
        <Button onClick={()=>prevWeek()}>
          {"<"}
        </Button>
      </ButtonWrapper>
      <DateListScrollable ref={scrollRef}>
      {
        months.map((month,idx) =>
          <MonthContainer key={idx}>
            <MonthYearLabel>
              {format(month[0],"MMMM")}
            </MonthYearLabel>
            <DaysContainer>
              {month.map((date, idx)=>
                <DateDayItem 
                  key = {idx}
                  onClick={() => onDateClick(date)}
                  selectable={allScheduleDates.includes(`${date.getMonth()}-${date.getDate()}`)&&(date.getMonth()>today.getMonth()||(date.getMonth()==today.getMonth()&&date.getDate()>=today.getDate()))}
                  selected={isSameDay(date,selectedDate)}
                >
                  <DayLabel>
                    {format(date,"E")}
                  </DayLabel>
                  <DateLabel>
                    {format(date,"d")}
                  </DateLabel>
                </DateDayItem>
                )
              }
            </DaysContainer>
        </MonthContainer>
        )
      }
      </DateListScrollable>
      <ButtonWrapper>
        <Button onClick={()=>nextWeek()}>
          {">"}
        </Button>
      </ButtonWrapper>
    </DatePickerContainer>
  );
}
