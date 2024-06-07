export const StatusService = async (req, model) => {
  try {
    const item = await model.findOne({
      userEmail: req.email,
      _id: req.params.id,
    });
    if (item) {
      const newStatus = item.status === 0 ? 1 : 0;
      await model.updateOne(
        { userEmail: req.email, _id: req.params.id },
        { status: newStatus }
      );
      return { status: "success", response: `Status updated` };
    } else {
      return { status: "error", response: "Item not found" };
    }
  } catch (error) {
    return { status: "error", response: error.message };
  }
};
