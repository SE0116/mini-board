import React from "react";
import "./Main.css";
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();

  const handleBoardClick = () => {
    navigate('/board');
  };

  const handleFAQClick = () => {
    navigate('/faq');
  };

  // const handleLogoutClick = () => {
  //   navigate('/login');
  // };

  return (
    <div className="o">
      <div className="div">
        <div className="overlap-board" onClick={handleBoardClick}>
          <div className="text-wrapper">Board</div>
          <div className="calender-wrapper">
            <img className="calender" alt="Calender" src="images/calender.png" />
          </div>
        </div>
        <div className="overlap-faq" onClick={handleFAQClick}>
          <div className="text-wrapper-2">FAQ</div>
          <div className="notepad-wrapper">
            <img className="notepad" alt="Notepad" src="images/notepad.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;