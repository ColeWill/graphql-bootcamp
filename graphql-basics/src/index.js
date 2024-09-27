import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import gql from "graphql-tag";

// Type definitions (schema)
const typeDefs = gql`
  type Query {
    grades: [Int!]!
    greeting(name: String, position: String): String!
    add(numbers: [Float!]!): Float!
    me: User!
    post: Post!
  }
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    grades(parent, args, ctx, info) {
      return [99, 80, 93, 100];
    },
    add: (parent, args, ctx, info) => {
      if (args.numbers.length < 1) {
        return 0;
      }
      return args.numbers.reduce((acc, curr) => {
        return acc + curr;
      });
    },
    greeting: (parent, args, ctx, info) => {
      if (args.name && args.position) {
        return `Hello, ${args.name}!  You are my favorite ${args.position}`;
      } else {
        return "Heelow!";
      }
      console.log(args);
      return "heller werld";
    },
    me: () => {
      return {
        id: "123456",
        name: "Cole",
        email: "cole@colemail.cole",
        age: 37,
      };
    },
    post: () => {
      return {
        id: "123",
        title: "Mmy first post",
        body: "This is the body of my first post",
        published: true,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);

  //   process.on("SIGING", () => {
  //     httpServer.close(() => {
  //       process.exit(0);
  //     });
  //   });

  //   process.on("SIGTERM", () => {
  //     httpServer.close(() => {
  //       process.exit(0);
  //     });
  //   });
}
startServer();
