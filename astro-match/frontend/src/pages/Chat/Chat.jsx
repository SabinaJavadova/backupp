import React, { useContext } from "react";
import { ChatContext } from "../../context/chatContext";
import { AuthContext } from "../../context/AuthContext";
import UserChat from "./userChat";
import PotentialChats from "./potentialChats"
const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrrentChat, userChatsError} = useContext(ChatContext);

  if (isUserChatsLoading) {
    return <div>Loading chats...</div>;
  }

  if (userChatsError) {
    return <div>Error fetching chats: {userChatsError.message}</div>;
  }

  return (
    
    <section>
      <PotentialChats/>
      <div>

        {userChats?.length < 1 ? (
          <p>No chats found.</p>
        ) : (
          <>
            <div>
              {userChats?.map((chat, index) => (
                <div key={index} onClick={()=>updateCurrrentChat(chat)}>
                  <UserChat chat={chat} user={user} />
                </div>
              ))}
            </div>
            <h1>List</h1>
            <p>Chatbox</p>
          </>
        )}
      </div>
    </section>
  );
};

export default Chat;