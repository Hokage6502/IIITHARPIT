import { PaperClipIcon, DownloadIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';


export default function RequestTable(props) {
    const reqs = props.reqs;
    
    return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg no-scrollbar px-10">
    <table className="w-full text-md text-center text-gray-500 table-auto">
      <thead className="text-xs text-white uppercase bg-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Request ID
          </th>
          <th scope="col" className="px-6 py-3">
            Dataset ID
          </th>
          <th scope="col" className="px-6 py-3">
            Request from
          </th>
          <th scope="col" className="px-6 py-3">
            Author ID
          </th>
          <th scope="col" className="px-6 py-3">
            Status
          </th>
          <th scope="col" className="px-6 py-3">
            Date
          </th>
        </tr>
      </thead>
      <tbody>
        {reqs.map(ver =>

          <tr className="bg-white border-b hover:bg-gray-50">
              
            <td className="px-6 py-4 font-lg">
            <Link
              to="/"
              state={{ 'ReqID': ver["ReqID"]}}
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-200"
            >
              {ver["ReqID"]}
            </Link>

            </td>
            <td className="px-6 py-4 font-lg">
              {ver["database_id"]}
            </td>

            <td className="px-6 py-4 font-lg">
              {ver["request_from"]}
            </td>

            <td className="px-6 py-4 font-medium text-gray-900">
              {ver["AuthorID"]}
            </td>

            <td className="px-6 py-4">
              <div className="overflow-hidden hover:overflow-auto max-h-40 no-scrollbar">
              {ver["Status"]}
              </div>
            </td>

            <td className=''>
              {ver["Published"]}
            </td>

            
          </tr>
        )}
      </tbody>
    </table>
  </div>
    )
}