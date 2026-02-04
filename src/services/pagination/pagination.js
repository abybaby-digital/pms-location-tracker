import { Op, Sequelize } from "sequelize";

export const pagination = async (
  searchParams,
  model,
  includeArray = null,
  cutomWhere = null,
  customAttributes = null,
) => {
  const page = searchParams.page ? searchParams.page : "";
  const limit = searchParams.limit ? searchParams.limit : "";
  const sortBy = searchParams.sortBy ? searchParams.sortBy : "";
  const sortOrder = searchParams.sortOrder ? searchParams.sortOrder : "";
  const sortOrderObj = searchParams.sortOrderObj ? searchParams.sortOrderObj : null;
  const filterDt = searchParams.filterDt ? searchParams.filterDt : "";
  const distinct = searchParams.distinct ? searchParams.distinct : false;
  const raw = searchParams.raw ? searchParams.raw : false;
  let limitQuery = {};
  let whereQuery = {};
  let orderQuery = {};
  let _newInclude = false;
  let _cutomWhere = {};

  // Sorting logic
  orderQuery["order"] = [[`${"id"}`, `${"DESC"}`]];
  if (page && limit) {
    limitQuery["offset"] = (parseInt(page) - 1) * parseInt(limit);
    limitQuery["limit"] = parseInt(limit);
  }

  if (sortOrderObj) {
    orderQuery["order"] = [sortOrderObj];
  }

  if (sortBy && sortOrder && sortOrderObj == null) {
    orderQuery["order"] = [[`${sortBy}`, `${sortOrder}`]];
  }

  if (!sortBy && sortOrder && sortOrderObj == null) {
    orderQuery["order"] = [[`${"id"}`, `${sortOrder}`]];
  }

  // 🛠️ Filter by created_at with qualified table alias
  if (filterDt) {
    const dtArr = filterDt.split(" ");
    const btnQuery =
      dtArr.length > 1
        ? {
            [Op.and]: [
              Sequelize.where(Sequelize.cast(Sequelize.col("user.created_at"), "DATE"), "BETWEEN", [
                dtArr[0],
                dtArr[1],
              ]),
            ],
          }
        : {
            [Op.and]: [
              Sequelize.where(
                Sequelize.cast(Sequelize.col("user.created_at"), "DATE"),
                "=",
                dtArr[0],
              ),
            ],
          };
    whereQuery = Object.assign(btnQuery);
  }

  _cutomWhere = cutomWhere ?? {};
  _newInclude = includeArray?.length > 0 ? includeArray : false;

  return await model.findAndCountAll({
    attributes: customAttributes,
    offset: limitQuery["offset"] ?? null,
    limit: limitQuery["limit"] ?? null,
    where: { ...whereQuery, ..._cutomWhere },
    include: _newInclude,
    distinct: distinct || _newInclude ? true : false,
    order: Object.keys(orderQuery).length > 0 ? orderQuery.order : [],
    raw: !!raw,
  });
};
