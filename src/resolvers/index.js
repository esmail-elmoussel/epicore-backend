module.exports = {
  Query: {
    discounts: (_, { pageSize, cursor, first }, { dataSources }) =>
      dataSources.discounts.getDiscounts({ pageSize, cursor, first }),
    discount: (_, __, { dataSources }) =>
      dataSources.discounts.getLatestDiscount(),
    validateDiscount: (_, { code }, { dataSources }) =>
      dataSources.discounts.validateDiscount({ code }),
  },
  Mutation: {
    createDiscount: (_, __, { dataSources }) =>
      dataSources.discounts.createDiscount(),
  },
};
