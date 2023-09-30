import React from 'react';
import './UploadForm.css';
import uuid4 from "uuid4";
import { useStateProvider } from "../context/StateContext";
import { SHA256 } from 'crypto-js';
import { Navigate } from "react-router-dom";
import { ethers } from "ethers";
import { utils } from 'web3';


function UploadForm() {

  const [{fileInfo, contract},dispatch] = useStateProvider();
 
  if (fileInfo == null) {
    return (
      <Navigate to="/DisP-Track/"></Navigate>)
  }

  const {name,size,type,lastModifiedDate}=fileInfo
  const date=String(lastModifiedDate)

  const fileNameWithoutExtension = name.split('.').slice(0, -1).join('.');
  
  const docid = uuid4();
  console.log(docid)

  //Metadata JSON Object
  const metadata=`{
    "Name":"${name}",
    "Size":"${size}",
    "Type":"${type}",
    "LastModifiedDate":"${lastModifiedDate}",
    "Document ID":"${docid}"   
  }`
  console.log(metadata)

  const parsedMetadata = JSON.parse(metadata)
  console.log(parsedMetadata)

  let md = "";
  for (const key in parsedMetadata) {
    if (parsedMetadata.hasOwnProperty(key)) {
        md+=(`${key}: ${parsedMetadata[key]}\n`);
    }
  }

  let confVal = 1;
  function handleConfidentiality(event) {
    confVal = parseInt(event.target.value) 
  }
  
  //Hashing
  const metadataString = JSON.stringify(metadata);
  // const hash = SHA256(metadataString).toString()
  // console.log('SHA-256 Hash:', hash);

  const hash = ethers.id(metadataString)
  console.log("hash:",hash);

  //String to bytes32
  //const convHash = ethers.encodeBytes32String(hash)

  //upload function parameters
  const _identifier = docid
  const _data = {
    Title: String(name),
    data: {
      MetaDataHash: hash, 
      Name: String(name),
      Type: String(type),
      Size: String(size),
      LastModifiedDate: String(lastModifiedDate)
    },
    level: confVal 
 };

  const handleSubmit = (event) => {
    event.preventDefault();
    contract.upload(_identifier, _data);
  };

  return (
    <>
    <div className='main'>
    <div className='uploadform'>
      
      <form onSubmit={handleSubmit}> 

        <div className='heading--text'>
            <h1 className='uploadform_h1'>Document Details</h1>
        </div>

          <label className='uploadform_label'>Title (Required)</label>
          <input type="text" id="documenttitle" name="documenttitle" placeholder="Document title" className='uploadforminput' defaultValue={fileNameWithoutExtension} />
        
          <label htmlFor="description" className='uploadform_label'>Description (Required)</label>
          <textarea id="description" name="description" rows="4" cols="50" className='descriptionbox' placeholder="Write about your Document"></textarea>
    
          <label htmlFor="confidentiality" className='uploadform_label'>Confidentiality Level</label>
          <select onChange={handleConfidentiality} id="confidentiality" name="confidentiality">
            <option value="1">Top Secret</option>
            <option value="2">Secret</option>
            <option value="3">Public</option>
          </select>

          <label className='uploadform_label'>Owned By</label>
          <input type="text" id="ownedby" name="ownedby" placeholder="Who owns the Document?" className='uploadforminput' />

          <label htmlFor="metadata" className='uploadform_label'>MetaData</label>
          <div>
            <pre className='metadata--pre'>
              {md}
            </pre>     
          </div>

          <label htmlFor="documentID" className='uploadform_label'>Document ID (Copy the Document ID to retrieve it in the future)</label>
          <div>
            <pre className='metadata--pre'>
              {docid}
            </pre>     
          </div>

          <label htmlFor="hash" className='uploadform_label'>Hash of MetaData</label>
          <div>
            <pre className='metadata--pre'>
              {hash}
            </pre>     
          </div>

        <input type="submit" value="Upload Metadata" className='uploadforminput' />
      </form>
    </div>
    </div>
    </>
  );
}

export default UploadForm;
