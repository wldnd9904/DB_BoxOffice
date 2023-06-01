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
import { Button, Modal } from "react-bootstrap";
import QRCode from "react-qr-code";

const ReservationCardContainer = styled.div`
  display: flex;
  width:auto;
  max-width: 550px;
  height:auto;
  padding:10px 10px;
  border:1px solid gray;
  border-radius:30px;
  flex-direction: row;
  justify-content: center;
  margin:10px;
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
    margin-top:3px;
    color:black;
    flex-direction: row;
    flex-wrap:wrap;
`;
const TitleLabel = styled.div`
    display:flex;
    flex-direction: column;
    font-size:1.5em;
    font-weight:bold;
`;
const Delimeter = styled.div`
    margin:10px 0;
    border:1px solid gray;
`;
const TicketsContainer = styled.div`
    display:flex;
    flex-wrap: wrap;
`;
const TicketButton = styled(Button)`
    width:50px;
    margin:3px;
`;
const MiniBox = styled.div<{color:string}>`
    display:flex;
    width:1em;
    height:1em;
    background-color:${(props=>props.color)};
`;
const ModalBody = styled(Modal.Body)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const CustomButton = styled(Button)`
    margin:3px;
`;

function ReservationCard(params: IPayment) {
    const [movie,setMovie] = useState<IMovie>();
    const [tickets, setTickets] = useState<ITicket[]>([]);
    const [schedule, setSchedule] = useState<ISchedule>();
    const [theater, setTheater] = useState<ITheater>();
    const [qrShow,setQRShow] = useState<boolean>(false);
    const [qrString,setQRString] = useState<string>("");
    const open = (seat_no:string) => {
        setQRString(seat_no)
        setQRShow(true);
    };
    useEffect(()=>{
        (async()=>{
            setMovie(await MovieManager.getMovie(params.mov_no));
            setTickets(await PaymentManager.getPaymentTickets(params.pay_no));
            setSchedule(await ScheduleManager.getTicketSchedule("0"))
            setTheater(await TheaterManager.getTheater("0"))
        })();
      },[]);
    return (
        movie&&schedule&&theater?
        <>
        <ReservationCardContainer>
            <Movie movie={movie} onSelect={()=>{}}/>
            <ReservationSubContainer>
                <TitleLabel>
                    <Title>{movie.mov_nm} - {schedule.run_type}</Title>
                    <SubTitle>{`${YYYYMMDD(schedule.run_date)}`}</SubTitle>
                    <SubTitle>{HHMM(schedule.run_date)}~{HHMM(schedule.run_end_date)}</SubTitle>
                    <SubTitle>{theater.thea_loc} {theater.thea_nm}</SubTitle>
                    <SubTitle>{
                        tickets.map((ticket,idx)=>(
                            ticket.seat_no
                        ).toString())
                    }</SubTitle>
                    {!params.pay_state?
                    <>
                    <Delimeter />
                    <CustomButton>결제({params.pay_amount})</CustomButton>
                    <CustomButton variant="danger">예약 취소</CustomButton>
                    </>
                    :
                    <>
                    <SubTitle>결제됨({params.pay_met_no})</SubTitle>
                    <SubTitle>결제일시: {YYYYMMDD(params.pay_date)} {HHMM(params.pay_date)}</SubTitle>
                    <Delimeter/>
                    <SubTitle>좌석 코드 출력</SubTitle>
                    <TicketsContainer>
                        {tickets.map((ticket, idx) => (
                            <TicketButton onClick={()=>open(ticket.seat_no as string)} key={idx}>
                                {ticket.seat_no}
                            </TicketButton>
                        ))}
                    </TicketsContainer>
                    <Button onClick={()=>open("모든표")}>한번에 출력</Button>
                    </>
                    }
            </TitleLabel>
            </ReservationSubContainer>
        </ReservationCardContainer>
        <Modal
            show={qrShow}
            onHide={()=>setQRShow(false)}
            size='sm'
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
            <Modal.Title>좌석 확인 코드 ({qrString})</Modal.Title>
            </Modal.Header>
            <ModalBody>
                <p>아래 QR 코드를 직원에게 제시하세요.</p>
                <br />
                <QRCode value={params.pay_no+qrString}/>
            </ModalBody>
        </Modal>
        </>
        :null)
}
export default ReservationCard;