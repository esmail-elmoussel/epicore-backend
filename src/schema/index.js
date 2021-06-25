const { gql } = require("apollo-server");

const typeDefs = gql`
  type Discount {
    id: ID! # database _id
    code: Int!
    expirationDate: String! # more than 32-bit signed integer
  }

  type Query {
    # get all discounts
    discounts(
      pageSize: Int # The number of results to show
      cursor: String # only return results after this cursor
    ): PaginatedDiscounts!

    # get latest discount
    discount: GeneralDiscountResponse!

    validateDiscount(code: Int!): GeneralDiscountResponse
  }

  type Mutation {
    createDiscount: GeneralDiscountResponse!
  }

  type PaginatedDiscounts {
    cursor: String!
    hasMore: Boolean!
    discounts: [Discount]!
  }

  type GeneralDiscountResponse {
    success: Boolean!
    message: String
    discount: Discount
  }
`;

module.exports = typeDefs;
