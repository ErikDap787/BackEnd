import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

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

export const transporter = nodemailer.createTransport({
  service: "Gmx",
  auth: {
    user: "erikdap787@gmx.es",
    password: "13579ead1996",
  },
});
/*GMX_USER, GMX_PASSWORD*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;
