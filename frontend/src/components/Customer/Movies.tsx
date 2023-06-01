import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import IMovie from '../../interfaces/Movie';
import { demoMovies } from '../../utils/demos';
import { selectedMovieAtom } from '../../utils/recoilAtoms';
import Movie from '../atoms/Movie';
import { Modal } from 'react-bootstrap';
import { YYYYMMDD } from '../../utils/timeFormatter';
import Grade from '../atoms/Grade';
const MoviesContainer = styled.div`
  display: flex;
  margin-top: 70px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  justify-content: center;
  flex-wrap: wrap;
`;
const ModalBody = styled(Modal.Body)`
  display:flex;
  flex-direction: column;
  margin:10px;
`;
const Delimeter = styled.div`
margin:10px 0;
border:0.5px solid lightgray;
`;
const DetailLabel = styled.div`
  display:flex;
  flex-direction:row;
  justify-content: space-between;
  margin:2px;
`;
const Title = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    color:black;
    font-size:1.5em;
    font-weight: bold;
    div {
      margin-right:10px;
    }
`;
interface MoviesParams {
  onSelect: () => void;
}
function Movies(params:MoviesParams) {
  const [detailedMovie, setDetailedMovie] = useState<IMovie>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [selectedMovie,setSelectedMovie] = useRecoilState<IMovie>(selectedMovieAtom);
  const onSelectMovie = (movie:IMovie) => {
    setSelectedMovie(movie);
    params.onSelect();
  }
  const onDetailShow = (movie:IMovie) => {
    setDetailedMovie(movie);
    setShowDetail(true);
  }
  return (
    <>
    <MoviesContainer>
      {
        demoMovies.map((movie,idx) => <Movie selectable key={idx} movie={movie} onDetail={()=>onDetailShow(movie)} onSelect={()=>onSelectMovie(movie)}/>)
      }
    </MoviesContainer>
      <Modal
        show={showDetail}
        onHide={()=>setShowDetail(false)}
        keyboard={false}
        centered
    >
      {detailedMovie?
        <>
        <Modal.Header closeButton>
        <Title>
          <Grade grade={detailedMovie.mov_grade_no}/>{detailedMovie.mov_nm}
        </Title>
        </Modal.Header>
        <ModalBody>
          {detailedMovie.mov_detail}
          <Delimeter/>
          <DetailLabel>
            <a>감독</a>
            <a>{(detailedMovie.dir_nm)}</a>
          </DetailLabel>
          <DetailLabel>
            <a>배우</a>
            <a>{(detailedMovie.act_nm)}</a>
          </DetailLabel>
          <DetailLabel>
            <a>배급사</a>
            <a>{(detailedMovie.distributor)}</a>
          </DetailLabel>
          <DetailLabel>
            <a>기본 정보</a>
            <a>{`${detailedMovie.mov_grade_no}, ${detailedMovie.run_time_min}분, ${detailedMovie.lang}`}</a>
          </DetailLabel>
          <DetailLabel>
            <a>개봉일</a>
            <a>{YYYYMMDD(detailedMovie.release_date)}</a>
          </DetailLabel>
        </ModalBody>
        </>
        :null}
    </Modal>
    </>
  )
}
export default Movies;