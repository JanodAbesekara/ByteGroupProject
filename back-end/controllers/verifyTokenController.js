import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";

const verifyTokenController = async (req, res) => {
    const { token } = req.query;
   

    if (!token) {
        return res.status(404).json({ Success: false, msg: "Invalid Token !" });
    }

    // decode the token
    let decodeToken;
    try {
        decodeToken = jwt.verify(token, "$dfdfdsrw34/efefe");
    } catch (err) {
        // err
        return res.status(400).json({ Success: false, msg: "Invalid Token !", error: err });
    }

    // check if user is present or not
    const oldUser = await User.findOne({ email: decodeToken.email });

    if (!oldUser) {
        return res.status(400).json({ Success: false, msg: "User Not Found" });
    }

    res.status(200).json({ Success: true, data: decodeToken.email });
};

export default verifyTokenController;
