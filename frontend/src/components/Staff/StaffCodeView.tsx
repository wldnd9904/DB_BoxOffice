import { useState } from "react";
import CodeManager from "../../utils/CodeManager";
import { codeListAtom } from "../../utils/recoilAtoms";
import { useRecoilState } from "recoil";
import { ICode } from "../../interfaces/Codes";
import styled from "styled-components";
import { Card, CloseButton, Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const Hover=styled.div`
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  :hover{
    transition:transform 0.1s linear;
    transform:scale(1.02);
    z-index:2;
  }
`;

function StaffCode(param:ICode) {
  const [codeList, setCodeList] = useRecoilState(codeListAtom);
  const [show, setShow] = useState(false);
  const [keys, setKeys] = useState<string[]>([]);
  const { register, handleSubmit, formState:{errors},clearErrors, setValue, setError, reset, getValues, watch} = useForm<ICode>();
  const handleOpen = () => {
    setShow(true);
    setKeys(Object.keys(param));
    reset(param);
  }
  const handleClose = () => setShow(false);
  const remove = async (CodeID:string) => {
    await CodeManager.deleteCode(CodeID);
    alert("삭제되었습니다.");
    await setCodeList(await CodeManager.getCodeList());
  } 
  const onValid = async (data:ICode) => {
    Object.keys(data).forEach(key => {
    if (data[key] === '' || data[key] == null) {
      delete data[key];
    }})
    await CodeManager.editCode(data);
    alert("수정 완료.")
    await setCodeList(await CodeManager.getCodeList());
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
        <Modal.Title>코드 정보 수정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onValid)}>
          {param?
          keys.map((key,idx)=>(
            <Form.Group key={idx} controlId={`form${key}`}>
              <Form.Label>{key}</Form.Label>
              <Form.Control {...register(key, { required: false })} type="textarea" />
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

export default StaffCode;