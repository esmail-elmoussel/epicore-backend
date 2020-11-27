const getCode = (Discount) => (req, res) => {
  Discount.findOne()
    .then((discount) => {
      if (!discount) {
        return res.status(404).json({
          message: "there is no discounts at the moment!",
        });
      }
      if (Date.now() > discount.codeExpires) {
        return res.status(410).json({ message: "code expired!" });
      }

      return res.json({ code: discount.code });
    })
    .catch(() =>
      res
        .status(500)
        .json({ message: "an error occurred please try again later" })
    );
};

module.exports = getCode;
