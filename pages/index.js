import styles from '../styles/Home.module.css'
import React,{useEffect, useState} from 'react'
import {io} from 'socket.io-client'

const socket = io("https://nameless-ravine-30994.herokuapp.com:3001", {transports: ['websocket']});

export default function Home() {
  const [list, setList] = useState([]);
  const [post, setPost] = useState([]);
  const [connecting, setConnecting] = useState(true);

  useEffect(() => {
    if(!socket){
      return;
    }
    if(connecting){
      
      (async()=> {
        socket.on("webhooktest",async msg =>{
          const dbData = msg;
          setList(dbData);
          console.log(list);
        });
      })()
      setConnecting(false);
    }
  },[list])
  useEffect(() => {
    if(!socket){
      console.log("//////!socket ")
      return;
    }
      setPost(list);
      console.log("///Post :", post);
  },[])

  return (
    <div className={styles.container}>
      <ol>
      {list.reverse().map((p)=> (
        <div key={p.Time}><li>{JSON.stringify(p)}</li></div>
      ))}
      </ol>
    </div>
  )
}