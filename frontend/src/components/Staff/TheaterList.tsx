import { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import TheaterManager from '../../utils/TheaterManager';
import {theaterListAtom } from '../../utils/recoilAtoms';
import ITheater from '../../interfaces/Theater';
import StaffTheaterView from './Theater';

function StaffTheaterList(){
  const [theaterList, setTheaterList] = useRecoilState(theaterListAtom);
  const newTheater = () => {(async ()=>{
    await TheaterManager.addTheater();
    alert("새 상영관이 추가되었습니다.");
    await setTheaterList(await TheaterManager.getTheaterList());
  })();}
  useEffect(()=>{
    (async()=>{
        await setTheaterList(await TheaterManager.getTheaterList());
    })();
  },[])
    return(
        <div style={{padding:"20px"}}>
            <Row xs={1} md={1} lg={1} className="g-4">
                { theaterList?
                theaterList.map((theater:ITheater, idx) => (
                    <Col key={idx}>
                        <StaffTheaterView key={idx} {...theater}/>
                    </Col>
                )):null
                }
            </Row>
            <Button style={{marginTop:"20px"}} variant="primary" onClick={newTheater}>새 상영관</Button>
        </div>
    );
}

export default StaffTheaterList;