/*import { BrowserRouter as Router, Route, Routes, Link, Redirect } from "react-router-dom";
import Navbar from './Components/Navbar';
import UploadPage from './Pages/uploadPage';
import HomePage from './Pages/homepage';
import ReviewPage from './Pages/reviewPage';
import CommentsPage from './Pages/commentsPage';
import UploaderPage from "./Pages/uploaderPage";
import LoginPage from './Pages/loginPage';
import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { Button } from 'react-bootstrap';

async function setLoginState(userid = null) {
  localStorage.setItem('userid', userid);
}


function App() {
  const [logged, setLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('userid') !== 'null') {
      setLoggedIn(true);
    }
  }, []);
  
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="navbar-item">
                <Link to="/requests" className="nav-link">Requests</Link>
              </li>
              <li className="navbar-item" style={{ float: 'right' }}>
                <Popup trigger={<button onClick={() => {
                  localStorage.clear();
                }}> {logged ? 'Logout' : 'Login'} </button>}>
                  {close => (
                    !logged ? 
                      <>
                        <Button onClick={() => {
                          setLoggedIn(true);
                          setLoginState(1);
                          close();
                        }}>
                        Login as User 1
                        </Button>
                        <Button onClick={() => {
                          setLoggedIn(true);
                          setLoginState(2);
                          close();

                        }}>
                        Login as User 2
                        </Button>
                      </>
                      :
                      <Button  onClick={() => {
                        setLoggedIn(false);
                        setLoginState();
                        close();

                      }}>
                        Logout
                      </Button> 
                  )}
                </Popup>
              </li>
            </ul>
            <p style={{float: 'right'}}>
              {localStorage.getItem('userid')}
            </p>
          </div>
        </nav>
        <br/>
        <Routes>
          <Route exact path="/" element={<HomePage />}/>
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/comments" element={<CommentsPage />} />
          <Route path="/uploader" element={<UploaderPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;*/

import { BrowserRouter as Router, Route, Routes, Redirect } from "react-router-dom";
import Navbar from './Components/Navbar';
import UploadPage from './Pages/uploadPage';
import HomePage from './Pages/homepage';
import ReviewPage from './Pages/reviewPage';
import CommentsPage from './Pages/commentsPage';
import UploaderPage from "./Pages/uploaderPage";
import RequestPage from "./Pages/request";


function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <br />
      <Routes>
        <Route exact path="/" element={<HomePage />}/>
        <Route exact path="/home" element={<HomePage />}/>
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/request" element={<RequestPage />} />
        <Route path="/comments" element={<CommentsPage />} />
        <Route path="/uploader" element={<UploaderPage />} />
        
      </Routes>
      </Router>
    </div>
  );
}

export default App;
