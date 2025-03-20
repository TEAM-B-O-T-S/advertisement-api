// middleware to authorize users
import { expressjwt } from "express-jwt";
export const authorize = (roles = []) => {
  return (req, res, next) => {
      const userRole = req.auth.role; // Assuming req.user is populated with the logged-in user's data
      if (roles.length && !roles.includes(userRole)) {
          return res.status(403).json("Access denied: insufficient permissions"); 
      }
      
      next();
  };
};