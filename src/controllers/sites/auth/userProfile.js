export const userProfile = async (req, res, next) => {
  try {
    const userDetails = req.userDetails;

    return res.ok({
      result: {
        status: 200,
        success: true,
        message: "User acount fetched successfully",
        response: {
          ...userDetails,
        },
      },
    });
  } catch (error) {
    console.error("Error in profile:", error);
    next(error);
  }
};
