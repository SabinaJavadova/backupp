import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  console.log("User:", user);
  console.log("CURRENT CHAT:", currentChat); // **Debug üçün bax**

  useEffect(() => {
    const getUsers = async () => {
      if (!user || !userChats) return;

      try {
        const response = await axios.get("http://localhost:3001/api/users");

        if (!response.data) {
          console.error("Error fetching users: No data received");
          return;
        }

        console.log("Fetched users:", response.data);

        const pChats = response.data.filter((u) => {
          let isChatCreated = false;
          if (user.id === u.id) return false;
          if (userChats) {
            isChatCreated = userChats.some((chat) => chat.members[0] === u._id || chat.members[1] === u._id);
          }
          return !isChatCreated;
        });

        setPotentialChats(pChats);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getUsers();
  }, [userChats, user]);

  useEffect(() => {
    const getUserChats = async () => {
      if (!user?.id) return;

      setIsUserChatsLoading(true);
      setUserChatsError(null);

      try {
        const response = await axios.get(`http://localhost:3001/chat/${user.id}`);
        console.log("Fetched chats:", response.data);

        if (response.data) {
          setUserChats(response.data); // Düzgün formatda chat-ləri set et
        }
      } catch (error) {
        console.error("Error fetching user chats:", error);
        setUserChatsError(error);
      } finally {
        setIsUserChatsLoading(false);
      }
    };

    getUserChats();
  }, [user]); // Refresh olanda bu yenidən çağırılacaq

  // **🚀 Fix: currentChat funksiyası indi parametr qəbul edir**
  const updateCurrrentChat = useCallback((chat) => {
    console.log("Updating current chat:", chat);
    setCurrentChat(chat);
  }, []);

  const createChat = useCallback(async (firstId, secondId) => {
    console.log("Creating chat with firstId:", firstId, "and secondId:", secondId);
    try {
      const response = await axios.post("http://localhost:3001/chat", {
        firstId,
        secondId,
      });

      console.log("Chat created response:", response.data);

      if (response.data) {
        setUserChats((prev) => {
          const updatedChats = prev ? [...prev, response.data] : [response.data];
          return updatedChats;
        });

        // Remove the user from potentialChats
        setPotentialChats((prev) => prev.filter((chat) => chat.id !== secondId));

        // **Yeni açılan chati currentChat kimi set et**
        updateCurrrentChat(response.data);
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  }, [updateCurrrentChat]);

  return (
    <ChatContext.Provider
      value={{ userChats, isUserChatLoading, userChatsError, potentialChats, createChat, updateCurrrentChat, currentChat }}
    >
      {children}
    </ChatContext.Provider>
  );
};
