import jwt from "jsonwebtoken";

const generateToken = (data) => {
  return jwt.sign(data, "$dfdfdsrw34/efefe", { expiresIn: "5min" });
};

export default generateToken;
