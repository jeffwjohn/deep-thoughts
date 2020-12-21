// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`

  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    thoughts: [Thought]
    friends: [User]
  }
  
  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
  }
  
`;

// With this, we've now defined our thoughts query that it could receive a parameter if we wanted. In this case, the parameter would be identified as username and would have a String data type.


// export the typeDefs
module.exports = typeDefs;

// Remember that with GraphQL, we access our API through two passages: queries and mutations. To define a query, you use the type Query {} data type, which is built into GraphQL. From there, you can define your different types of queries by naming them, just as you would name a function in JavaScript. In our case, we created a query named helloWorld. Not only that, we also explicitly specified that the type of data to be returned by this query will be a string.

// All type definitions need to specify what type of data is expected in return, no matter what. GraphQL has built-in data types known as scalars. Scalars work similarly to how we defined data in Mongoose using JavaScript's built-in types, but there are some differences that we'll learn about as we go.

// Creating a GraphQL API isn't much different than building a REST API with Express.js routes and controllers. Instead of creating a bunch of endpoints to handle all of the different types of requests, we consolidate them into one endpoint and provide more detailed information as to what the API is going to do for us.