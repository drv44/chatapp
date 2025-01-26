import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

//it will wrap whole of our app, children is whole of our app
const ChatProvider = ({children})=>{
    // as this is defined inside a comp so it is accesible only to this com , but as it is defind in context api so its accessible in whole of our app
    // const [user,setUser] = useState();
    // const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("userInfo")));
    const [selectedChat,setSelectedChat] = useState();
    const [chats,setChats] = useState([]);
    const [notification,setNotification] = useState([]);
    
    const history = useHistory();

    useEffect(()=>{
       
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
                setUser(userInfo);
            } 
        },[history]);

        useEffect(() => {
            const handleStorageChange = () => {
                const userInfo = JSON.parse(localStorage.getItem("userInfo"));
                setUser(userInfo);
            };

            window.addEventListener("storage", handleStorageChange);

            return () => {
                window.removeEventListener("storage", handleStorageChange);
            };
        }, []);

    return (
    <ChatContext.Provider
                value={{user,setUser,selectedChat,setSelectedChat , chats,setChats , notification,setNotification}}
    >
        {children}
    </ChatContext.Provider>
    )
};

//for making state accessable into whole of our app , we need useContext hook
export const ChatState = () =>{
    return useContext(ChatContext);
};

export default ChatProvider;