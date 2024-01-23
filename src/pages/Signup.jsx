import React from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/login');
  };

  return (
    <div className="signup">
      <div className="div">
        <div className="rectangle" />
        <div className="rectangle-2" />
        <div className="text-wrapper">ID</div>
        <div className="text-wrapper-2">Password</div>
        <div className="text-wrapper-3">Sign Up</div>
        <div className="p">회원가입 페이지입니다</div>
        <div className="overlap-group">
          <div className="text-wrapper-4">Submit</div>
          <img className="img" alt="Rectangle" src="rectangle-11.svg" />
          <img className="img" alt="Rectangle" src="rectangle-12.svg" onClick={handleSignupClick} />
        </div>
      </div>
    </div>
  );
};

export default Signup;