const Subscription = {
  count: {
    subscribe(parent, args, ctx, info) {
      let { pubSub } = ctx
      let count = 0

      return pubSub.asynIterator('count')
    },
  },
}

export { Subscription as default }
