const validateCode = (Discount) => (req, res) => {
  const { code } = req.body;

  Discount.findOne()
    .then((discount) => {
      if (!discount) {
        return res.status(404).json({
          message: "there is no discounts at the moment!",
        });
      }

      if (code != discount.code) {
        return res.status(401).json({ message: "code is not valid!" });
      }

      if (Date.now() > discount.expirationDate) {
        return res.status(410).json({ message: "code expired!" });
      }

      return res.status(202).json({ message: "code accepted" });
    })
    .catch(() =>
      res
        .status(500)
        .json({ message: "an error occurred please try again later" })
    );
};

module.exports = validateCode;
