const jWT = require("jsonwebtoken")

exports.verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ error: "Access denied" });
  
    try {
      const decoded = jWT.verify(token, process.env.secret_key);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };



//   const verifyToken = (req, res, next) => {
//       const token = req.headers["authorization"];
//       if (!token) return res.status(403).json({ error: "Access denied" });
//       try {
//         const decoded = jWT   .verify(token, process.env.secret_key);
//         req.user = decoded;
//         next();
//       } catch (error) {
//         return res.status(401).json({ error: "Invalid token" });
//       }
//     };