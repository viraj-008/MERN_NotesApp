
import {verifyToken} from '../utils/Auth'

export const authenticate = (req:any ,res:any, next:any) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(403).json({ message: "Access denied" });

  try {
    const decoded = verifyToken(token);
    req.user = decoded.userId; // Attach user ID to the request object
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export  default authenticate;