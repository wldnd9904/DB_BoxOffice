import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import CustomerManager from '../../utils/CustomerManager';
import ICustomer from '../../interfaces/Customer';
import User from './StaffUserView';
import { ICustomerGrade } from '../../interfaces/Codes';
import { useRecoilState } from 'recoil';
import { customerGradeNameAtom } from '../../utils/recoilAtoms';
import CodeManager from '../../utils/CodeManager';


function StaffUserList(){
  const [userListData, setUserListData] = useState<ICustomer[]>([]);
  const [customerGradeList,setCustomerGradeList] = useRecoilState(customerGradeNameAtom);
  useEffect(()=>{
    (async()=>{
        await setCustomerGradeList(await CodeManager.getCustomerGradeData());
        await setUserListData(await CustomerManager.getUserListData());
    })();
  },[])
    return(
        <div style={{padding:"20px"}}>
            <Row xs={1} md={1} lg={1} className="g-4">
                { userListData.length>0?
                userListData.map((user:ICustomer, idx) => (
                    <Col key={idx}>
                        <User key={idx} customer={user} />
                    </Col>
                )):null
                }
            </Row>
        </div>
    );
}

export default StaffUserList;