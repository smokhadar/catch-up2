const jwt = require("jsonwebtoken");

module.exports.verifyUser = async (req) => {
  try {
    req.email = null;

    const bearerHeader = req.headers.authorization;

    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];

      const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.email = payload.email;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
