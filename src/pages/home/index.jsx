import React from 'react';
import { useEffect } from 'react';
import { getUserSchema } from '../../schemas';

const Home = () => {

 
    async function getMediaDevices(){
        const media_devices = await navigator.mediaDevices.getUserMedia({video:true,audio:true})
        console.log(media_devices)
    }

    async function makeCall(){
    const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
    const peerConnection = new RTCPeerConnection(configuration); 
    const offer = await peerConnection.createOffer()
    // console.log(offer)
    peerConnection.addEventListener("icecandidate",event =>{
        if(event.candidate){
            console.log(event.candidate)
        }
    }) 
    }
    useEffect(()=>{
        makeCall()
    },[])

    return ( 
        <div>
            <h1>Home</h1>
        </div>
     );
}
 
export default Home;