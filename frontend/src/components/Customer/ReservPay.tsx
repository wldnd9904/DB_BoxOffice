import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import { Badge, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import ICustomer from '../../interfaces/Customer';
import IMovie from '../../interfaces/Movie';
import { IPeopleSelected } from '../../interfaces/Ticket';
import { customerAtom, payMethodNameAtom, reservationsAtom } from '../../utils/recoilAtoms';
import { YYYYMMDD, HHMM } from '../../utils/timeFormatter';
import Grade from '../atoms/Grade';
import PriceCard from '../atoms/PriceCard';
import { IPayMethod } from '../../interfaces/Codes';
import { IPayForm, IReceipt, ISeatInfo } from '../../interfaces/Payment';
import { useForm } from 'react-hook-form';
import PaymentManager from '../../utils/PaymentManager';
import CustomerManager from '../../utils/CustomerManager';
const PayContainer = styled.div`
  display: flex;
  margin: auto;
  align-items: center;
  flex-direction: column;
`;
const Title = styled.div`
    display:flex;
    font-size:1.5em;
    font-weight:bold;
    margin:5px auto;
    div {
        margin-right:5px;
    }
`;
const ScheduleTitle = styled.div`
    display:flex;
    font-size:1.2em;
    font-weight:bold;
    margin:5px;
    align-items: center;
`;
const FormGroup = styled(Form.Group)`
    display:flex;
    flex-direction: column;
    margin-top:10px;
`;
const HStack = styled.div`
    display:flex;
    flex-direction: row;
    input {
        position:relative;
        top:-4px;
    }
`;
const Check = styled(Form.Check)`
    text-align:center;
    input {
        position:relative;
        top:-3px;
    }
`;
const ButtonContainer = styled.div`
    margin: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    button{
        margin:2px;
    }
`;
interface ReservPayParams { 
    receipt:IReceipt;
    movie:IMovie;
    peopleSelected:IPeopleSelected;
    onDone:()=>void;
}
function ReservPay(params:ReservPayParams) {
    const [seatInfo, setSeatInfo] = useState<ISeatInfo[]>([]);
    const [userData,setUserData] = useRecoilState<ICustomer>(customerAtom);
    const payMethodName = useRecoilValue<IPayMethod>(payMethodNameAtom);
    const [reservations, setReservations] = useRecoilState<IReceipt[]>(reservationsAtom);
    const { register, handleSubmit, formState:{errors},reset, setValue} = useForm<IPayForm>();
    const [isPointUsed,setIsPointUsed] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
    const [payDone, setPayDone] = useState<boolean>(false);
    const onValid = async (data:IPayForm) => {
        data.pay_no=params.receipt.pay_no;
        if(data.pay_point==undefined)data.pay_point=0;
        console.log(data);
        setBtnDisabled(true);
        const apiData = await PaymentManager.pay(data);
        alert(apiData);
        setBtnDisabled(false);
        if(apiData=="결제 성공!"){setPayDone(true);
        setDisabled(true);
        setUserData(await CustomerManager.sessionLogin() as ICustomer)
        setReservations(await PaymentManager.getPaymentListData());
        params.onDone();
        }
    }
    const cancel = async () => {
        let tmpCurrentPayNo="";
        Object.assign(tmpCurrentPayNo,params.receipt.pay_no);
        await PaymentManager.cancelReservations(params.receipt.pay_no);
        setReservations([]);
        setReservations(await PaymentManager.getPaymentListData());
        alert("예매가 취소되었습니다.");
        setDisabled(true);
        params.onDone();
    }
    const togglePoint = () => {
        setIsPointUsed((value)=>(!value))
    }
    useEffect(()=>{
        (async()=>{
            setSeatInfo(await PaymentManager.getSeatInfo(params.receipt.pay_no));
            console.log(seatInfo);
        })();
      },[])
    useEffect(() => {
        setValue("pay_no",params.receipt.pay_no);
        if(userData==undefined){
            setDisabled(true)
            alert("로그인 정보가 변경되었습니다. 홈으로 이동해주세요.");
        }
    },[userData]);
    return (disabled?
        //로그인 안됨
        <PayContainer>
            <Title>{payDone?"결제가 완료되었습니다.":"예매가 취소되었습니다."}</Title>
        </PayContainer>
        ://로그인됨
        <PayContainer>
            <Title><Grade grade={params.movie.mov_grade_no} />{params.movie.mov_nm} - {params.receipt.run_type}</Title>
            <ScheduleTitle>{`${YYYYMMDD(new Date(params.receipt.run_date))} ${HHMM(new Date(params.receipt.run_date))}~${HHMM(new Date(params.receipt.run_end_date))}`}</ScheduleTitle>
            <ScheduleTitle>{`${params.receipt.thea_loc} ${params.receipt.thea_nm}`}</ScheduleTitle>
            <ScheduleTitle>{params.receipt.detail}</ScheduleTitle>
            {seatInfo&&seatInfo.length>0?<PriceCard seatInfo={seatInfo} selectedPeople={params.peopleSelected}/>:null}
            <Form onSubmit={handleSubmit(onValid)}>
                <FormGroup>
                <ScheduleTitle>결제방법선택</ScheduleTitle>
                <HStack>
                    {Object.keys(payMethodName).map((label,idx) => 
                    <Form.Check
                    key={idx}
                    {...register("pay_met_no", {required:"값이 필요합니다."})}
                    inline
                    type={'radio'}
                    id={`${idx}`}
                    label={payMethodName[label].pay_met_nm}
                    value={label} />
                    )}
                </HStack>
                </FormGroup>
                    {errors?.pay_met_no? (<Badge bg="secondary">{`${errors?.pay_met_no?.message}`}</Badge>):null}    
                <FormGroup>
                <ScheduleTitle>
                    포인트
                    {userData?.cus_grade_no!="CD00301"?<Check type="switch" checked={isPointUsed} onChange={()=>{togglePoint();setValue("pay_point",0)}}/>:null}
                </ScheduleTitle>
                    <Form.Control defaultValue={0} {...register("pay_point", {pattern:{
                        value:/^[0-9]*$/,
                        message:"포인트 형식이 맞지 않습니다."
                        }})} 
                        disabled={(userData?.cus_grade_no=="CD00301"||!isPointUsed)?true:false}
                        type="number"
                        placeholder={userData?.cus_grade_no!="CD00301"?"0":"회원 로그인 시 사용 가능합니다."}/>
                    {(!(userData?.cus_grade_no=="CD00301"))?
                    <Form.Text>
                        {`잔여 포인트: ${userData?.cus_point}`}
                    </Form.Text>:null}
                </FormGroup>
                    {errors?.pay_point? (<Badge bg="secondary">{`${errors?.pay_point?.message}`}</Badge>):null}
            <ButtonContainer>
                <Button onClick={cancel} variant="danger">예매취소</Button>
                <Button disabled={btnDisabled} type="submit">결제</Button>
            </ButtonContainer>
            </Form>
        </PayContainer>
  )
}
export default ReservPay;