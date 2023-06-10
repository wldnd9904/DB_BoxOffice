import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { CloseButton, Form } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import IMovie from '../../interfaces/Movie';
import { genreNameAtom, movieGradeNameAtom, movieListAtom } from '../../utils/recoilAtoms';
import MovieManager from '../../utils/MovieManager';
import Movie from '../atoms/Movie';
import { IMovieDictionary } from '../../interfaces/Dictionary';

const Hover=styled.div`
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  :hover{
    transition:transform 0.1s linear;
    transform:scale(1.02);
    z-index:2;
  }
`;
const FormControl=styled(Form.Control)`

`;
function StaffMovieView(param:IMovie) {
  const genreName = useRecoilValue(genreNameAtom);
  const gradeName = useRecoilValue(movieGradeNameAtom);
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
    console.log(data);
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
      <Card as={Hover} style={{width: 'auto', maxWidth: '40rem'}}>
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
          keys.map((key,idx)=>{
            switch(key){
              case "gen_no": 
      return  <Form.Group style={{marginTop:"10px"}} key={idx} controlId={`form${key}`}>
                <Form.Label>{IMovieDictionary[key]}</Form.Label>
                <Form.Select {...register(key, {required:true})}>
                  {genreName?Object.keys(genreName).map((key,index)=>(<option key={index} value={genreName[key].gen_no}>{genreName[key].gen_nm}</option>)):null}
                </Form.Select>
              </Form.Group>;
              case "mov_grade_no": 
      return  <Form.Group style={{marginTop:"10px"}} key={idx} controlId={`form${key}`}>
                <Form.Label>{IMovieDictionary[key]}</Form.Label>
                <Form.Select {...register(key, {required:true})}>
                  {gradeName?Object.keys(gradeName).map((key,index)=>(<option key={index} value={gradeName[key].mov_grade_no}>{gradeName[key].mov_grade_nm}</option>)):null}
                </Form.Select>
              </Form.Group>;
              case "release_date": 
      return  <Form.Group style={{marginTop:"10px"}} key={idx} controlId={`form${key}`}>
                <Form.Label>{IMovieDictionary[key]}</Form.Label>
                <Form.Control {...register(key, {required:true})} type="date" />
              </Form.Group>;
              case "mov_detail": 
              case "image_url":
      return  <Form.Group style={{marginTop:"10px"}} key={idx} controlId={`form${key}`}>
                <Form.Label>{IMovieDictionary[key]}</Form.Label>
                <Form.Control as="textarea" {...register(key, {required:true, maxLength: 400})} type="textarea"/>
              </Form.Group>
              default: 
      return  <Form.Group style={{marginTop:"10px"}} key={idx} controlId={`form${key}`}>
                <Form.Label>{IMovieDictionary[key]}</Form.Label>
                <Form.Control {...register(key, {required:true})} type="text"/>
              </Form.Group>
            }
          })
          :
          null
          }
          <Button variant="primary" type="submit" style={{marginTop:"10px"}}>
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