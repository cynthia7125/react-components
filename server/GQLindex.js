import gql from "graphql-tag";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";

const port = process.env.PORT || 8080;

const typeDefs = gql`
  type Speaker {
    id: ID!
    first: String
    last: String
    company: String
    bio: String
    twitterHandle: String
    favorite: Boolean
    sessions: [Session!]!
  }

  type Session {
    eventYear: String
    id: String
    title: String
    room: Room!
  }

  type Room {
    name: String
    capacity: Int
  }

  type Query {
    speakers: [Speaker]
  }

  type Mutation {
    updateSpeakerFavorite(id: ID!, favorite: Boolean!): Speaker
  }
`;

const resolvers = {
  Query: {
    speakers: async () => {
      const response = await fetch("http://localhost:3000/api/speakers");
      const data = await response.json();
      const speakers = data.map((item) => item.speakers).flat();
      return speakers;
    },
  },

  Mutation: {
    updateSpeakerFavorite() {
      id;
      favorite;
    },
  },
};

const app = express();

const schema = makeExecutableSchema({ typeDefs, resolvers });

const apolloServer = new ApolloServer({ schema });
async function startServer() {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}

startServer();

app.listen({ port }, () => {
  console.log(
    `🚀Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
  );
});
