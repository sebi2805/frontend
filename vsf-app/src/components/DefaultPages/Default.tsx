import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { CustomSpinner } from "../common/CustomSpinner";
export const Default: React.FC = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  if (user) {
    navigate("/home");
  } else {
    navigate("/login");
  }
  return (
    <>
      <CustomSpinner />
    </>
  );
};
