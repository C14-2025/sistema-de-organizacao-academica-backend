import jwt from "jsonwebtoken";
import { env } from "../../env/index.js";

export async function validate(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, env.JWT_KEY, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
}
