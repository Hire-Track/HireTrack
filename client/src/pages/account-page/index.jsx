import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import EditAccountForm from "./edit-account";
import { getUser } from "../../components/apis/users";
import PageHeader from "../../components/header";
import LoadingPage from "../loading-page";
import dateFormat from "dateformat";
import "./styles.css";

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
    const TitleText = ({ title, data }) => (
      <>
        {title}:{" "}
        <span className={"header-3 data"}>
          <strong>{data}</strong>
        </span>
        <br />
      </>
    );
    return (
      <div className="main-content">
        <PageHeader text="Account Details" button={<EditProfileBtn />} />
        {userData.realName ? (
          <TitleText title="Name" data={userData.realName} />
        ) : (
          ""
        )}
        <TitleText title="Username" data={userData.userName} />
        <TitleText title="Email" data={userData.email} />
        {userData.gradDate ? (
          <TitleText
            title="Graduation Date"
            data={formatDate(userData.gradDate)}
          />
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
