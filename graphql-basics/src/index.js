import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// Type definitions (schema)
const typeDefs = `
type Query {
    title: String!,
    price: Int!,
    releaseYear: Int!,
    rating: Float!,
    inStock: Boolean!,
}`;

// Resolvers
const resolvers = {
  Query: {
    title: () => "Harry Potter",
    price: () => 20,
    releaseYear: () => 2001,
    rating: () => 4.5,
    inStock: () => true,
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
}
startServer();
