import React from "react";
import "./Header.css";

export const Header = () => {
  return (
    <div className="HEADER">
      <img className="line" alt="Line" src="line-12.svg" />
      <div className="text-wrapper">Quizzes</div>
      <div className="overlap">
        <div className="div">Games</div>
        <div className="group">
          <div className="group-2">
            <div className="text-wrapper-2">Home</div>
            <img className="img" alt="Line" src="line-6.svg" />
          </div>
        </div>
        <div className="text-wrapper-3">Learn</div>
      </div>
      <div className="frame">
        <div className="text-wrapper-4">Register</div>
      </div>
      <div className="div-wrapper">
        <div className="text-wrapper-4">Login</div>
      </div>
      <div className="text-wrapper-5">Leaderboard</div>
      <div className="text-wrapper-6">Accessibility Testing</div>
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <div className="group-3">
            <div className="text-wrapper-7">11y.ed</div>
          </div>
          <img className="logo-shapes" alt="Logo shapes" src="logo-shapes-13.png" />
        </div>
      </div>
    </div>
  );
};