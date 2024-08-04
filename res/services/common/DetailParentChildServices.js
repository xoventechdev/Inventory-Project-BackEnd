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
      { $match: { userEmail: req.email, _id: new ObjectId(req.params.id) } },
      {
        $lookup: {
          from: "purchases_items",
          localField: "_id",
          foreignField: "purchaseId",
          as: "items",
        },
      },
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.productId",
          foreignField: "_id",
          as: "items.product",
        },
      },
      { $unwind: "$items.product" },
      {
        $group: {
          _id: "$_id",
          userEmail: { $first: "$userEmail" },
          supplierId: { $first: "$supplierId" },
          vatTax: { $first: "$vatTax" },
          discount: { $first: "$discount" },
          otherCost: { $first: "$otherCost" },
          shippingCost: { $first: "$shippingCost" },
          grandCost: { $first: "$grandCost" },
          note: { $first: "$note" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          items: { $push: "$items" },
        },
      },
    ]);

    return {
      status: "success",
      response: data,
    };
  } catch (error) {
    return { status: "error", response: error.message };
  }
};