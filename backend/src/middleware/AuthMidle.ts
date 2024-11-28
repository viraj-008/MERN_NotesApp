
import {verifyToken} from '../utils/Auth'

declare global {
  namespace Express {
      export interface Request {
          user?: string;
      }
  }
}

export const authenticate = (req:any ,res:any, next:any) => {
  const token = req.headers.authorization?.split(" ")[1];
   console.log(token,"toeken")
   console.log(req.headers.authorization);
  if (!token) return res.status(403).json({ message: "Access denied plz Login" });

  try {
    const decoded = verifyToken(token);
    console.log(decoded)
    req.user = decoded.userId; 
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export  default authenticate;