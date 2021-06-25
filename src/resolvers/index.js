module.exports = {
  Query: {
    discounts: (_, { pageSize, cursor }, { dataSources }) =>
      dataSources.discounts.getDiscounts({ pageSize, cursor }),
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
