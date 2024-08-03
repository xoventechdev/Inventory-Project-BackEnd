import mongoose from "mongoose";

export const DeleteParentChildService = async (
  req,
  parentModel,
  childModel,
  joinProperty
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let deleteId = req.params.id;
    let userEmail = req.email;

    await parentModel.deleteOne(
      { userEmail: userEmail, _id: deleteId },
      { session }
    );
    await childModel.deleteMany(
      {
        userEmail: userEmail,
        [joinProperty]: deleteId,
      },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return {
      status: "success",
      response: `Item deleted successfully.`,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return { status: "error", response: error.message };
  }
};
