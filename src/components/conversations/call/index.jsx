import React, { useEffect, useContext } from 'react';
import { SocketContext } from '../../../contexts/socketContext';



const Call = () => {
    const {makeCall} = useContext(SocketContext)
    





    


    useEffect(()=>{
        makeCall()
    },[])

    return ( 
        <></>
     );
}
 
export default Call;