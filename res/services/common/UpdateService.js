export const UpdateService = async (req, model) => {
  try {
    let { id } = req.params;
    req.body.email = req.email;
    await model.updateOne({ userEmail: req.email, _id: id }, req.body);
    return {
      status: "success",
      response: "This data updated successfully",
    };
  } catch (error) {
    return {
      status: "error",
      response: error.message,
    };
  }
};
