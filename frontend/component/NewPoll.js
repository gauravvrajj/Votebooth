import React, { useRef, useState} from'react'
import { Container,Form,Button,Row, Col, Card } from 'react-bootstrap';
import { async } from 'regenerator-runtime';
const NewPoll= props=>{
    const candidateName1 =useRef();
    const candidateName2 =useRef();

    const candidateName1URL=useRef();
    const candidateName2URL=useRef();

    const promptRef= useRef();

    const[ disableButton, changeDisable]= useState(false);
    const[ displayMessage, changeDisplayMessage]= useState(false);

    const sendToBlockchain=async()=>{
        changeDisable(true);
        await props.callMethod("addCandidatePair",{
            prompt: promptRef.current.value,
            name1: candidateName1.current.value,
            name2: candidateName2.current.value,
            url1: candidateName1URL.current.value,
            url2:candidateName2URL.current.value,
        })

        await props.callMethod("addtopromptset",{
            prompt: promptRef.current.value,
        });
        await props.callMethod("initvote",{
            prompt: promptRef.current.value,
        })
       
        alert("Return back to Home screen");
    };
    return (
    <Container style={{marginTop:"10px"}}>
        <Row> 

            <Card>
                <Card.Body>
                    <Card.Title>Voting prompt</Card.Title>
                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Label>Prompt</Form.Label>
                            <Form.Control ref={promptRef}
                            placeholder='Add prompt'>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
       </Row>
        <Row style={{marginTop:'8vh'}}>
        <Col className='justify-content-center-d-flex'>
            <Card style={{width:'18rem'}}>
            <Card.Body>
                <Card.Title> Candidate1 Information</Card.Title>
                <Card.Subtitle className="mb-2 text muted">
                    Enter your Information for your first candidate
                </Card.Subtitle>
                <Form.Group className='mb-3'>
                    <Form.Label> Candidate 1 Name</Form.Label>
                    <Form.Control 
                    ref={candidateName1}
                    placeholder='Enter candidate name'>
                    </Form.Control>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label> Candidate 1 Image URL</Form.Label>
                    <Form.Control 
                    ref={candidateName1URL}
                    placeholder='Enter candidate Image URL'>
                    </Form.Control>
                </Form.Group>
            </Card.Body>
            </Card>
        </Col>
        <Col className='justify-content-center-d-flex'>
            <Card style={{width:'18rem'}}>
            <Card.Body>
                <Card.Title> Candidate 2 Information</Card.Title>
                <Card.Subtitle className="mb-2 text muted">
                    Enter your Information for your second candidate
                </Card.Subtitle>
                <Form.Group className='mb-3'>
                    <Form.Label> Candidate 2 Name</Form.Label>
                    <Form.Control 
                    ref={candidateName2}
                    placeholder='Enter candidate name'>
                    </Form.Control>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label> Candidate 2 Image URL</Form.Label>
                    <Form.Control 
                    ref={candidateName2URL}
                    placeholder='Enter candidate Image URL'>
                    </Form.Control>
                </Form.Group>
            </Card.Body>
            </Card>
        </Col>
        </Row> 
        <Row style={{marginTop:"10vh"}}>
         <Button
         onClick={sendToBlockchain}
         disabled={disableButton}
         variant='primary'
         >
         Submit
         </Button>
        </Row>
        
    </Container>
       );
};

export default NewPoll;