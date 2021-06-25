const { PubSub, withFilter } = require("apollo-server");
const pubsub = new PubSub();

module.exports = {
  Query: {
    discounts: (_, { pageSize, cursor, first }, { dataSources }) =>
      dataSources.discounts.getDiscounts({ pageSize, cursor, first }),
    discount: (_, __, { dataSources }) =>
      dataSources.discounts.getLatestDiscount(),
    validateDiscount: (_, { code }, { dataSources }) =>
      dataSources.discounts.validateDiscount({ code, pubsub }),
  },
  Mutation: {
    createDiscount: (_, __, { dataSources }) =>
      dataSources.discounts.createDiscount(),
  },
  Subscription: {
    discountVerified: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(["DISCOUNT_VERIFIED"]),
        () => {
          // since we dont have any users, subscription will be published to every subscribe user!
          return true;
        }
      ),
    },
  },
};
