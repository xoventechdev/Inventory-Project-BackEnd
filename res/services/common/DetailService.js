export const DetailService = async (req, model) => {
  try {
    const item = await model.findOne({
      userEmail: req.email,
      _id: req.params.id,
    });

    if (item) {
      return { status: "success", response: item };
    } else {
      return { status: "error", response: "Item not found" };
    }
  } catch (error) {
    return { status: "error", response: error.message };
  }
};
