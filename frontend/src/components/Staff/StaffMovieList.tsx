import { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import MovieManager from '../../utils/MovieManager';
import { movieListAtom } from '../../utils/recoilAtoms';
import IMovie from '../../interfaces/Movie';
import StaffMovie from './StaffMovieView';

function StaffMovieList(){
  const [movieList, setMovieList] = useRecoilState(movieListAtom);
  const newMovie = () => {(async ()=>{
    await MovieManager.addMovie();
    alert("새 영화가 추가되었습니다.");
    await setMovieList(await MovieManager.getMovieList());
  })();} 
   const loadMovie = () => {(async ()=>{
    await setMovieList(await MovieManager.getMovieList());
  })();}
  useEffect(()=>{
    (async()=>{
        await setMovieList(await MovieManager.getMovieList());
    })();
  },[])
  //<Button style={{marginTop:"20px"}} variant="primary" onClick={loadMovie}>영화 안받아오기</Button>
    return(
        <div style={{padding:"20px"}}>
            <Row xs={1} md={1} lg={1} className="g-4">
                { (movieList.length>0)?
                movieList.map((movie:IMovie, idx) => (
                    <Col key={idx}>
                        <StaffMovie key={idx} {...movie}/>
                    </Col>
                )):null
                }
            </Row>
            <Button style={{marginTop:"20px"}} variant="primary" onClick={newMovie}>새 영화</Button>
        </div>
    );
}

export default StaffMovieList;