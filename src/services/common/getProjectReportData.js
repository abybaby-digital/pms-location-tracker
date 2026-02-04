import { Op, Sequelize } from "sequelize";
import models from "../../models/index.js";
const { pmsProject, pmsProjectInvoice } = models;

/**
 * Normalize response keys so missing fields return null
 */
const normalizeProjectRow = (row) => ({
  ...row,
  project_billing_status: null,
  project_payment_status: null,
});

export const getProjectReportData = async (userId, roleId, financialYear) => {
  const projectData = [];

  // ================= BASE WHERE =================
  const baseWhere = {
    financial_year: financialYear,
    [Op.and]: Sequelize.literal(`FIND_IN_SET(${userId}, fo_ids)`),
  };

  // ================= TOTAL PROJECT =================
  const totalProjectCount = await pmsProject.count({ where: baseWhere });

  const projectAmountPreGst = await pmsProject.sum("project_amount_pre_gst", {
    where: baseWhere,
  });

  const projectAmountWithGst = await pmsProject.sum("project_amount_with_gst", {
    where: baseWhere,
  });

  projectData.push({
    name: "Total Project",
    project_count: totalProjectCount,
    project_amount_pre_gst: Number(projectAmountPreGst || 0).toFixed(2),
    project_amount_with_gst: Number(projectAmountWithGst || 0).toFixed(2),
    project_status: null,
    project_billing_status: null,
    project_payment_status: null,
  });

  // ================= CLOSED PROJECT =================
  const closedWhere = { ...baseWhere, status: "2" };

  projectData.push({
    name: "Closed Project (Billed + Unbilled)",
    project_count: await pmsProject.count({ where: closedWhere }),
    project_amount_pre_gst:
      (await pmsProject.sum("project_amount_pre_gst", {
        where: closedWhere,
      })) || 0,
    project_amount_with_gst:
      (await pmsProject.sum("project_amount_with_gst", {
        where: closedWhere,
      })) || 0,
    project_status: 2,
    project_billing_status: null,
    project_payment_status: null,
  });

  // ================= RUNNING PROJECT =================
  const runningWhere = { ...baseWhere, status: "1" };

  projectData.push({
    name: "Running Project",
    project_count: await pmsProject.count({ where: runningWhere }),
    project_amount_pre_gst:
      (await pmsProject.sum("project_amount_pre_gst", {
        where: runningWhere,
      })) || 0,
    project_amount_with_gst:
      (await pmsProject.sum("project_amount_with_gst", {
        where: runningWhere,
      })) || 0,
    project_status: 1,
  });

  // ================= UNBILLED CLOSED PROJECT =================
  const unbilledProjects = await pmsProject.findAll({
    where: { ...baseWhere, status: "2" },
    include: [
      {
        model: pmsProjectInvoice,
        as: "projectInvoices",
        where: { invoice_billing_status: "0" },
        required: true,
      },
    ],
  });

  projectData.push({
    name: "Closed Project (Unbilled)",
    project_count: unbilledProjects.length,
    project_amount_pre_gst: unbilledProjects.reduce(
      (sum, p) =>
        sum + p.projectInvoices.reduce((s, i) => s + Number(i.invoice_amount_pre_gst || 0), 0),
      0,
    ),
    project_amount_with_gst: unbilledProjects.reduce(
      (sum, p) =>
        sum + p.projectInvoices.reduce((s, i) => s + Number(i.invoice_amount_with_gst || 0), 0),
      0,
    ),
    project_status: 2,
    project_billing_status: 0,
  });

  // ================= BILLED CLOSED PROJECT =================
  const billedProjects = await pmsProject.findAll({
    where: { ...baseWhere, status: "2" },
    include: [
      {
        model: pmsProjectInvoice,
        as: "projectInvoices",
        where: { invoice_billing_status: "1" },
        required: true,
      },
    ],
  });

  let billedPreGst = 0;
  let billedWithGst = 0;

  billedProjects.forEach((p) =>
    p.projectInvoices.forEach((i) => {
      billedPreGst += Number(i.invoice_amount_pre_gst || 0);
      billedWithGst += Number(i.invoice_amount_with_gst || 0);
    }),
  );

  projectData.push({
    name: "Closed Project (Billed)",
    project_count: billedProjects.length,
    project_amount_pre_gst: billedPreGst.toFixed(2),
    project_amount_with_gst: billedWithGst.toFixed(2),
    project_status: 2,
    project_billing_status: 1,
  });

  // ================= PAYMENT OUTSTANDING =================
  const outstandingInvoices = await pmsProjectInvoice.findAll({
    where: {
      financial_year: financialYear,
      invoice_billing_status: "1",
      invoice_payment_status: "0",
    },
    include: [{ model: pmsProject, as: "project", where: closedWhere }],
  });

  projectData.push({
    name: "Payment Outstanding Project",
    project_count: new Set(outstandingInvoices.map((i) => i.project_id)).size,
    project_amount_pre_gst: outstandingInvoices
      .reduce((s, i) => s + Number(i.invoice_amount_pre_gst || 0), 0)
      .toFixed(2),
    project_amount_with_gst: outstandingInvoices
      .reduce((s, i) => s + Number(i.invoice_amount_with_gst || 0), 0)
      .toFixed(2),
    project_status: 2,
    project_billing_status: 1,
    project_payment_status: 0,
  });

  // ================= PAYMENT RECEIVED =================
  const paidInvoices = await pmsProjectInvoice.findAll({
    where: {
      financial_year: financialYear,
      invoice_billing_status: "1",
      invoice_payment_status: "1",
    },
    include: [{ model: pmsProject, as: "project", where: closedWhere }],
  });

  projectData.push({
    name: "Payment Received Project",
    project_count: new Set(paidInvoices.map((i) => i.project_id)).size,
    project_amount_pre_gst: paidInvoices
      .reduce((s, i) => s + Number(i.invoice_amount_pre_gst || 0), 0)
      .toFixed(2),
    project_amount_with_gst: paidInvoices
      .reduce((s, i) => s + Number(i.invoice_amount_with_gst || 0), 0)
      .toFixed(2),
    project_status: 2,
    project_billing_status: 1,
    project_payment_status: 1,
  });

  // ================= PARTIAL PAYMENT =================
  const partialInvoices = await pmsProjectInvoice.findAll({
    where: {
      financial_year: financialYear,
      invoice_payment_status: "2",
      received_amount: { [Op.gt]: 0 },
    },
    include: [{ model: pmsProject, as: "project", where: closedWhere }],
  });

  projectData.push({
    name: "Partial Payment Received",
    project_count: new Set(partialInvoices.map((i) => i.project_id)).size,
    project_amount_with_gst: partialInvoices
      .reduce((s, i) => s + Number(i.received_amount || 0), 0)
      .toFixed(2),
    project_status: 2,
    project_billing_status: 1,
    project_payment_status: 0,
    invoice_payment_status: 2,
  });

  // ================= CANCELED PROJECT =================
  const cancelWhere = { ...baseWhere, status: "0" };

  projectData.push({
    name: "Canceled Project",
    project_count: await pmsProject.count({ where: cancelWhere }),
    project_amount_pre_gst:
      (await pmsProject.sum("project_amount_pre_gst", {
        where: cancelWhere,
      })) || 0,
    project_amount_with_gst:
      (await pmsProject.sum("project_amount_with_gst", {
        where: cancelWhere,
      })) || 0,
    project_status: 0,
  });

  // ✅ RETURN NORMALIZED RESPONSE
  return projectData.map(normalizeProjectRow);
};
