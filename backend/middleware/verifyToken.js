import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies && req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Error verifying token", { error: error.message });
    return res.status(401).json({ message: "Invalid token" });
  }
};
