import { useState, createContext, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";


export const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [unseenMessages, setUnseenMessages] = useState({})

    const { socket, axios } = useContext(AuthContext)

    //function to get all users for sidebar

    const getUsers = async () => {
        try {
            const { data } = await axios.get('/api/messages/users')
            if (data.success) {
                setUsers(data.users)
                setUnseenMessages(data.unseenMessages)
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    //function to get messages for selected user

    const getMessages = async (id) => {
        try {
            const { data } = await axios.get(`/api/messages/${id}`)
            if (data.success) {
                setMessages(data.messages)
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    //function to send message to selected user
    const sendMessage =async (messageData)=>{
        try {
            console.log(messageData)
            const { data } = await axios.post(`/api/messages/send/${selectedUser._id}`,messageData)
            if (data.success) {
                setMessages((messages)=>[...messages,data.data])
            }
            else{
                toast.error(data.message)
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    //function to subscribe to message for selected user

    const subscribeToMessage=async()=>{
        if(!socket)return;
        socket.on("newMessage",(newMessage)=>{
            if(selectedUser && newMessage.senderId===selectedUser._id){
                newMessage.seen=true
                setMessages((prevMessages)=>[...prevMessages,newMessage])
                axios.put(`/api/messages/mark/${newMessage._id}`)
            }
            else{
                setUnseenMessages((prevUnseenMessages)=>({
                    ...prevUnseenMessages,[newMessage.senderId]:prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages[newMessage.senderId]+1:1
                }))
            }
        })
    }

    //function to unsubscribe from messages

    const unsubscribeToMessage=async()=>{
        if(socket) socket.off("newMessage");
    }

    useEffect(()=>{
        subscribeToMessage()
        return ()=>unsubscribeToMessage();
    },[socket,selectedUser])

    const value = {
        messages,
        users,
        selectedUser,
        getUsers,
        getMessages,
        sendMessage,
        setSelectedUser,
        unseenMessages,
        setUnseenMessages
    }
    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}