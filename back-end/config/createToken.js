import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();


const generateToken = (data) => {
<<<<<<< Updated upstream
    return jwt.sign(data,'$dfdfdsrw34/efefe', { expiresIn: '2d' });
=======
    return jwt.sign(data, process.env.SECNAME, { expiresIn: '2d' });
>>>>>>> Stashed changes
};

export default generateToken;