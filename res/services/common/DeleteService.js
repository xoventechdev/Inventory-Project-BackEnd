export const DeleteService = async (req, model) => {
  try {
    let { id } = req.params;
    const res = await model.deleteOne({ userEmail: req.email, _id: id });

    if (res.deletedCount === 0) {
      return { status: "error", response: "Item not found" };
    } else {
      return { status: "success", response: "Deleted successfully" };
    }
  } catch (error) {
    return { status: "error", response: error.message };
  }
};
