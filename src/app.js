const { ApolloServer } = require("apollo-server");
const loaders = require("./loaders");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const DiscountModal = require("./models/Discount");
const DiscountsDatasource = require("./datasources/Discounts");
const { validateToken } = require("./utils");

const startServer = async () => {
  await loaders();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      discounts: new DiscountsDatasource(DiscountModal),
    }),
    subscriptions: {
      path: "/subscriptions",
      onConnect: (connectionParams) => {
        console.log("subscription connected!");
        validateToken(connectionParams.authorization);
      },
    },
    context: ({ req }) => {
      if (req) validateToken(req.headers.authorization);
    },
    introspection: true,
  });

  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`Server is running on ${url}`);
  });
};

startServer();
