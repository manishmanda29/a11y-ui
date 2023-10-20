import React from "react";
import "./Header.css";

export const Header = () => {
  return (
    <div class="header">

      <nav>

        <div class="logo">11y.ed</div>

        <div class="menu">

          <ul>

            <li><a href="#">Home</a></li>

            <li><a href="#">Learn</a></li>

            <li><a href="#">Games</a></li>

            <li><a href="#">Quizzes</a></li>

            <li><a href="#">Leaderboard</a></li>

            <li><a href="#">Accessibility Testing</a></li>

          </ul>

        </div>

        <div class="socials">

          <li><a href="#">Login</a></li>

          <li><a href="#">Register</a></li>

        </div>

      </nav>

      <div class="banner-text">

        <button type="button">Get Started</button>

      </div>

    </div>
  )
};