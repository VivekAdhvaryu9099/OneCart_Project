import jwt from 'jsonwebtoken'

const adminAuth = (req, res, next) => {
  try {
    const token = req.cookies.token; // get the token from cookies

    if (!token) {
      return res.status(401).json({ message: "Token Not Found" });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // check if email matches admin
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "Forbidden: Not Admin" });
    }

    // attach admin email to request
    req.email = decoded.email;
    next(); // pass control to the next middleware/route

  } catch (error) {
    console.log("Admin Auth Error:", error);
    return res.status(401).json({ message: "Invalid or Expired Token" });
  }
};

export default adminAuth;
