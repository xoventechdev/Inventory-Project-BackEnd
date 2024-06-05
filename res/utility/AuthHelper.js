import JWT from "jsonwebtoken";

export const EncodeToken = (email, user_id) => {
  const JWT_SECRET = process.env.JWT_SECRET || "joyBangla";
  return JWT.sign({ email, user_id }, JWT_SECRET, { expiresIn: "24h" });
};

export const DecodeToken = (token) => {
  return JWT.verify(token, process.env.JWT_SECRET);
};
