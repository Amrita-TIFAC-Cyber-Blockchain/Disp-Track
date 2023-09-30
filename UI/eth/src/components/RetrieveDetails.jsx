import React, { useState } from 'react';
import { useStateProvider } from '../context/StateContext';
import "./RetrieveDetails.css"
import { reducerCases } from '../context/Constants';
import ReactLoading from 'react-loading';
import { Navigate } from "react-router";

function RetrieveDetails() {
    const [loader, setLoader] = useState(true);

    setTimeout(alertAfter3Seconds, 1500);
    function alertAfter3Seconds() {
        setLoader(false);
    }

    const [{redirect_page,retrieved_data},dispatch] = useStateProvider();

    console.log("In Retrieve Details",retrieved_data)
    if (redirect_page == false) {
      return (
        <>
          <Navigate to={"/DisP-Track/"}></Navigate>
        </>
      );
    }

    return (
      <div className="retrievedoc-main">
        {loader && (
          <ReactLoading
            type={"spin"}
            color={"#04BEFE"}
            height={300}
            width={100}
            className="loader"
          />
        )}
        
        {!loader && (
          <>
            <h1 className="retrievedDocDet_h1">Retrieved Document Details</h1>
            <div className='retrievedoc-container'>
              <p className='retrievedDocDet--pre'>{String(retrieved_data)}</p>
            </div>
          </>
        )}
    </div>
    )
}

export default RetrieveDetails;