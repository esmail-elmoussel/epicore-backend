const bodyParser = require("body-parser");
const cors = require("cors");

const expressLoader = ({ app }) => {
  app.use(bodyParser.json());
  app.use(cors());

  // end-points
  app.get("/", (req, res) => {
    res.send("getting root!");
  });

  const discountControllers = require("../api");
  app.use("/discount", discountControllers);
};

module.exports = expressLoader;
