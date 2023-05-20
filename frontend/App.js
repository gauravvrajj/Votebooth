import 'regenerator-runtime/runtime';
import React from 'react';

import './assets/global.css';

import { EducationalText, SignInPrompt, SignOutButton } from './ui-components';

//reactbootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
//react router

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";

//custom Components

import Home from "./component/Home";
import NewPoll from "./component/NewPoll";
import Pollingstation from "./component/Pollingstation";
//navbar
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import{Card,Button,Row} from 'react-bootstrap';
export default function App({ isSignedIn, contractId, wallet }) {

  const signInFun=()=> {
    wallet.signIn();
  };
  const signOutFun=()=> {
    wallet.signOut();
  };

  const callMethod= async(methodName, args={})=>{
   wallet.callMethod({
    contractId: contractId,
    method:methodName,
    args: args,
   });
  };
  const viewMethod=async(methodName, args={})=>{
    return await wallet.viewMethod({
      contractId: contractId,
      method:methodName,
      args: args,
    });
  };
  const getPrompts= async()=>{
    return await viewMethod("getallprompt");
  }
 const changeCandidateFunction= async(prompt)=>{
  let namePair=await viewMethod("getcandidatepair",{prompt:prompt});
  await localStorage.setItem("Candidate1", namePair[0]);
  await localStorage.setItem("Candidate2", namePair[1]);
  await localStorage.setItem("prompt", prompt);
  await window.location.replace(window.location.href+"pollingstation");
 };
  const displayHome=()=>{
    if(isSignedIn){
    return (
      <Routes>
         <Route path='/' element={<Home 
          callMethod={callMethod} 
          viewMethod={viewMethod}
          getPrompts={getPrompts}
          changeCandidates={changeCandidateFunction}
         />}></Route>
         <Route path='/newpoll' element={<NewPoll 
         callMethod={callMethod} 
         viewMethod={viewMethod}
         getPrompts={getPrompts}
         />}></Route> 
        <Route path='/pollingstation' element={<Pollingstation 
         callMethod={callMethod} 
         viewMethod={viewMethod}
         wallet={wallet}
        />}></Route>
      </Routes>
    ); 
    }
    else
    {
      return(
     <Container>
      <Row className='justify-content-center d-flex'></Row>
      <Card style={{maarginTop:'5vh',width:'30vh'}}>
        <Container><Row>
          Hey there! Please Sign In:d
          </Row>
          <Row className='justify-content-center d-flex'>
            <Button onClick={signInFun}>Login</Button>
          </Row>
          </Container>
      </Card>
     </Container>
      );
    }
  };
  return (
    <Router>
     <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Vote</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link disabled={!isSignedIn} href="/newpoll">New Poll</Nav.Link>
            <Nav.Link onClick={isSignedIn? signOutFun :signInFun} href="#memes">
              {isSignedIn ? wallet.accountId:"Login"}
            </Nav.Link>
          </Nav> 
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {displayHome()}
  </Router>
  );
  

};