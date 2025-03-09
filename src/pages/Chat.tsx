import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createdSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

export const Chat = (): React.JSX.Element => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const user = useSelector((store: any) => store.user)
  const userId = user?._id
  const firstName = user?.firstName
  const lastName = user?.lastName

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + '/chat/' + targetUserId, {
      withCredentials: true
    })

    const chatMessages = chat?.data?.messages.map((msg: any) => {
      return {
        firstName: msg?.senderId?.firstName,
        lastName: msg?.senderId?.lastName,
        text: msg.text,
      }
    })

    setMessages(chatMessages);
  }

  useEffect(() => {
    fetchChatMessages();
  }, [])

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createdSocketConnection();
    socket.emit("joinChat", { firstName, userId, targetUserId })

    socket.on("messageReceived", ({ firstName, text }) => {
      console.log("firstName", firstName)
      setMessages((prevMessages) => [...prevMessages, { text }]);
    })

    return () => {
      socket.disconnect();
    }

  }, [userId, targetUserId])


  const sendMessage = () => {
    if (!newMessage.trim()) {
      return;
    }
    const socket = createdSocketConnection();
    socket.emit("sendMessage", { firstName, lastName, userId, targetUserId, text: newMessage });
    setNewMessage('');
  }

  console.log(targetUserId);
  return (
    <div className='w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col'>
      <h1 className='p-5 border-b border-gray-600'>Chat</h1>
      <div className='flex-1 overflow-scroll p-5'>
        {messages.map((message) => {
          return (
            <div className={"chat " + (user.firstName === message.firstName ? "chat-end" : "chat-start")}>
              <div className="chat-header">
                {message.firstName + ' ' + message.lastName}
                <time className="text-xs opacity-50">2 hours ago</time>
              </div>
              <div className="chat-bubble">{message.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          )
        })}
      </div>
      <div className='p-5 border-t border-gray-600 flex items-center gap-2'>
        <input className='border-2 border-gray-300 rounded-md p-2 flex-1' placeholder='Type a message...' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <button className='ml-2 bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-md' onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}
