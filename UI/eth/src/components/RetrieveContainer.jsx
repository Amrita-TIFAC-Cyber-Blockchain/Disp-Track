import React, { useState } from 'react';
import { useStateProvider } from '../context/StateContext';
import { Navigate } from "react-router-dom";
import { reducerCases } from '../context/Constants';
import {useEffect} from 'react'

function RetrieveContainer() {

  const [{redirect_page,contract,retrieved_data},dispatch] = useStateProvider();

  const [redir, setRedir] = useState(false);

  useEffect(() => {
    dispatch({ type: reducerCases.SET_REDIRECT, redirect_page: false });
  }, []);

  const getHandler = async (event) => {
    event.preventDefault();
    console.log(event.target.documentid.value)
    let retrieved_data = await contract.retrieveData(event.target.documentid.value);
    console.log("contractValue=",retrieved_data);
    console.log(typeof(retrieved_data))
    dispatch({type:reducerCases.SET_RETRIEVED_DATA, retrieved_data:retrieved_data})
    dispatch({type:reducerCases.SET_REDIRECT,redirect_page:true})
    setRedir(true); 
  }

  return (
    <div className='retrievecontainer'>
      {
        redir && <Navigate to="/DisP-Track/retrieve"></Navigate>
      }
      <form onSubmit={getHandler}>
        <input type="text" id="documentid" name="documentid" placeholder="Document ID" className='docidinput' />
        <button type='submit' className='retrieve-button'>Retrieve Document</button>
      </form>
      
      
    </div>
  );
}

export default RetrieveContainer;