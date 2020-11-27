const express = require("express");
const app = express();

// end-points
app.get("/", (req, res) => {
  res.send("getting root!");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`app is listening to port ${process.env.PORT || 5000}`);
});
