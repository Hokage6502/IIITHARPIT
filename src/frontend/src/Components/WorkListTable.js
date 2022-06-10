import { PaperClipIcon, DownloadIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import axios from "axios";

export default function VersionTable(props) {
    const items = props.items
    function PrivateDataset() {
      if (items.map.Public=="1") {
        return true;
      }
      return false;
    }
    
    return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg no-scrollbar px-10">
    <table class="w-full text-md text-center text-gray-500 table-auto">
      <thead class="text-xs text-white uppercase bg-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            Dataset ID
          </th>
          <th scope="col" class="px-6 py-3">
            Dataset Version
          </th>
          <th scope="col" class="px-6 py-3">
            Dataset Name
          </th>
          <th scope="col" class="px-6 py-3">
            Dataset Description
          </th>
          <th scope="col" class="px-6 py-3">
            Access Type
          </th>
          <th scope="col" class="px-6 py-3">
            Author ID
          </th>
          <th scope="col" class="px-6 py-3">
            Status
          </th>
          <th scope="col" class="px-6 py-3">
            Published Date
          </th>
          <th scope="col" class="px-6 py-3">
            Download
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map(ver =>

          <tr className="bg-white border-b hover:bg-gray-50">
              
            <td className="px-6 py-4 font-lg">
            <Link
              to="/review"
              state={{ 'DatasetID': ver["DatasetID"]}}
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-200"
            >
              {ver["DatasetID"]}
            </Link>

            </td>
            <td className="px-6 py-4 font-lg">
              {ver["Version"]}
            </td>

            <td className="px-6 py-4 font-medium text-gray-900">
              {ver["Name"]}
            </td>

            <td className="px-6 py-4">
              <div className="overflow-hidden hover:overflow-auto max-h-40 no-scrollbar">
              {ver["Description"]}
              </div>
            </td>

            <td className="px-6 py-4">
              <div className="overflow-hidden hover:overflow-auto max-h-40 no-scrollbar">
              {ver["Public"]=="1"?"Public":"Private"}
              </div>
            </td>

            <td class="px-6 py-4">
              {ver["AuthorID"]}
            </td>

            <td class="px-6 py-4">
              {ver["Status"]}
            </td>

            <td className=''>
              {ver["Published"]}
            </td>

            <td class="px-6 py-4">
              <button  onClick={() => {
                if(ver["Public"]=="1" )
                {

                }
                else
                {
                  
                }
              }}>{ver["Public"]=="1" ? 'Download Now' : 'Request'}</button>
            </td>
            
          </tr>
        )}
      </tbody>
    </table>
  </div>
    )


}