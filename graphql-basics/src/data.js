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
export { comments, users, posts }
