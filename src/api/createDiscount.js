const createDiscount = (Discount) => (req, res) => {
  Discount.findOne()
    .then((discount) => {
      const code = Math.floor(1000 + Math.random() * 9000); // generate random 4 digits code
      const codeExpires = Date.now() + 300000; // after 5 min

      if (discount) {
        // delete the previous code and create a new one
        discount.code = code;
        discount.codeExpires = codeExpires;
        discount.save();
        return res.json({ message: "success", code });
      }

      // create new code
      Discount.create({ code, codeExpires }).then(() => {
        return res.json({ message: "success", code });
      });
    })
    .catch(() =>
      res
        .status(500)
        .json({ message: "an error occurred please try again later" })
    );
};

module.exports = createDiscount;
