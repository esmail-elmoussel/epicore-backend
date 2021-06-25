const { ApolloServer } = require("apollo-server");
const loaders = require("./loaders");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const DiscountModal = require("./models/Discount");
const DiscountsDatasource = require("./datasources/Discounts");

const startServer = async () => {
  await loaders();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      discounts: new DiscountsDatasource(DiscountModal),
    }),
  });

  server.listen().then(({ url }) => {
    console.log(`Server is running on ${url}`);
  });
};

startServer();
