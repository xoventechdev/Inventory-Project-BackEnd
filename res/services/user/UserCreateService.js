import bcrypt from "bcrypt";
import { validatePassword } from "../../utility/Validator.js";

export const UserCreateService = async (req, model) => {
  try {
    let data = req.body;
    let isExits = await model.find({ email: data.email });
    if (isExits.length > 0) {
      return {
        status: "warning",
        response: `${data.email} Email already exists`,
      };
    }

    if (!validatePassword(data.password)) {
      return {
        status: "warning",
        response:
          "Password does not meet requirements. Please ensure your password is between 8 and 18 characters long, contains at least one uppercase letter, one lowercase letter, and one special symbol.",
      };
    }

    data.password = await bcrypt.hash(data.password, 10);
    await model.create(data);
    return { status: "success", response: "User created successfully" };
  } catch (error) {
    return { status: "error", response: error.message };
  }
};
