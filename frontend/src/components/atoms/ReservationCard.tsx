import { useState, useEffect } from "react";
import styled from "styled-components";
import IMovie from "../../interfaces/Movie";
import ISchedule from "../../interfaces/Schedule";
import ITicket from "../../interfaces/Ticket";
import MovieManager from "../../utils/MovieManager";
import PaymentManager from "../../utils/PaymentManager";
import ScheduleManager from "../../utils/ScheduleManager";
import { YYYYMMDD, HHMM} from "../../utils/timeFormatter";
import Grade from "./Grade";
import Movie from "./Movie";
import ITheater from "../../interfaces/Theater";
import TheaterManager from "../../utils/TheaterManager";
import { Button, Modal } from "react-bootstrap";
import QRCode from "react-qr-code";
import { payMethodNameAtom, reservationsAtom } from "../../utils/recoilAtoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { IPayMethod } from "../../interfaces/Codes";
import { IReceipt } from "../../interfaces/Payment";

const ReservationCardContainer = styled.div`
  display: flex;
  width:fit-content;
  height:auto;
  padding:10px;
  border-radius:30px;
  flex-direction: row;
  margin:10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;
const ReservationSubContainer = styled.div`
    margin:10px;
    display:flex;
    flex-direction:column;
    width:auto;
    width:250px;
    word-break: break-all;
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

function ReservationCard(params: IReceipt) {
    const [reservations, setReservations] = useRecoilState<IReceipt[]>(reservationsAtom);
    const [movie,setMovie] = useState<IMovie>();
    const [tickets, setTickets] = useState<string[]>([]);
    const [qrShow,setQRShow] = useState<boolean>(false);
    const [qrString,setQRString] = useState<string>("");
    const payMethodName = useRecoilValue<IPayMethod>(payMethodNameAtom);
    const open = (seat_no:string) => {
        setQRString(seat_no)
        setQRShow(true);
    };
    const cancel = async () => {
        await PaymentManager.cancelReservations(params.pay_no);
        setReservations(await PaymentManager.getPaymentListData());
        alert("예약이 취소되었습니다.");
    }
    useEffect(()=>{
        (async()=>{
            setMovie(await MovieManager.getMovie(params.mov_no));
            console.log("movie:",movie);
            setTickets(params.pay_detail.split(" ").slice(4));
            console.log(tickets);
        })();
    },[]);
    return (
        movie?
        <>
        <ReservationCardContainer>
            <Movie movie={movie} onSelect={()=>{}}/>
            <ReservationSubContainer>
            <TitleLabel>
                <Title>{movie.mov_nm} - {params.run_type}</Title>
                <SubTitle>{`${YYYYMMDD(new Date(params.run_date))}`}</SubTitle>
                <SubTitle>{HHMM(new Date(params.run_date))}~{HHMM(new Date(params.run_end_date))}</SubTitle>
                <SubTitle>{params.thea_loc} {params.thea_nm}</SubTitle>
                <SubTitle>{
                    tickets.join(", ")
                }</SubTitle>
                {!params.pay_state?
                <>
                <Delimeter />
                <CustomButton>결제({params.pay_amount})</CustomButton>
                <CustomButton variant="danger" onClick={cancel}>예약 취소</CustomButton>
                </>
                :
                <>
                <SubTitle>결제됨({payMethodName[params.pay_met_no!]?.pay_met_nm??"알수없음"})</SubTitle>
                <SubTitle>결제일시: {YYYYMMDD(new Date(params.pay_date!))} {HHMM(new Date(params.pay_date!))}</SubTitle>
                <Delimeter/>
                <SubTitle>좌석 코드 출력</SubTitle>
                <TicketsContainer>
                    {tickets.length>0?
                    tickets.map((ticket, idx) => (
                        <TicketButton onClick={()=>open(ticket as string)} key={idx}>
                            {ticket}
                        </TicketButton>
                    )):null}
                </TicketsContainer>
                <Button onClick={()=>open("모든 좌석")}>한번에 출력</Button>
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