import JWT from "jsonwebtoken";

export const EncodeToken = (email) => {
  const JWT_SECRET = process.env.JWT_SECRET || "joyBangla24";
  return JWT.sign({ email }, JWT_SECRET, { expiresIn: "24h" });
};

export const DecodeToken = (token) => {
  return JWT.verify(token, process.env.JWT_SECRET);
};
