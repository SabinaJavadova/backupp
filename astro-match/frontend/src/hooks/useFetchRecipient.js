import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchRecipientUser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null);
  
    // recipientId-ni tapın
    const recipientId = chat?.members?.find((id) => id && id !== user?._id); // id-nin null olmadığını yoxlayın
  
    console.log("User Object:", user);
    console.log("User ID:", user?.id);
    console.log("Chat Membersssssss:", chat?.members);
    console.log("Recipient ID:", recipientId);
  
    useEffect(() => {
      const getUser = async () => {
        if (!recipientId) return;
  
        try {
          const response = await axios.get(`http://localhost:3001/api/${recipientId}`);
          console.log("Fetched recipient user:", response.data);
  
          if (response.data) {
            setRecipientUser(response.data); // response.data istifadə edin
          } else {
            setError({ message: "No data received" });
          }
        } catch (error) {
          console.error("Error fetching recipient user:", error);
          setError(error);
        }
      };
  
      getUser();
    }, [recipientId]); // recipientId-dən asılı olun
  
    return { recipientUser, error };
  };