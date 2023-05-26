import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { CloseButton, Form } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import IMovie from '../../interfaces/Movie';
import { movieListAtom } from '../../utils/recoilAtoms';
import MovieManager from '../../utils/MovieManager';
import Movie from '../atoms/Movie';

const Hover=styled.div`
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  :hover{
    transition:transform 0.1s linear;
    transform:scale(1.02);
    z-index:2;
  }
`;

function StaffMovieView(param:IMovie) {
  const [movieList, setMovieList] = useRecoilState(movieListAtom);
  const [show, setShow] = useState(false);
  const [keys, setKeys] = useState<string[]>([]);
  const { register, handleSubmit, formState:{errors},clearErrors, setValue, setError, reset, getValues, watch} = useForm<IMovie>();
  const handleOpen = () => {
    setShow(true);
    setKeys(Object.keys(param));
    reset(param);
  }
  const handleClose = () => setShow(false);
  const remove = async (movieID:string) => {
    await MovieManager.deleteMovie(movieID);
    alert("삭제되었습니다.");
    await setMovieList(await MovieManager.getMovieList());
  } 
  const onValid = async (data:IMovie) => {
    Object.keys(data).forEach(key => {
    if (data[key] === '' || data[key] == null) {
      delete data[key];
    }})
    await MovieManager.editMovie(data);
    alert("수정 완료.")
    await setMovieList(await MovieManager.getMovieList());
    handleClose();
  };
  return (
    <>
      <Card as={Hover} style={{ width: '40rem' }}>
        <Card.Body>
          <CloseButton style={{float:"right"}} onClick={()=>{remove(`${param.mov_no}`)}}/>
          <Card.Title>{`${param.mov_no}: ${param.mov_nm}`}</Card.Title>
          <Button variant="primary" onClick={handleOpen}>수정</Button>
        </Card.Body>
      </Card>
    <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>영화 정보 수정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Movie movie={param} onSelect={()=>{}}/>
        <Form onSubmit={handleSubmit(onValid)}>
          {param?
          keys.map((key,idx)=>(
            <Form.Group key={idx} controlId={`form${key}`}>
              <Form.Label>{key}</Form.Label>
              <Form.Control {...register(key, {required:false})} type="text"/>
            </Form.Group>)
          )
          :
          null
          }
          <Button variant="primary" type="submit">
              정보 수정
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default StaffMovieView;