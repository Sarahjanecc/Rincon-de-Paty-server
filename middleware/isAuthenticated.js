const { expressjwt } = require("express-jwt");

const isAuthenticated = expressjwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: (req) => {
    if (req.headers === undefined || req.headers.authorization === undefined) {
      console.log("sin token");
      return null;
    }
    console.log("test", req.headers.authorization);
    const tokenArr = req.headers.authorization.split(" ");
    const tokenType = tokenArr[0];
    const token = tokenArr[1];

    if (tokenType !== "Bearer") {
      console.log("Token invalido");
      return null;
    }

    console.log("Token entregado");
    return token;
  },
});

module.exports = isAuthenticated;
