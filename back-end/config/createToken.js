import jwt from "jsonwebtoken";

const generateToken = (data) => {
  return jwt.sign(data, "$dfdfdsrw34/efefe", { expiresIn: "10min" });
};

export default generateToken;
