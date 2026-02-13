import { paginationService } from "../../../services/index.js";
import models from "../../../models/index.js";
// import { envs } from "../../../config/envs.js";

const { pmsDealership, pmsUser } = models;

export const getDealershipList = async (req, res, next) => {
  try {
    const reqBody = req.body;

    const page = reqBody.page ? parseInt(reqBody.page) : null;
    const limit = reqBody.limit ? parseInt(reqBody.limit) : null;

    const include = [
      {
        model: pmsUser,
        as: "user_data",
        attributes: ["id", "name"],
        required: false,
      },
      {
        model: pmsUser,
        as: "user_data_update",
        attributes: ["id", "name"],
        required: false,
      },
    ];

    const condition = {
      status: reqBody.status ?? "1",
    };

    let rows = [];
    let totalRecords = 0;

    /** -----------------------------------------
     *  PAGINATION OPTIONAL
     * ----------------------------------------*/
    if (page && limit) {
      const searchParams = {
        page,
        limit,
        sortBy: "dealer_name",
        sortOrder: "ASC",
      };

      const result = await paginationService.pagination(
        searchParams,
        pmsDealership,
        include,
        condition,
      );

      totalRecords = result.count;
      rows = result.rows;
    } else {
      rows = await pmsDealership.findAll({
        where: condition,
        include,
        order: [["dealer_name", "ASC"]],
      });

      totalRecords = rows.length;
    }

    const response = rows.map((item) => {
      const row = item.toJSON();
      const { user_data, user_data_update, ...cleanData } = row;

      return {
        ...cleanData,
        created_by_name: user_data?.name || null,
        updated_by_name: user_data_update?.name || null,
      };
    });

    return res.ok({
      result: {
        status: 200,
        success: response.length ? 1 : 0,
        totalRecords,
        response,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
