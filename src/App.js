import React, { useState, useEffect } from "react";
import User from "./User";

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = ({ target: { value } }) => {
    setSearchTerm(value);
  };

  const fetchUsers = async () => {
    const res = await fetch("https://reqres.in/api/users/", { method: "GET" });
    const json = await res.json();
    setUsers(json.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <h1>Users</h1>
      <input
        className="input-box"
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={(e) => handleChange(e)}
      />
      <User users={users} searchTerm={searchTerm} />
    </div>
  );
};

export default App;
