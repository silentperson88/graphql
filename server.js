import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "./schemaGql.js";

import mongoose from "mongoose";
import { MONGO_URL, signInUserTokenSecretKey } from "./config.js";

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongodb");
});

mongoose.connection.on("error", (err) => {
  console.log("error connecting", err);
});

//import models here
import "./models/Quotes.js";
import "./models/Users.js";

import resolvers from "./resolver.js";
import jwt from "jsonwebtoken";

//its a middleware
const context = ({ req }) => {
  const authHeader = req.headers.authorization;
  const authorization = authHeader.split(" ")[1];
  if (authorization) {
    const { userId } = jwt.verify(authorization, signInUserTokenSecretKey);
    return { userId };
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
