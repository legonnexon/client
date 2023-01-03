import './App.css';
import io from 'socket.io-client'
import { useEffect, useState } from "react"

const socket = io.connect("http://localhost:3001")

function App() {
  const [room, setRoom] = useState("")

  const [message, setMessage] = useState("")
  const [messageReceive, setMessageReceive] = useState("")

  const joinRoom = () => {
    if (room  !== "") {
      socket.emit("join_room", room)
    }
  }
  
  const sendMessage = () => {
    socket.emit("send_message", { message, room })
  };

  useEffect(() => {
    if (message !== "") {
      socket.on("receive_message", (data) => {
        setMessageReceive(data.message)
      })
    }
  }, [socket])

  return (
    <div className="App">
      <input placeholder='Numero da sala:' onChange={(event) => {
        setRoom(event.target.value)
      }}/>
      <button onClick={joinRoom}>Entra na sala</button>

      <input placeholder="Mensagem" onChange={(event) => {
        setMessage(event.target.value)
      }}/>
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message:</h1>
      {messageReceive}
    </div>
  );
}

export default App;
