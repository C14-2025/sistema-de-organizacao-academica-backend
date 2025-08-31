import jwt from "jsonwebtoken";
import { env } from "../../env/index.js";

export function generate(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, env.JWT_KEY, { expiresIn: "12h" }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}
