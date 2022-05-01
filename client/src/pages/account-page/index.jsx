import React, { useState, useEffect } from "react";
import { getUser } from "../../components/apis/users";

const AccountPage = () => {
  const [userData, setUserData] = useState({ userName: "", email: "" });

  useEffect(() => {
    const setData = async () => {
      const { userName, email } = await getUser();
      setUserData({ ...userData, userName: userName, email: email });
    };
    setData();
  }, [userData]);

  if (userData.userName) {
    return (
      <div className="main-content">
        username: {userData.userName} <br />
        email: {userData.email}
      </div>
    );
  } else {
    return <div className="main-content">Loading...</div>;
  }
};

export default AccountPage;
