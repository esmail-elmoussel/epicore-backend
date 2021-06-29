const { MongoDataSource } = require("apollo-datasource-mongodb");
const { paginateList } = require("../utils");

module.exports = class Discounts extends MongoDataSource {
  constructor(Discount) {
    super(Discount);
    this.Discount = Discount;
  }

  discountReducer = (discount) => {
    return {
      id: discount._id,
      code: discount.code,
      expirationDate: discount.expirationDate,
    };
  };

  getDiscounts = async ({ pageSize, cursor, first }) => {
    return await this.Discount.find()
      .sort({ _id: -1 })
      .then(async (allDiscounts) => {
        let discounts = await paginateList({
          cursor,
          pageSize,
          first,
          list: Array.isArray(allDiscounts) ? allDiscounts : [],
        });

        discounts = await discounts.map((discount) =>
          this.discountReducer(discount)
        );

        return {
          cursor: discounts.length ? discounts[discounts.length - 1].id : null,
          hasMore: discounts.length
            ? discounts[discounts.length - 1].id !==
              allDiscounts[allDiscounts.length - 1]._id
            : false,
          discounts,
        };
      })
      .catch(() => []);
  };

  getLatestDiscount = async () => {
    return this.Discount.find()
      .sort({ _id: -1 })
      .limit(1)
      .then((discount) => {
        let latestDiscount = discount[0];
        if (!latestDiscount) {
          return {
            success: false,
            message: "there is no discounts at the moment!",
          };
        }

        if (Date.now() > latestDiscount.expirationDate) {
          return {
            success: false,
            message: "code expired!",
          };
        }

        return {
          success: true,
          discount: this.discountReducer(latestDiscount),
        };
      })
      .catch(() => ({
        success: false,
        message: "an error occurred please try again later",
      }));
  };

  createDiscount = async () => {
    const code = Math.floor(1000 + Math.random() * 9000); // generate random 4 digits code
    const expirationDate = Date.now() + 300000; // after 5 min

    return await this.Discount.create({ code, expirationDate })
      .then((discount) => {
        return {
          success: true,
          message: "successfully created discount!",
          discount: this.discountReducer(discount),
        };
      })
      .catch(() => ({
        success: false,
        message: "an error occurred please try again later",
      }));
  };

  validateDiscount = async ({ code, pubsub }) => {
    return await this.Discount.findOne({ code })
      .then((discount) => {
        if (!discount) {
          return {
            success: false,
            message: "code is not valid!",
          };
        }

        if (Date.now() > discount.expirationDate) {
          return {
            success: false,
            message: "code expired!",
          };
        }

        // puplish to subscribed users that code is accepted
        pubsub.publish("DISCOUNT_VERIFIED", {
          discountVerified: true,
        });

        return {
          success: true,
          message: "code accepted!",
          discount: this.discountReducer(discount),
        };
      })
      .catch(() => ({
        success: false,
        message: "an error occurred please try again later",
      }));
  };
};
