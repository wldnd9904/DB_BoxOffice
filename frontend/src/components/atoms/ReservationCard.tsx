import { useState, useEffect } from "react";
import styled from "styled-components";
import IMovie from "../../interfaces/Movie";
import IPayment from "../../interfaces/Payment";
import ISchedule from "../../interfaces/Schedule";
import ITicket from "../../interfaces/Ticket";
import MovieManager from "../../utils/MovieManager";
import PaymentManager from "../../utils/PaymentManager";
import ScheduleManager from "../../utils/ScheduleManager";
import { YYYYMMDD, HHMM } from "../../utils/timeFormatter";
import Grade from "./Grade";
import Movie from "./Movie";
import ITheater from "../../interfaces/Theater";
import TheaterManager from "../../utils/TheaterManager";

const ReservationCardContainer = styled.div`
  display: flex;
  width:100%;
  max-width: 550px;
  height:auto;
  padding:10px 30px;
  border:1px solid gray;
  border-radius:30px;
  flex-direction: row;
  margin:20px;
`;
const ReservationSubContainer = styled.div`
    margin:10px;
    display:flex;
    flex-direction:column;
`;
const Title = styled.div`
    display:flex;
    justify-content: space-between;
    color:black;
    flex-direction: row;
`;
const SubTitle = styled.div`
    display:flex;
    font-size:80%;
    justify-content: space-between;
    margin-top:3px;
    color:black;
    flex-direction: row;
`;
const TitleLabel = styled.div`
    display:flex;
    flex-direction: column;
    font-size:1.5em;
    font-weight:bold;
`;
const Delimeter = styled.div`
    border:1px solid gray;
`;

function ReservationCard(params: IPayment) {
    const [movie,setMovie] = useState<IMovie>();
    const [tickets, setTickets] = useState<ITicket[]>([]);
    const [schedule, setSchedule] = useState<ISchedule>();
    const [theater, setTheater] = useState<ITheater>();
    useEffect(()=>{
        (async()=>{
            setMovie(await MovieManager.getMovie(params.mov_no));
            setTickets(await PaymentManager.getPaymentTickets(params.pay_no));
            if(tickets.length>0){
                setSchedule(await ScheduleManager.getTicketSchedule(tickets[0].tic_no))
                setTheater(await TheaterManager.getTheater(tickets[0].thea_no))
            }
        })();
      },[]);
    return (
        movie&&schedule&&theater?
        <ReservationCardContainer>
            <Movie movie={movie} onSelect={()=>{}}/>
            <ReservationSubContainer>
                <TitleLabel>
                    <Title>{movie.mov_nm} - {schedule.run_type}</Title>
                    <SubTitle>{`${YYYYMMDD(schedule.run_date)}`}</SubTitle>
                    <SubTitle>{HHMM(schedule.run_date)}~{HHMM(schedule.run_end_date)}</SubTitle>
                    <SubTitle>{theater.thea_loc} {theater.thea_nm}</SubTitle>
                    {
                        tickets.map((ticket,idx)=>(
                            ticket.seat_no
                        ).toString())
                    }
                </TitleLabel>
            </ReservationSubContainer>
        </ReservationCardContainer>
        :null)
}
export default ReservationCard;