import React from "react";
import { useQuery } from "@apollo/react-hooks";
import ThoughtList from "../components/ThoughtList";
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from "../utils/queries";
import Auth from "../utils/auth";
import FriendList from "../components/FriendList";
import ThoughtForm from "../components/ThoughtForm";

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // When we load the Home component in the application, we'll execute the query for the thought data. Because this is asynchronous, just like using fetch(), Apollo's react-hooks library provides a loading property to indicate that the request isn't done just yet. When it's finished and we have data returned from the server, that information is stored in the destructured data property. Working with Promise-based functionality in React can get cumbersome. But with the loading property, we'll be able to conditionally render data based on whether or not there is data to even display.
  const thoughts = data?.thoughts || [];
  console.log(thoughts);
  //So what's this weird syntax? This is called optional chaining, and it's new to JavaScript—so new that only browsers seem to support it. If we tried to use it in a Node server, we'd receive a syntax error, because Node doesn't know what it is yet. Optional chaining negates the need to check if an object even exists before accessing its properties. In this case, no data will exist until the query to the server is finished. So if we type data.thoughts, we'll receive an error saying we can't access the property of data—because it is undefined. What we're saying is, if data exists, store it in the thoughts constant we just created. If data is undefined, then save an empty array to the thoughts component.

  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        {loggedIn && (
          <div className="col-12 mb-3">
            <ThoughtForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
