import mongoose from "mongoose";

export const CreateParentChildServices = async (
  req,
  parentModel,
  childModel,
  joinProperty
) => {
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
    let parentCreation = await parentModel.create([parent], {
      session,
    });

    await child.forEach((element) => {
      element[joinProperty] = parentCreation[0]._id;
      element.userEmail = req.email;
    });

    await childModel.insertMany(child, {
      session,
    });

    await session.commitTransaction();
    session.endSession();
    return {
      status: "success",
      response: `Item created successfully.`,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return { status: "error", response: error.message };
  }
};
