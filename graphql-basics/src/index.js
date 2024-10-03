import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { v4 as uuidv4 } from 'uuid'
import { addResolversToSchema } from '@graphql-tools/schema'
import { users, posts, comments } from './data.js' // Ensure the path and extension are correct
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'

const schema = loadSchemaSync('src/schema.graphqls', {
  loaders: [new GraphQLFileLoader()],
})

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
  Mutation: {
    createUser(parent, args, ctx, info) {
      // check if user is unique
      const emailTaken = users.some((user) => user.email === args.email)

      if (emailTaken) {
        throw new Error('Email taken.')
      }

      const user = {
        id: uuidv4(),
        name: args.name,
        email: args.email,
        age: args.age,
      }

      users.push(user)

      return user
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

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
})

const server = new ApolloServer({
  schema: schemaWithResolvers,
})
async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  })

  console.log(`🚀  Server ready at: ${url}`)
}
startServer()
