import { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import CodeManager from '../../utils/CodeManager';
import { codeListAtom, movieListAtom } from '../../utils/recoilAtoms';
import IMovie from '../../interfaces/Movie';
import StaffMovie from './StaffMovieView';
import { ICode } from '../../interfaces/Codes';
import StaffCodeView from './StaffCodeView';

function StaffCodeList(){
  const [codeList, setCodeList] = useRecoilState(codeListAtom);
  const newMovie = () => {(async ()=>{
    await CodeManager.addCode();
    alert("새 영화가 추가되었습니다.");
    await setCodeList(await CodeManager.getCodeList());
  })();} 
   const loadCode = () => {(async ()=>{
    await setCodeList(await CodeManager.getCodeList());
  })();}
  useEffect(()=>{
    (async()=>{
        await setCodeList(await CodeManager.getCodeList());
    })();
  },[])
  //<Button style={{marginTop:"20px"}} variant="primary" onClick={loadMovie}>영화 안받아오기</Button>
    return(
        <div style={{padding:"20px"}}>
            <Row xs={1} md={1} lg={1} className="g-4">
                { (codeList.length>0)?
                codeList.map((code:ICode, idx) => (
                    <Col key={idx}>
                        <StaffCodeView {...code}/>
                    </Col>
                )):null
                }
            </Row>
            {/*<Button style={{marginTop:"20px"}} variant="primary" onClick={newMovie}>새 코드</Button>*/}
        </div>
    );
}

export default StaffCodeList;