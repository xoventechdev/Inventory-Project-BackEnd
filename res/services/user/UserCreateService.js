import bcrypt from "bcrypt";

export const UserCreateService = async (req, model) => {
  try {
    let data = req.body;
    let isExits = await model.find({ email: data.email });
    if (isExits.length > 0) {
      return {
        status: "error",
        response: "Email already exists",
      };
    }
    data.password = await bcrypt.hash(data.password, 10);
    await model.create(data);
    return { status: "success", response: "User created successfully" };
  } catch (error) {
    return { status: "error", response: error.massage };
  }
};
