import React from "react";
import { Link, withRouter } from "react-router-dom";
import "../css/header.css";

export default withRouter(({ location: { pathname } }) => (
  <header className="header">
    <ul className="headerList">
      <li>
        <Link to="/" className="sLink">
          CardWallet
        </Link>
      </li>
      <li>
        <Link to="/" className="sLink">
          패스리스트
        </Link>
      </li>
      <li>
        <Link to="/notice" className="sLink">
          공지사항
        </Link>
      </li>
      <li>
        <Link to="/mypage" className="sLink">
          마이페이지
        </Link>
      </li>
    </ul>
  </header>
));
