export const UserUpdateService = async (req, model) => {
  try {
    await model.updateOne({ email: req.email }, req.body);
    return {
      status: "success",
      response: "User updated successfully",
    };
  } catch (error) {
    return {
      status: "error",
      response: error.message,
    };
  }
};
