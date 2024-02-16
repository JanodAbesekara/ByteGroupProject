import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const generateToken = (data) => {
    return jwt.sign(data, process.env.SECNAME, { expiresIn: '2d' });
};

export default generateToken;
