import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import EditAccountForm from "./edit-account";
import { getUser } from "../../components/apis/users";
import PageHeader from "../../components/header";

const AccountPage = () => {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    gradDate: "",
    realName: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const setData = async () => {
      const { userName, email, realName, gradDate } = await getUser();
      setUserData({
        userName: userName,
        email: email,
        realName: realName,
        gradDate: gradDate,
      });
    };
    setData();
  }, [showModal]);

  if (userData.userName) {
    const EditProfileBtn = () => (
      <Button
        onClick={() => {
          setShowModal(true);
        }}
      >
        Edit Profile
      </Button>
    );
    return (
      <div className="main-content">
        <PageHeader text="Account Details" button={<EditProfileBtn />} />
        username: {userData.userName} <br />
        email: {userData.email} <br />
        {userData.realName ? userData.realName : ""} <br />
        {userData.gradDate ? userData.gradDate : ""}
        {showModal && (
          <EditAccountForm
            show={showModal}
            handleClose={handleClose}
            realName={userData.realName}
          />
        )}
      </div>
    );
  } else {
    return <div className="main-content">Loading...</div>;
  }
};

export default AccountPage;
