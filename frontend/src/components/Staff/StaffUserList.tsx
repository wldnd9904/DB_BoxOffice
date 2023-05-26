import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import CustomerManager from '../../utils/CustomerManager';
import ICustomer from '../../interfaces/Customer';
import User from './StaffUserView';


function StaffUserList(){
  const [userListData, setUserListData] = useState<ICustomer[]>([]);
  useEffect(()=>{
    (async()=>{
        await setUserListData(await CustomerManager.getUserListData());
    })();
  },[])
    return(
        <div style={{padding:"20px"}}>
            <Row xs={1} md={1} lg={1} className="g-4">
                { userListData?
                userListData.map((user:ICustomer, idx) => (
                    <Col key={idx}>
                        <User key={idx} customer={user}
                        onEdit={(customer:ICustomer)=>setUserListData([...userListData.filter(item => item.cus_no != user.cus_no),customer])}
                        onDelete={()=>setUserListData(userListData.filter(item => item.cus_no != user.cus_no))}/>
                    </Col>
                )):null
                }
            </Row>
        </div>
    );
}

export default StaffUserList;