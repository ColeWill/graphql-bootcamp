import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import gql from 'graphql-tag'

const users = [
  {
    id: '1',
    name: 'Cole',
    email: 'cole@example.com',
    age: 37,
  },
  {
    id: '2',
    name: 'Steve',
    email: 'Steve@example.com',
    age: 47,
  },
  {
    id: '3',
    name: 'Sarah',
    email: 'Sarah@example.com',
  },
]

const posts = [
  {
    id: '10',
    title: 'GraphQL 101',
    body: 'This is how to use GraphQL...',
    published: true,
  },
  {
    id: '11',
    title: 'GraphQL 201',
    body: 'An advanced GraphQL post...',
    published: false,
  },
  {
    id: '12',
    title: 'Programming Music',
    body: '',
    published: false,
  },
]

// Type definitions (schema)
const typeDefs = gql`
  type Query {
    users(query: String): [User!]!
    me: User!
    post: Post!
    posts(query: String): [Post!]!
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
`

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) return users

      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    posts(parent, args, ctx, info) {
      if (!args.query) return posts

      return posts.filter((post) => {
        const query = args.query.toLowerCase()
        const title = post.title.toLowerCase()
        const body = post.body.toLowerCase()

        return title.includes(query) || body.includes(query)
      })
    },
    me: () => {
      return {
        id: '123456',
        name: 'Cole',
        email: 'cole@colemail.cole',
        age: 37,
      }
    },
    post: () => {
      return {
        id: '123',
        title: 'Mmy first post',
        body: 'This is the body of my first post',
        published: true,
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})
async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  })

  console.log(`🚀  Server ready at: ${url}`)
}
startServer()
