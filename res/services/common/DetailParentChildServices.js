import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

export const DetailParentChildServices = async (
  req,
  model,
  joinStage1,
  joinStage2
) => {
  try {
    const data = await model.aggregate([
      {
        $match: {
          userEmail: req.email,
          _id: new ObjectId(req.params.id),
        },
      },
      joinStage1,
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $addFields: {
          "items.productName": { $arrayElemAt: ["$productDetails.name", 0] },
        },
      },
      joinStage2,
    ]);

    return {
      status: "success",
      response: data,
    };
  } catch (error) {
    return { status: "error", response: error.message };
  }
};
