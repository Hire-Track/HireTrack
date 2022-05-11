import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import EditAccountForm from "./edit-account";
import { getUser } from "../../components/apis/users";
import PageHeader from "../../components/header";
import LoadingPage from "../loading-page";
import dateFormat from "dateformat";

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

  const formatDate = (date) => {
    return dateFormat(date, "longDate");
  };

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
        {userData.realName ? (
          <>
            Name: {userData.realName}
            <br />
          </>
        ) : (
          ""
        )}
        Username: {userData.userName} <br />
        Email: {userData.email} <br />
        {userData.gradDate ? (
          <>
            Graduation Date: {formatDate(userData.gradDate)}
            <br />
          </>
        ) : (
          ""
        )}
        {showModal && (
          <EditAccountForm
            show={showModal}
            handleClose={handleClose}
            realName={userData.realName}
            gradDate={userData.gradDate}
          />
        )}
      </div>
    );
  } else {
    return <LoadingPage />;
  }
};

export default AccountPage;
