import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

export const DetailParentChildServices = async (
  req,
  model,
  joinStage1,
  joinStage2
) => {
  console.log(req.params.id);
  try {
    const data = await model.aggregate([
      { $match: { userEmail: req.email, _id: new ObjectId(req.params.id) } },
      joinStage1,
      { $unwind: "$items" },
    ]);

    return {
      status: "success",
      response: data,
    };
  } catch (error) {
    return { status: "error", response: error.message };
  }
};
