import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    // With the event.preventDefault(), we're actually overriding the <a> element's default nature of having the browser load a different resource. Instead, we execute the .logout() method, which will remove the token from localStorage and then refresh the application by taking the user back to the homepage.
  };

  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
          <h1>Deep Thoughts</h1>
        </Link>

        <nav className="text-center">
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile">Me</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

// If you save your code and try to log out from the site, the application will completely reload and show the default state of the app's header with the navigation items for a logged-out user. Remember, we also completely remove the token from localStorage upon this action too, so a user has to log back in to gain access to user-based features again.

// Notice how none of this logging-out functionality interacts with the server. This is one of the perks of using JSON Web Tokens. Because the server doesn't keep track of who's logged in, it also doesn't need to know who's trying to leave either. Because of this, we can avoid users making needless requests to the server and seriously reduce the amount of work it has to do.
