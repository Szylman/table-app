import { useEffect, useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { getAllStatus } from "../../redux/statusRedux";



const TableForm = ({action, actionText, variant, ...props}) => {
  const [tableId, setTableId] = useState(props.id || '');
  const [status, setStatus] = useState(props.status || '');
  const allStatus = useSelector(getAllStatus);
  const [people, setPeople] = useState(props.people || 0);
  const [maxPeople, setMaxPeople] = useState(props.maxPeople || 0);
  const [bill, setBill] = useState(props.bill || 0);
  console.log('status', allStatus);

  const handleSubmit = (e) => {
    e.preventDefault ()
    if (tableId) {
      action({ status, people, bill});
    }
  };

  useEffect(()=>{
    if (status !== 'Busy')
      setBill (0)
  },[status]);

  useEffect(()=>{
    if(maxPeople<0)
    setMaxPeople(0)
    if(maxPeople>10)
    setMaxPeople(10)
    if(people>maxPeople)
    setPeople (maxPeople)
    if(people<0)
    setPeople(0)
  },[maxPeople,people])

  return (
    <Row>
      <Col md={{span: 5}}>
        <h1>{actionText}{tableId}</h1>
        <Form onSubmit={handleSubmit}>
          {variant==='add'&&(
            <Form.Group className="mb-3 w-50">
            <Form.Control
              value={tableId}
              onChange={e => setTableId(e.target.value)}
              type="text" placeholder="Enter table" size="lg"
            />
          </Form.Group>)}
          <Form.Group className="mb-3"  as={Row}>
            <Form.Label column sm={2} className="fw-bold" >Status: </Form.Label>   
            <Col sm={10}>
              <Form.Select 
                placeholder="Please select status"
                value={status ? status : "1"}
                onChange={e => setStatus(e.target.value)}>
                  <option disabled value="1">Select status...</option>
                  {allStatus.map((status, index) => <option key={index} value={status}>{status}</option> )}   
              </Form.Select>
            </Col>            
          </Form.Group>
          <Form.Group >
          <Row className='align-items-center mb-3'>
              <Col xs={12} sm={2} md={2} >
                <Form.Label className='fw-bold'>
                  People: 
                </Form.Label>
              </Col>
              <Col xs={6} md={4} xl={5}>
            <Row className='align-items-center'>
                  <Col xs={5} md={4} xl={4} className='align-center'>
                  <Form.Control className='text-center'
                  value={people} 
                  onChange={e => setPeople(e.target.value)} />
            </Col>
            /
            <Col xs={5} md={4} xl={4} className='text-center'>
                <Form.Control className='text-center'
                value={maxPeople}
                  onChange={e => setMaxPeople(e.target.value)}/>
            </Col> 
            </Row>
            </Col>
            </Row>            
          </Form.Group> 
          {status=== 'Busy'&&(
          <Form.Group as={Row}>
            <Form.Label column sm={2} className='fw-bold'>Bill: </Form.Label> 
            <Col sm={2}>
              <div className="d-flex align-items-center">$
            <Form.Control className='text-center'
                value={bill} 
                onChange={e => setBill(e.target.value)} />
                </div>
            </Col>
          </Form.Group>)}
          <Button as="input" type="submit" value={actionText} />{' '}        
        </Form>
      </Col>
    </Row>

  ); 
};
TableForm.propTypes = {
    action: PropTypes.func.isRequired,
    actionText: PropTypes.string.isRequired,
    status: PropTypes.string,
    people: PropTypes.string,
    maxPeople: PropTypes.number,
    bill: PropTypes.number,
    variant: PropTypes.string,
    tableId: PropTypes.string,
}
export default TableForm