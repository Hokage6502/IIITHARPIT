import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Popup from "../Components/Popup"
import WorkListTable from '../Components/WorkListTable'
import RequestTable from '../Components/RequestTable'
// import Modal from 'react-modal';
// import axios from 'axios';
// import Parser from 'html-react-parser';




function GetFeild(props) {
    return (
        <div class="shadow-md">
                <form action="" class="w-full p-4">
                    <div class="mb-2">
                    <label for="comment" className="text-lg text-gray-600">Enter the Dataset ID for the dataset</label>
                    <textarea className="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                        value={props.state}
                        name="comment" placeholder="" onChange={(e) => props.setState(e.target.value)}></textarea>
                    </div>
                </form>
            </div>
        )
}

function Button(props) {
    return (
        <Link to="/review" state={{"DatasetID": props.state}}>
        <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={props.onClick}
                >
                  Get Dataset
                </button>
        </Link>
    )
}

const backendAPI = 'http://localhost:4000/';


export default function HomePage() {
    const [nav, setNav] = useState(false);
    const [id, setId] = useState(0);
    const [items, setItems] = useState([]);
    const [reqs,setReqs] = useState([]);
    let userid = localStorage.getItem('userid');
    // let [selectedDatabaseId, setSelectedDatabaseId] = useState(0);
    // let [privateDatasetAccess, setPrivateDatasetAccess] = useState([]);
    // let [selectedRow, setSelectedRow] = useState({});
    // let [isPrivate, setIsPrivate] = useState(items);
    // let [modalOpen, setModalOpen] = useState(false);
    // let userid = localStorage.getItem('userid');
    // const [agree, setAgree] = useState(false);

    useEffect(() => {
      var params = new URLSearchParams();
      params.set('AuthorID', userid);
      // params.set('Status', 'PENDING');
      // axios.all([
      //  axios.get('http://localhost:4000/datasets?' + params.toString()).then(res => {
      //  setItems(res.data);
      //  }),
      // axios.get('http://localhost:4000/printrequest?'+ params.toString()).then(res => {
      // setReqs(res.data);
      // }) 
      axios.get('http://localhost:4000/datasets?' + params.toString()).then(res => {
       setItems(res.data);
      })
    //  ])
    })

    // useEffect(() => {
    //   var params = new URLSearchParams();
    //   params.set('AuthorID', userid);
    //   // params.set('Status', 'PENDING');
    //   axios.get('http://localhost:4000/datasets?' + params.toString()).then(res => {
    //     setItems(res.data);
    //   });        
    // })

    // async function requestTable() {
    //   let userid = localStorage.getItem('userid');
    //   var params = new URLSearchParams();
    //       params.set('AuthorID', userid);
    //   return axios.get('http://localhost:4000/printrequest?'+ params.toString()).then(res => {
    //     reqs=(res.data);  })
    // }

    return (
      <div className="bg-gray-50 max-h-full">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to contribute?</span>
            <span className="block text-indigo-600">Upload a new dataset or Review an existing dataset.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link to="/upload">
                <a
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    Upload a Dataset
                </a>
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
                <a onClick={() => setNav(true)}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                >
                    Review a Dataset
                </a>
            </div>
          <Popup open={[nav, setNav]} component={<GetFeild state={id} setState={setId}/>} button={<Button state={id} />} />
          </div>
        </div>
        <div className="max-w-7xl mx-auto py-1 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">                 Datasets to request from</span>
        </h2>
        </div>
        <WorkListTable items={items}/>
        
      </div>
    )
  }

  