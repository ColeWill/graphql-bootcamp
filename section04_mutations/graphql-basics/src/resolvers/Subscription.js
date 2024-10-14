const Subscription = {
  count: {
    subscribe(parent, args, { pubsub }, info) {
      if (!pubsub) {
        throw new Error('pubsub is required!')
      }

      let count = 0
      const intervalId = setInterval(() => {
        try {
          count++
          pubsub.publish('count', {
            count,
          })
        } catch (err) {
          console.error('Error publishing count')
        }
      }, 1000)

      const asyncIterator = pubsub.asyncIterator('count')

      asyncIterator.return = () => {
        clearInterval(intervalId)
        return { done: true }
      }

      return asyncIterator
    },
  },
  comment: {
    subscribe(parent, { postId }, { db, pubsub }, info) {
      const post = db.posts.find(
        (post) => post.id === postId && post.pubslished
      )

      if (!post) {
        throw new Error('Post not found for subscription')
      }

      return pubsub.asyncIterator(`comment: ${postId}`)
    },
  },
}

export { Subscription as default }
