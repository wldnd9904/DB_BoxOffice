import { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import IMovie from '../../interfaces/Movie';
import StaffMovie from './StaffMovieView';
import PaymentManager from '../../utils/PaymentManager';
import { paymentListAtom } from '../../utils/recoilAtoms';
import StaffPaymentView from './StaffPaymentView';
import IPayment from '../../interfaces/Payment';

function StaffpaymentList(){
  const [paymentList, setPaymentList] = useRecoilState(paymentListAtom);

   const loadpayment = () => {(async ()=>{
    await setPaymentList(await PaymentManager.getAllPaymentListData());
  })();}
  useEffect(()=>{
    (async()=>{
        await setPaymentList(await PaymentManager.getAllPaymentListData());
    })();
  },[])
  //<Button style={{marginTop:"20px"}} variant="primary" onClick={loadMovie}>영화 안받아오기</Button>
    return(
        <div style={{padding:"20px"}}>
            <Row xs={1} md={1} lg={1} className="g-4">
                { (paymentList.length>0)?
                paymentList.map((payment:IPayment, idx) => (
                    <Col key={idx}>
                        <StaffPaymentView {...payment}/>
                    </Col>
                )):null
                }
            </Row>
            {/*<Button style={{marginTop:"20px"}} variant="primary" onClick={newMovie}>새 코드</Button>*/}
        </div>
    );
}

export default StaffpaymentList;