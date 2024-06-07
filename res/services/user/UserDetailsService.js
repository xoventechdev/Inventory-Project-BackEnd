export const UserDetailsService = async (req, model) => {
  try {
    let user = await model.aggregate([
      { $match: { email: req.email } },
      {
        $project: {
          _id: 0,
          createdAt: 0,
          updatedAt: 0,
          password: 0,
        },
      },
    ]);
    if (user.length === 0) {
      return { status: "warning", response: "User not found" };
    }
    return { status: "success", response: user[0] };
  } catch (error) {
    return { status: "error", response: error.massage };
  }
};
