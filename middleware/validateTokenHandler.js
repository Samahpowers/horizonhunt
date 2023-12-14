import Jwt from "jsonwebtoken";

export const validateToken = (req, res, next) => {
  let accessToken;
  let authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    accessToken = authHeader.split(" ")[1];

    Jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: "User Not Authorized" });
      } else {
        console.log(decoded);
        // If you want to attach the decoded information to the request object, you can do it like this:
       // req.applicant = decoded.applicant;
        next();
      }
    });
  } else {
    res.status(401).json({ error: "Authorization header missing or invalid" });
  }
};
