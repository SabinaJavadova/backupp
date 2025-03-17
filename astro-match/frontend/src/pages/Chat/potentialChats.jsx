import React, { useContext } from "react";
import { ChatContext } from "../../context/chatContext";
import "./PotentialChats.scss";
import { AuthContext } from "../../context/AuthContext";

const PotentialChats = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat } = useContext(ChatContext);
  
  console.log("Potential Chats:", potentialChats);

  const handleCreateChat = (receiverId) => {
    console.log("Current User ID:", user.id);
    console.log("Receiver ID:", receiverId);
    createChat(user.id, receiverId);
  };

  return (
    <div className="all-users">
      {potentialChats &&
        potentialChats.map((u, index) => (
          <div className="single-user" key={index} onClick={() => handleCreateChat(u.id)}>
            {u.name}
            <span className="user-online"></span>
          </div>
        ))}
    </div>
  );
};

export default PotentialChats;