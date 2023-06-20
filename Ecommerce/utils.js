import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

/* export const generateToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "24h" });
};

export const authToken = (req, res, next) => {
  let token = req.headers.authorization
  if (!token) token = req.cookies['myCookieForToken']
  if (!token) return res.status(401).json({ error: 'Not authenticated!'})
  jwt.verify(token, process.env.PRIVATE_KEY, (err, credential) => {
      if (err) return res.status(403).json({ error: 'Not authorized!'})
      req.user = credential.user
      next()
  })
} */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;
