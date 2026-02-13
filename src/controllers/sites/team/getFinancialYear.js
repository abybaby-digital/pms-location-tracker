import models from "../../../models/index.js";

const { pmsFinancialYear } = models;

export const getFinancialYear = async (req, res, next) => {
  try {
    const roleId = req.userDetails?.role_id;

    let rows = [];

    if (roleId === 9) {
      rows = await pmsFinancialYear.findAll({
        where: { status: "1" },
        order: [["id", "DESC"]],
        limit: 1,
      });
    } else {
      rows = await pmsFinancialYear.findAll({
        where: { status: "1" },
        order: [["id", "DESC"]],
      });
    }

    const response = rows.map((item) => item.toJSON());

    return res.ok({
      result: {
        status: 200,
        success: response.length ? 1 : 0,
        response,
        message: response.length ? "" : "No financial Year found.",
        token: "",
      },
    });
  } catch (error) {
    console.error("getFinancialYear error:", error);
    next(error);
  }
};
