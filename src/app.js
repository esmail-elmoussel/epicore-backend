const { ApolloServer } = require("apollo-server");
const loaders = require("./loaders");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const DiscountModal = require("./models/Discount");
const DiscountsDatasource = require("./datasources/Discounts");
const config = require("./config");

const startServer = async () => {
  await loaders();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      discounts: new DiscountsDatasource(DiscountModal),
    }),
    context: ({ req }) => {
      const token = req.headers.authorization;
      const authorized = token === config.AUTH_PASSWORD;

      // we can validate users here and get there data and role, but since we dont have any users, it's just dummy text password for our server!
      if (!authorized) throw new Error("It is a private server!");
    },
  });

  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`Server is running on ${url}`);
  });
};

startServer();
