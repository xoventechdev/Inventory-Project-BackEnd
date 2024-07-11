export const UpdateService = async (req, model) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return {
        status: "error",
        response: "No data found.",
      };
    }
    let { id } = req.params;
    req.body.email = req.email;
    const res = await model.updateOne(
      { userEmail: req.email, _id: id },
      req.body
    );

    if (res.modifiedCount === 0) {
      return { status: "error", response: "Item not found" };
    } else {
      return { status: "success", response: "Updated successfully" };
    }
  } catch (error) {
    return { status: "error", response: error.message };
  }
};
