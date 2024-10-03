import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import gql from 'graphql-tag'

const comments = [
  {
    id: '10',
    body: 'so cool!',
    author: '3',
    postID: '10',
  },
  {
    id: '11',
    body: 'I should chime in here...',
    author: '2',
    postID: '11',
  },
  {
    id: '12',
    body: 'there is no body',
    author: '1',
    postID: 12,
  },
  {
    id: '13',
    body: 'Comment number 4',
    author: '3',
    postID: '13',
  },
  {
    id: '14',
    body: 'I want to learn rust',
    author: '3',
    postID: '14',
  },
]

const users = [
  {
    id: '1',
    name: 'Cole',
    email: 'cole@example.com',
    age: '37',
  },
  {
    id: '2',
    name: 'Steve',
    email: 'Steve@example.com',
    age: '47',
  },
  {
    id: '3',
    name: 'Frumpy',
    email: 'Frumpy@example.com',
  },
  {
    id: '4',
    name: 'User 4',
    email: '4@4.com',
  },
]

const posts = [
  {
    id: '10',
    title: 'GraphQL 101',
    body: 'This is how to use GraphQL...',
    published: true,
    author: '1',
  },
  {
    id: '11',
    title: 'GraphQL 201',
    body: 'An advanced GraphQL post...',
    published: false,
    author: '1',
  },
  {
    id: '12',
    title: 'Programming Music',
    body: '',
    published: false,
    author: '2',
  },
  {
    id: '13',
    title: 'Title 4',
    body: 'Body of the post',
    published: false,
    author: '3',
  },
  {
    id: '14',
    title: 'Book Club',
    body: 'Body of the post',
    published: false,
    author: '3',
  },
]

// Type definitions (schema)
const typeDefs = gql`
  type Query {
    users(query: String): [User!]!
    me: User!
    post: Post!
    posts(query: String): [Post!]!
    comments(query: String): [Comment!]!
  }
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }
  type Comment {
    id: ID!
    body: String!
    author: User!
    postID: ID!
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
    comments(parent, args, ctx, info) {
      if (!args.query) return comments

      return comments.filter((comment) => {
        const query = args.query.toLowerCase()
        const body = comment.body.toLowerCase()

        return body.includes(query)
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
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.postID === parent.id
      })
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id
      })
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        console.log(comment)
        return comment.postID === parent.id
      })
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
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
