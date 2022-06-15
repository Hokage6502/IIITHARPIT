import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Popup from "../Components/Popup"
import WorkListTable from '../Components/WorkListTable'
import RequestTable from '../Components/RequestTable'
import * as React from 'react';
// import Modal from 'react-modal';
// import axios from 'axios';
// import Parser from 'html-react-parser';
var tstatus;

const backendAPI = 'http://localhost:4000/';

export default function HomePage() {
    const [reqs,setReqs] = useState([]);
    let userid = localStorage.getItem('userid');
    var [tstatus, setValue] = React.useState('PENDING');

    const handleChange = (event) => {
      setValue(event.target.value);
    };

    useEffect(() => {
      var params = new URLSearchParams();
      params.set('AuthorID', userid);
      params.set('tstatus', tstatus);
      axios.get('http://localhost:4000/printrequest?'+ params.toString()).then(res => {
      setReqs(res.data);
      }) 
    })
    return (
      <div className="bg-gray-50 max-h-full">
        {/* <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between"> */}
        <div className="max-w-7xl mx-auto py-1 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">                 Request table</span>
        </h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-4"></div>
            
                <div className="col-md-4">
                  <label>
                    tstatus
                  <select value={ tstatus } onChange={handleChange}>
                    <option value="PENDING">PENDING</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                  </label>
                </div>
            <div className="col-md-4"></div>
          </div>
        </div>
        <RequestTable reqs={reqs}/>

      </div>

    )
  }

  