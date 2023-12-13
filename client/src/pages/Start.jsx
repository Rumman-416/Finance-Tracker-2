import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <Link
        className=""
        to={{
          pathname: "/login",
        }}
      >
        Login
      </Link>
    </div>
  );
};

export default Start;
