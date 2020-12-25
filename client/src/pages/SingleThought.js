import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_THOUGHT } from "../utils/queries";
import ReactionList from '../components/ReactionList';

const SingleThought = (props) => {
  const { id: thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId },
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  // This is similar to the query logic that you used on the homepage. The variables loading and data are destructured from the useQuery Hook. The loading variable is then used to briefly show a loading <div> element, and the data variable is used to populate a thought object. There is one difference, however. The useQuery Hook was given a second argument in the form of an object. This is how you can pass variables to queries that need them. The id property on the variables object will become the $id parameter in the GraphQL query.

  return (
<div>
  <div className="card mb-3">
    <p className="card-header">
      <span style={{ fontWeight: 700 }} className="text-light">
        {thought.username}
      </span>{' '}
      thought on {thought.createdAt}
    </p>
    <div className="card-body">
      <p>{thought.thoughtText}</p>
    </div>
  </div>

  {thought.reactionCount > 0 && <ReactionList reactions={thought.reactions} />}
</div>

  );
};

export default SingleThought;
