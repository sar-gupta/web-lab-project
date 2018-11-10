import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => (
    <header className="header">
      <div className="content-container">
        <div className="header__content">
          <Link className="header__title" to="/">
            <h1>Blog</h1>
          </Link>
          <Link className="button button--link" to="/new">New Post</Link>
        </div>
      </div>
    </header>
  );

export default Header;