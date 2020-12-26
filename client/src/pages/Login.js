import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../utils/mutations";
import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });

  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-md-6">
        <div className="card">
          <h4 className="card-header">Login</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button className="btn d-block w-100" type="submit">
                Submit
              </button>
            </form>
            {error && <div>Login failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;

// The forms for logging in and signing up work and return our JSON Web Token. Great! But what do we actually do with it now that it's been returned to us? As of right now, our application receives the token and immediately throws it away.

// Remember, unlike our previous experience using Express.js sessions to keep track of our logged-in user's status, the use of JSON Web Tokens involves us having to pass the token along with every request. Although it's a little more cumbersome to set up, the performance benefits and reduced stress on our server make using JWTs worth it in the long run. Oh, well—we're just going to have to create some client-side functionality that makes it easier for us to store our token and access it from other components in our app!

// So where could we store the token data so that the entire client-side of our application can access it? That would be localStorage, of course! We could use IndexedDB as well, but that would be an over-engineered solution in this case. Let's build this functionality next so we can persist our user's logged in status client-side.
