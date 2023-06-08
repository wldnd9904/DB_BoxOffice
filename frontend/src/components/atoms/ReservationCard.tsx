import { useState, useEffect } from "react";
import styled from "styled-components";
import IMovie from "../../interfaces/Movie";
import ISchedule from "../../interfaces/Schedule";
import ITicket, { IPeopleSelected } from "../../interfaces/Ticket";
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
import ReservPay from "../Customer/ReservPay";
import { demoMovie, demoSchedule, demoTheater } from "../../utils/demos";

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
    width:260px;
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
interface IReservationCardParams {
    receipt: IReceipt;
}
function ReservationCard(params:IReservationCardParams) {
    const [reservations, setReservations] = useRecoilState<IReceipt[]>(reservationsAtom);
    const [movie,setMovie] = useState<IMovie>();
    const [tickets, setTickets] = useState<string[]>([]);
    const [qrShow,setQRShow] = useState<boolean>(false);
    const [payShow,setPayShow] = useState<boolean>(false);
    const [qrString,setQRString] = useState<string>("");
    const payMethodName = useRecoilValue<IPayMethod>(payMethodNameAtom);
    const open = (seat_no:string) => {
        setQRString(seat_no)
        setQRShow(true);
    };
    const cancel = async () => {
        await PaymentManager.cancelReservations(params.receipt.pay_no);
        setReservations([]);
        setReservations(await PaymentManager.getPaymentListData());
    };
    const onPay =()=>{
        setPayShow(true);
    }
    useEffect(()=>{
        (async()=>{
            setMovie(await MovieManager.getMovie(params.receipt.mov_no));
            console.log("movie:",movie);
            setTickets(params.receipt.pay_detail.split(" ").slice(4));
            console.log(tickets);
        })();
    },[]);
    const detail = params.receipt.pay_detail.split(" ");
    const peopleSelected:IPeopleSelected = {
        adult: parseInt(detail[0]),
        teen: parseInt(detail[1]),
        senior: parseInt(detail[2]),
        disabled: parseInt(detail[3]),
        detail: "",
        detail2: "",
        ticketNumbers: []
    };
    return (
        movie?
        <>
        <ReservationCardContainer>
            <Movie movie={movie} onSelect={()=>{}}/>
            <ReservationSubContainer>
            <TitleLabel>
                <Title>{movie.mov_nm} - {params.receipt.run_type}</Title>
                <SubTitle>{`${YYYYMMDD(new Date(params.receipt.run_date))}`}</SubTitle>
                <SubTitle>{HHMM(new Date(params.receipt.run_date))}~{HHMM(new Date(params.receipt.run_end_date))}</SubTitle>
                <SubTitle>{params.receipt.thea_loc} {params.receipt.thea_nm}</SubTitle>
                <SubTitle>{
                    tickets.join(", ")
                }</SubTitle>
                {!params.receipt.pay_state?
                <>
                <Delimeter />
                <CustomButton onClick={onPay}>결제 ({params.receipt.pay_amount.toLocaleString()}원)</CustomButton>
                <CustomButton variant="danger" onClick={cancel}>예약 취소</CustomButton>
                </>
                :
                <>
                <SubTitle>결제됨({payMethodName[params.receipt.pay_met_no!]?.pay_met_nm??"알수없음"})</SubTitle>
                <SubTitle>결제일시: {YYYYMMDD(new Date(params.receipt.pay_date!))} {HHMM(new Date(params.receipt.pay_date!))}</SubTitle>
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
                <QRCode value={params.receipt.pay_no+qrString}/>
            </ModalBody>
        </Modal>
        <Modal
            show={payShow}
            onHide={()=>setPayShow(false)}
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
            <Modal.Title>결제하기</Modal.Title>
            </Modal.Header>
            <ModalBody>
                <ReservPay receipt={params.receipt} movie={movie} peopleSelected={peopleSelected} onDone={()=>setPayShow(false)}/>
            </ModalBody>
        </Modal>
        </>
        :null)
}
export default ReservationCard;