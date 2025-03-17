import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./index.module.scss";

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  // Bütün istifadəçiləri gətir
  const fetchAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/users");
      console.log("API Response:", res.data);
      if (Array.isArray(res.data)) {
        setUsers(res.data);
      } else {
        console.error("API response is not an array:", res.data);
        setUsers([]);
      }
    } catch (error) {
      console.error("Xəta:", error.response?.data?.message || error.message);
      setUsers([]);
    }
  };

  // İstifadəçini sil
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${id}`);
      setUsers(users.filter((user) => user._id !== id)); // Silinən istifadəçini siyahıdan çıxar
      alert("İstifadəçi uğurla silindi!");
    } catch (error) {
      console.error("İstifadəçi silinərkən xəta baş verdi:", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className={styles.dashboard}>
      <h1>Bütün İstifadəçilər</h1>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>Ad</th>
            <th>Email</th>
            <th>Cinsiyyət</th>
            <th>Universitet</th>
            <th>Qaldığı Yer</th>
            <th>Parol</th>
            <th>Əməliyyat</th>
          </tr>
        </thead>
        <tbody>
          {!Array.isArray(users) || users.length === 0 ? (
            <tr>
              <td colSpan="7" className={styles.noData}>
                İstifadəçi tapılmadı.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.university}</td>
                <td>{user.location}</td>
                <td>{user.password}</td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
