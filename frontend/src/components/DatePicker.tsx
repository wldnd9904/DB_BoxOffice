/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {  addDays,  addMonths,  differenceInMonths,  format,  isLastDayOfMonth,  isSameDay,  lastDayOfMonth,  startOfMonth} from "date-fns";
import styled from "styled-components";

const DatePickerContainer = styled.div`
  display: flex;
  width:100%;
  max-width: 600px;
  background: inherit;
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  z-index: 2;
  background: inherit;
`;
const Button = styled.button`
  border: none;
  text-decoration: none;
  cursor: pointer;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-bottom: 5px;
`;
const DateListScrollable = styled.div`
  display: flex;
  overflow-x: scroll;
  scrollbar-width: none;
  margin: 2px 0 2px -40px;
  -webkit-overflow-scrolling: touch;
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
const DateDayItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin: 0 0 0 5px;
  width: 45px;
  height: 49px;
  flex-shrink: 0;
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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [months, setMonths] = useState<Date[][]>([]);
  const firstSection = { marginLeft: "40px" };
  const startDate = new Date();
  const lastDate = addDays(startDate, 30);
  const primaryColor = "rgb(54, 105, 238)";
  const selectedStyle = {
    fontWeight: "bold",
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    border: `2px solid ${primaryColor}`,
    color: primaryColor,
  };
  useEffect(() => {
    const finalDate:Date = addDays(lastDate,1);
    let tmpMonths:Date[][] = [];
    let month:Date[] = [];
    for(let i = startDate; !isSameDay(i,finalDate); i = addDays(i,1)){
      console.log(i);
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

  /*const nextWeek = () => {
    const e = document.getElementById("container");
    const width = e ? e.getBoundingClientRect().width : null;
    e.scrollLeft += width - 60;
  };

  const prevWeek = () => {
    const e = document.getElementById("container");
    const width = e ? e.getBoundingClientRect().width : null;
    e.scrollLeft -= width - 60;
  };
  */
  return (
    <DatePickerContainer>
      <ButtonWrapper>
        <Button>
          ←
        </Button>
      </ButtonWrapper>
      <DateListScrollable>
      {
        months.map((month) =>
          <MonthContainer>
            <MonthYearLabel>
              {format(month[0],"MMMM")}
            </MonthYearLabel>
            <DaysContainer>
              {month.map((date)=>
                <DateDayItem onClick={() => onDateClick(date)}>
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
        <Button>
          →
        </Button>
      </ButtonWrapper>
    </DatePickerContainer>
  );
}
