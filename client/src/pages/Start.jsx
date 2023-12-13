import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <Link
        className="block py-2 text-[#23253a] hover:text-[#fff]"
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
