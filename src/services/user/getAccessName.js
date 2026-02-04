import models from "../../models/index.js";
const { pmsLeftmenu } = models;

export const getAccessName = async (accessIds) => {
  if (accessIds.length > 0) {
    const menus = await pmsLeftmenu.findAll({
      where: {
        id: accessIds,
        status: "1",
      },
      attributes: ["menu_name"],
    });

    const accessNames = menus.map((m) => m.menu_name);
    return accessNames;
  } else {
    return null;
  }
};
