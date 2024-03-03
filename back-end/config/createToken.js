import jwt from "jsonwebtoken";

const generateToken = (data) => {
  return jwt.sign(data, "$dfdfdsrw34/efefe", { expiresIn: "1min" });
};

export default generateToken;
