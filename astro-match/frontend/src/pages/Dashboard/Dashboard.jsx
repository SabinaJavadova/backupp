import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.scss";

const Dashboard = () => {
  const [users, setUsers] = useState([]); // Bütün istifadəçiləri saxlayan state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Gələn cavab:", response.data);

        if (response.data) {
          setUsers(response.data); // Bütün istifadəçiləri state-ə əlavə et
        } else {
          console.error("İstifadəçi məlumatları tapılmadı!");
        }
      } catch (err) {
        console.error("User data fetch error:", err);
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3001/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Silinən istifadəçini siyahıdan çıxar
      setUsers(users.filter((user) => user._id !== userId));
      alert("İstifadəçi uğurla silindi!");
    } catch (err) {
      console.error("İstifadəçi silinərkən xəta baş verdi:", err);
      alert("İstifadəçi silinərkən xəta baş verdi!");
    }
  };

  return (
    <div className="dashboard">
      <h1>Bütün İstifadəçilər</h1>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <p>
                {user.name} - {user.email} - {user.zodiacSign} - {user.age} yaş
              </p>
              <button onClick={() => handleDeleteUser(user._id)}>Sil</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>İstifadəçi tapılmadı.</p>
      )}
    </div>
  );
};

export default Dashboard;