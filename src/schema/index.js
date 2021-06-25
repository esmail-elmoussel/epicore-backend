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
      pageSize: Int = 20 # The number of results to show
      cursor: String # only return results after this cursor
      first: Int # first number of elements
    ): PaginatedDiscounts!

    # get latest discount
    discount: GeneralDiscountResponse!

    validateDiscount(code: Int!): GeneralDiscountResponse
  }

  type Mutation {
    createDiscount: GeneralDiscountResponse!
  }

  type Subscription {
    discountVerified: Boolean! # just return true if the code accepted no notify user
  }

  type PaginatedDiscounts {
    cursor: String
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
