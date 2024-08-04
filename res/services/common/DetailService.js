import mongoose from "mongoose";

export const DetailService = async (req, model) => {
  const ObjectId = mongoose.Types.ObjectId;
  try {
    const item = await model.aggregate([
      {
        $match: {
          userEmail: req.email,
          _id: new ObjectId(req.params.id),
        },
      },
    ]);
    if (item) {
      return { status: "success", response: item[0] };
    } else {
      return { status: "error", response: "Item not found" };
    }
  } catch (error) {
    return { status: "error", response: error.message };
  }
};
