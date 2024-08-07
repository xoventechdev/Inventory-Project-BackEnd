import mongoose from "mongoose";

export const UpdateParentChildServices = async (
  req,
  parentModel,
  childModel,
  joinProperty
) => {
  let { id } = req.params;
  const session = await mongoose.startSession();

  try {
    let parent = req.body.parent;
    let child = req.body.child;
    if (
      !parent ||
      Object.keys(parent).length === 0 ||
      !child ||
      Object.keys(child).length === 0
    ) {
      return {
        status: "error",
        response: "No data found.",
      };
    }

    await session.startTransaction();

    parent.userEmail = req.email;

    let parentUpdate = await parentModel.updateOne(
      { _id: id, userEmail: req.email },
      parent,
      { session }
    );

    if (parentUpdate.nModified === 0) {
      await session.abortTransaction();
      session.endSession();
      return {
        status: "error",
        response: "Parent document not found or update failed.",
      };
    }

    await childModel.deleteMany(
      { [joinProperty]: id, userEmail: req.email },
      { session }
    );

    child.forEach((element) => {
      element[joinProperty] = id;
      element.userEmail = req.email;
    });

    await childModel.insertMany(child, { session });

    await session.commitTransaction();
    session.endSession();
    return {
      status: "success",
      response: `Item updated successfully.`,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return { status: "error", response: error.message };
  }
};
