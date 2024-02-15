import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (data) => {
    return jwt.sign(data,process.env.Token, { expiresIn: '2d' });
};

export default generateToken;
