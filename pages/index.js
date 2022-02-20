import styles from '../styles/Home.module.css'
import axios from 'axios'
import React,{useState} from 'react'
import {io} from 'socket.io-client'

const socket = io("http://localhost:3001", {transports: ['websocket']});

export default function Home() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [test, setTest] = useState("");
  const handlepost = (e) => {
    socket.emit("hello",{post:name});
  }
  socket.on("kirim", (data) =>{
    setList([...list, data]);
  })
  socket.on("webhooktest", msg =>{
    setList([...list, msg]);
  });
  return (
    <div className={styles.container}>
      <input type= "text" onChange={(e)=> setName(e.target.value)}/>
      <button onClick={handlepost}>Send Comment</button>
      
      {list.map((p)=> (
        <div key={p.Time}><li>{JSON.stringify(p)}</li></div>
      ))}
    </div>
  )
}
