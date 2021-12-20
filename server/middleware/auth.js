const jwt = require("jsonwebtoken");
require('dotenv').config();

//Middleware to generate a token when the user is connected to his session

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.id;

    if (req.body.userId && req.body.userId !== userId) {
      throw "This user id is not available";
    } else {
      next();
    }
  } catch {
    res.status(401).json({ error: "Unidentified request" });
  }
};
