import { teamService } from "../../../services/index.js";

export const addFoExpenses = async (req, res) => {
  try {
    const { fo_payment_requisition_id, exp_reason, exp_amount } = req.body;
    const exp_attachment = req.file.filename;

    const fo_id = req.userDetails.userId;

    if (!req.file) {
      return res.ok({
        result: {
          status: 400,
          success: 1,
          response: null,
          message: "exp_attachment file is required",
          token: "",
        },
      });
    }

    const fo_payment_requisition = await teamService.getFoPaymentRequisition(
      fo_payment_requisition_id,
    );

    const result = await teamService.addFoExpenses(
      fo_payment_requisition,
      exp_reason,
      exp_amount,
      exp_attachment,
      fo_id,
    );

    return res.ok({
      result: {
        status: 200,
        success: 0,
        response: result,
        message: "FO expenses amount added successfully.",
        token: "",
      },
    });
  } catch (error) {
    console.log(error);
    return res.ok({
      result: {
        status: 500,
        success: 1,
        response: "",
        message: "Error occure during file upload",
        token: "",
      },
    });
  }
};
