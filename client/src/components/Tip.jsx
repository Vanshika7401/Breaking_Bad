import React, { Children } from "react";
import { BiCurrentLocation, BiMessageDetail } from 'react-icons/bi'
import { AiOutlineFileJpg, AiOutlineEye} from 'react-icons/ai'
import CommentSection from "./CommentSection";
import axios from "axios";
import download from 'downloadjs';

const Tip = ({tipoff,children}) => {
    const getFile = (file, filename) => {
      fetch(`http://localhost:3030/tipoff/file?path=${file}`)
        .then(res => res.blob())
        .then(data => download(data, filename));
    };
  
    // console.log(tipoff)
    return (
    <>
        <div className='flex flex-row w-full p-2 space-x-2 rounded-md'>
            <BiCurrentLocation size={25} className="w-1/12"/>
            <p className='w-11/12 text-left'>{tipoff.location}</p>
          </div>

          <div className="w-full my-1 border-t"></div> 

          <div className='flex flex-row w-full p-2 space-x-2 overflow-y-auto rounded-md max-h-52'>
            <BiMessageDetail size={25} className="w-1/12"/>
            <p className='w-11/12 text-left'>{tipoff.message}</p>
          </div>

          {tipoff.filePaths.length !== 0 && <>
            <div class="w-full my-1 border-t"></div> 

            <div className='flex flex-row w-full p-2 space-x-2 rounded-md'>
              <AiOutlineEye size={25}/>
              <div className='flex flex-row w-11/12'>
                <AiOutlineFileJpg size={25} className="mt-1 cursor-pointer" onClick={() => getFile(tipoff.filePaths[0].path, tipoff.filePaths[0].name)}/>
                {Array.from({length: tipoff.filePaths.length-1}, (_, index) => index + 1).map(ind => <AiOutlineFileJpg size={25} className="mt-1 ml-2 cursor-pointer" onClick={() => getFile(tipoff.filePaths[ind].path, tipoff.filePaths[ind].name)}/>)}
              </div>
            </div>
          </>}
          
          <CommentSection tipoff={tipoff} />
        {children}
    </>
    )
}

export default Tip;