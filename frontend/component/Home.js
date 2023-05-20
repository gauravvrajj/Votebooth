import { get } from 'https';
import React,{useEffect,useState} from'react'
import {Table,Container,Button,Row,Card} from 'react-bootstrap';
const Home= props=>{
    const [disabledButton, changeDisableButton]= useState(false);
    const [promptList, changePromptList]= useState([]);
    // const clearprompt=async()=>{
    //     await props.callMethod("clearpromptarray");
    // }
    useEffect(()=>{
        const getInfo=async()=>{
            let output= await props.getPrompts();
            changePromptList(output);
            if(output.length===0){
                changeDisableButton(true);
            }
        };
        getInfo();
    },[])
    return (
        <Container>
            <Table style={{margin :'5vh'}} striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>List of Polls</th>
                        <th>Go to Polls</th>
                    </tr>
                </thead>
                <tbody>
                    {promptList.map((promptName,index)=>{
                        if(promptList.length){
                            return(
                               <tr key={index}>
                               <td>{index+1}</td>
                               <td>{promptName}</td>
                               <td>
                               <Button onClick={()=>{props.changeCandidates(promptName);}}> Go to Poll </Button>
                               </td>
                               </tr> 
                            );
                        }
                    })}
                </tbody>
            </Table>
            {promptList.length>0?null:(
                <Row className='justify-content-center-d-flex'>
                  <Card style={{margin:'5vh',textAlign:'center'}}>
                    No prompts to show
                  </Card>
                </Row>
            )}

            <Row>
             <Button style={{margin:'5vh'}}>
                Clear Polls
            </Button>
            </Row>
        </Container>
        

    );
};

export default Home;