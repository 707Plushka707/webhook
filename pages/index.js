import styles from '../styles/Home.module.css'
import axios from 'axios'
import React,{useEffect, useState} from 'react'
import {io} from 'socket.io-client'

const socket = io("http://localhost:3001", {transports: ['websocket']});

export default function Home() {
  const [list, setList] = useState([]);
  const [connecting, setConnecting] = useState(true);

  useEffect(() => {
    if(!localStorage){
      return;
    }
    if(connecting){
      socket.on("webhooktest",async msg =>{
        const data = [...list, msg];
        console.log("aaaaa");
        setList([data]);
        localStorage.setItem("get", JSON.stringify(data));
      });
      setConnecting(false);
    }



  }, [connecting, list])


  useEffect(() =>{
    if(!localStorage){
      return;
    }
    if(localStorage.getItem("get")){
      setList(JSON.parse(localStorage.getItem("get")));
    }

  },[])
  return (
    <div className={styles.container}>
      {list.reverse().map((p)=> (
        <div key={p.Time}><li>{JSON.stringify(p)}</li></div>
      ))}
    </div>
  )
}
