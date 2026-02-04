import models from "../../models/index.js";
const { pmsUser, pmsState, pmsRolemanagment, pmsCompany, pmsBranch } = models;

export const getByEmail = async (email) => {
  if (!email) return null;

  return await pmsUser.findOne({
    where: {
      email,
      status: "1",
      role_id: 9,
    },
    include: [
      {
        model: pmsState,
        as: "state",
        attributes: ["state_name"],
      },
      {
        model: pmsRolemanagment,
        as: "role",
        attributes: ["role_name", "access_type_list", "access_type_add", "access_type_edit"],
      },
      {
        model: pmsCompany,
        as: "company",
        attributes: ["company_name"],
      },
      {
        model: pmsBranch,
        as: "branch",
        attributes: ["branch_name"],
      },
    ],
    raw: true,
    nest: true,
  });
};
