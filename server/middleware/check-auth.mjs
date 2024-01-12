import jsonwebtoken from 'jsonwebtoken';

const { verify } = jsonwebtoken;
const secretKey = process.env.SECRET_KEY;

// eslint-disable-next-line consistent-return
export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = verify(token, secretKey);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed/middle' });
  }
};
