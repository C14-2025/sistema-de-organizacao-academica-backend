import { validate } from "./validate.js";

export async function verifyJwt(req, res, next) {
  let token = req.headers["authorization"];

  if (!token || token.length < 32) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  token = token.substring(7);

  try {
    const decoded = await validate(token);
    req._private = { jwt: decoded };

    next();
  } catch (error) {
    console.error(error);

    res.status(401).json({ error: "Unauthorized" });
  }
}
