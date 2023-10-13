import React from "react";
import "./App.css";

export default function User({ users, searchTerm }) {
  const userList = () => {
    const filteredData = users.filter((user) => {
      return user.email.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return filteredData.map((user) => {
      return (
        <div key={user.id} data-testid="users-list">
          <p>
            <strong>{user.first_name}</strong>
          </p>
          <p data-testid="email">{user.email}</p>
          <img key={user.avatar} src={user.avatar} alt={user.id} />
        </div>
      );
    });
  };

  return <div className="flex">{userList()}</div>;
}
