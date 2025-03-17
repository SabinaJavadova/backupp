import React from "react";
import { useFetchRecipientUser } from "../../../src/hooks/useFetchRecipient";
import "./UserChat.scss"; // SCSS faylını import edin

const UserChat = ({ chat, user }) => {

  const { recipientUser, error } = useFetchRecipientUser(chat, user);

  console.log("recip",chat);
  

  if (error) {
    return <div>Error fetching recipient user: {error.message}</div>;
  }

  if (!recipientUser) {
    return <div>Loading recipient user...</div>;
  }

  return (
    <div className="user-chat">
      <div className="text-content">
        <div className="name">{recipientUser?.name}</div>
        <div className="text">Text Mesage</div>
      </div>
    </div>
  );
};

export default UserChat;