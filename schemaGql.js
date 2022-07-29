import { gql } from "apollo-server";
const typeDefs = gql`
  type Query {
    usersed: [User]
    user(_id: ID!): User
    quotes: [QuoteWithName]
    iquote(by: ID!): [Quote]
    fakeusers: [Fakeuser]
    fakeuser(_id: ID!): Fakeuser
  }

  type Fakeuser {
    _id: String
    firstName: String
    lastName: String
    email: String
    password: String
  }
  type User {
    _id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
    quotes: [Quote]
  }
  type Quote {
    name: String
    by: ID
  }
  type QuoteWithName {
    name: String
    by: IdName
  }
  type IdName {
    _id: String
    firstName: String
  }
  type Token {
    token: String
  }

  type Mutation {
    signupUser(userNew: UserInput!): User
    signInUser(userSignIn: UserSignInInput!): Token
    createQuote(name: String!): String
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  input UserSignInInput {
    email: String!
    password: String!
  }
`;
export default typeDefs;
