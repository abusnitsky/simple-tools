import pkg from 'jsonwebtoken';
const { verify } = pkg;

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; // Attach user info to request
    next();
  });
};

export default authenticateToken;