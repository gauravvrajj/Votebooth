import React, { useEffect, useState } from'react'
import {Container,Row, Col,Button} from 'react-bootstrap';
const Pollingstation= props=>{

    const [candidate1url, changecandiadate1url]=useState("https://cdn3.iconfinder.com/data/icons/luchesa-vol-9/128/Hourglass-512.png");
    const [candidate2url, changecandiadate2url]=useState("https://cdn3.iconfinder.com/data/icons/luchesa-vol-9/128/Hourglass-512.png");

    const[ showresult,changeResultDisplay]=useState(false);
    const[buttonStatus,changeButtonStatus]=useState(false);
    const [candidate1votes,cahngevote1]=useState(0);
    const [candidate2votes,cahngevote2]=useState(0);
    const [prompt,changeprompt]=useState("--");

    useEffect(()=>{
        const getInfo=async()=>{
        let promptName=localStorage.prompt;
        let voteCount=await props.viewMethod("getValue",{
            prompt: promptName,
        });

        changecandiadate1url(
        await props.viewMethod("geturl",{
        prompt: localStorage.getItem("prompt"),
        name: localStorage.getItem("Candidate1"),
        })
        );

        changecandiadate2url(
        await props.viewMethod("geturl",{
            prompt: localStorage.getItem("prompt"),
            name: localStorage.getItem("Candidate2"),
            })
        );

        changeprompt(localStorage.getItem("prompt"));

        let diduservote=await props.viewMethod("didparticipate",{
            prompt: localStorage.getItem("prompt"),
            user:props.wallet.accountId,
        });
        changeResultDisplay(diduservote);
        changeButtonStatus(diduservote);
    }
    getInfo();
},[showresult]
    );

    const addVote=async(index)=>{
        changeButtonStatus(true);
        await props.callMethod("addVote",{
            prompt: localStorage.getItem("prompt"),
            index: index,
        });
        await props.callMethod("recorduser",{
            prompt:localStorage.getItem("prompt"),
            user: props.wallet.accountId,
        });

        let voteCount=await props.viewMethod("getValue",{
            prompt: localStorage.getItem("prompt"),
        });
        cahngevote1(voteCount[0]);
        cahngevote2(voteCount[1]);
        alert("Thanks for voting! ");

        changeResultDisplay(true);
    };
    return (
      <div>
        <Container>
            <Row>
                <Col className= "justify-content-center d-flex"
                style={{width:'20vw'}}>
                    <Container>
                        <Row style={{marginTop:'5vh',backgroundColor:'#c4c4c4'}}>
                            <div style={{
                                display:"flex",
                                justifyContent:'center',
                                padding:'3vw'
                            }}>
                                <img style={{
                                    height:'35vh',
                                    width:'20vw',
                                }}
                                src={candidate1url}>
                                </img>
                            </div>
                        </Row>
                        {showresult?(
                         <Row
                            className='justify-coontent-center d-flex'
                            style={{marginTop:'5vh'}}>
                                <div style={{
                                    display:'flex',
                                    justifyContent:'center',
                                    fontSize:'8vw',
                                    padding:'10px',
                                    backgroundColor:'#c4c4c4',
                                }}>
                                    {candidate1votes}
                                </div>
                         </Row>
                        ):null}
                        <Row
                        className='justify-coontent-center d-flex'
                            style={{marginTop:'5vh'}}>
                                <Button disabled={buttonStatus}
                                onClick={()=> addVote(0)}>
                                    Vote
                                </Button>
                        </Row>
                    </Container>
                </Col>
                <Col className= "justify-content-center d-flex"
                style={{width:'10vw'}}>
                     <div style={{
                                    display:'flex',
                                    justifyContent:'center',
                                    height:'20vh',
                                    padding:'10==2vw',
                                    backgroundColor:'#c4c4c4',
                                    alignItems:'center',
                                    textAlign:'center',
                                    marginTop:'5vh',
                                }}>
                            {prompt}
                     </div>
                </Col>
                <Col className= "justify-content-center d-flex"
                style={{width:'20vw'}}>
                    <Container>
                        <Row style={{marginTop:'5vh',backgroundColor:'#c4c4c4'}}>
                            <div style={{
                                display:"flex",
                                justifyContent:'center',
                                padding:'3vw'
                            }}>
                                <img style={{
                                    height:'35vh',
                                    width:'20vw',
                                }}
                                src={candidate2url}>
                                </img>
                            </div>
                        </Row>
                        {showresult?(
                         <Row
                            className='justify-coontent-center d-flex'
                            style={{marginTop:'5vh'}}>
                                <div style={{
                                    display:'flex',
                                    justifyContent:'center',
                                    fontSize:'8vw',
                                    padding:'10px',
                                    backgroundColor:'#c4c4c4',
                                }}>
                                    {candidate2votes}
                                </div>
                         </Row>
                        ):null}
                        <Row
                        className='justify-coontent-center d-flex'
                            style={{marginTop:'5vh'}}>
                                <Button disabled={buttonStatus}
                                onClick={()=> addVote(1)}>
                                    Vote
                                </Button>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
      </div>
    );
};

export default Pollingstation;