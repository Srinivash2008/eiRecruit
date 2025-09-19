import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
//    console.log("Generated Hash:", hashedPassword); // 👈 log it here
  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const decodeToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export { getPassword, comparePassword, generateToken, decodeToken };
