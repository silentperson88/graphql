import { fakequotes, fakeusersList } from "./fakedb.js";
import { randomBytes } from "crypto";
import Mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { signInUserTokenSecretKey } from "./config.js";
import _ from "lodash";

import User from "./models/Users.js";
import Quote from "./models/Quotes.js";
import Users from "./models/Users.js";

const resolvers = {
  Query: {
    usersed: async () => await Users.find({}),
    user: async (_, { _id }) => await Users.findOne({ _id }),
    quotes: async () => await Quote.find({}).populate("by", "_id firstName"),
    iquote: async (_, { by }) => await Quote.find({ by }),
    fakeusers: () => {
      return fakeusersList;
    },
    fakeuser: async (parent, args) => {
      const _id = args._id;
      return _.find(fakeusersList, { _id });
    },
  },
  User: {
    quotes: async (ur) => await Quote.find({ by: ur._id }),
  },
  Mutation: {
    signupUser: async (_, { userNew }) => {
      const user = await User.findOne({ email: userNew.email });
      if (user) {
        throw new Error("User already exist with this email");
      }
      const hasshedPassword = await bcryptjs.hash(userNew.password, 12);
      const newUser = new User({
        ...userNew,
        password: hasshedPassword,
      });

      return await newUser.save();
    },

    signInUser: async (_, { userSignIn }) => {
      const user = await User.findOne({ email: userSignIn.email });
      if (!user) {
        throw new Error("User Does not exist");
      }
      const doMatch = await bcryptjs.compare(
        userSignIn.password,
        user.password
      );
      if (!doMatch) {
        throw new Error("Email or Password does't match");
      }
      const token = jsonwebtoken.sign(
        { userId: user._id },
        signInUserTokenSecretKey
      );
      return { token };
    },
    createQuote: async (_, { name }, { userId }) => {
      if (!userId) {
        throw new Error("You must first login");
      }
      const newQuote = new Quote({
        name,
        by: userId,
      });
      await newQuote.save();
      return "Quote Saved";
    },
  },
};

export default resolvers;
