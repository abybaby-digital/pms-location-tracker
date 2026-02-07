import Sequelize from "sequelize";
import { sequelize } from "../config/index.js";

// Import models
import * as pmsUser from "./pmsUser.js";
import * as pmsState from "./pmsState.js";
import * as pmsBranch from "./pmsBranch.js";
import * as pmsCompany from "./pmsCompany.js";
import * as pmsRolemanagment from "./pmsRolemanagment.js";
import * as pmsLeftmenu from "./pmsLeftmenu.js";
import * as pmsLocation from "./pmsLocation.js";
import * as pmsUserCheckin from "./pmsUserCheckin.js";
import * as pmsStandDetails from "./pmsStandDetails.js";
import * as pmsLocationType from "./pmsLocationType.js";
import * as pmsVehicle from "./pmsVehicle.js";
import * as pmsUser_activitiesLog from "./pmsUserActivityLogs.js";
import * as pmsUserLocationSessions from "./pmsUserLocationSessions.js";
import * as pmsFinancialYear from "./pmsFinancialYear.js";
import * as pmsProjectTeams from "./pmsProjectTeams.js";
import * as pmsProjectInvoice from "./pmsProjectInvoice.js";
import * as pmsProject from "./pmsProject.js";
import * as pmsFoPaymentAllotment from "./pmsAllocatedAmount.js";
import * as pmsFoEnquaries from "./pmsFoEnquaries.js";
import * as pmsClient from "./pmsClient.js";
import * as pmsProjectPaymentReceived from "./pmsProjectPaymentReceived.js";
import * as pmsVerticalHead from "./pmsVerticalHead.js";
import * as pmsDealership from "./pmsDealership.js";
import * as pmsFoPaymentRequisition from "./pmsFoPaymentRequisition.js";



// Initialize models
const db = {
  pmsUser: pmsUser.default(sequelize, Sequelize.DataTypes),
  pmsState: pmsState.default(sequelize, Sequelize.DataTypes),
  pmsBranch: pmsBranch.default(sequelize, Sequelize.DataTypes),
  pmsCompany: pmsCompany.default(sequelize, Sequelize.DataTypes),
  pmsRolemanagment: pmsRolemanagment.default(sequelize, Sequelize.DataTypes),
  pmsLeftmenu: pmsLeftmenu.default(sequelize, Sequelize.DataTypes),
  pmsLocation: pmsLocation.default(sequelize, Sequelize.DataTypes),
  pmsUserCheckin: pmsUserCheckin.default(sequelize, Sequelize.DataTypes),
  pmsStandDetails: pmsStandDetails.default(sequelize, Sequelize.DataTypes),
  pmsLocationType: pmsLocationType.default(sequelize, Sequelize.DataTypes),
  pmsVehicle: pmsVehicle.default(sequelize, Sequelize.DataTypes),
  pmsUser_activitiesLog: pmsUser_activitiesLog.default(sequelize, Sequelize.DataTypes),
  pmsUserLocationSessions: pmsUserLocationSessions.default(sequelize, Sequelize.DataTypes),
  pmsFinancialYear: pmsFinancialYear.default(sequelize, Sequelize.DataTypes),
  pmsProjectTeams: pmsProjectTeams.default(sequelize, Sequelize.DataTypes),
  pmsProjectInvoice: pmsProjectInvoice.default(sequelize, Sequelize.DataTypes),
  pmsProject: pmsProject.default(sequelize, Sequelize.DataTypes),
  pmsFoPaymentAllotment: pmsFoPaymentAllotment.default(sequelize, Sequelize.DataTypes),
  pmsFoEnquaries: pmsFoEnquaries.default(sequelize, Sequelize.DataTypes),
  pmsClient: pmsClient.default(sequelize, Sequelize.DataTypes),
  pmsProjectPaymentReceived: pmsProjectPaymentReceived.default(sequelize, Sequelize.DataTypes),
  pmsVerticalHead: pmsVerticalHead.default(sequelize, Sequelize.DataTypes),
  pmsDealership: pmsDealership.default(sequelize, Sequelize.DataTypes),
  pmsFoPaymentRequisition: pmsFoPaymentRequisition.default(sequelize, Sequelize.DataTypes),
  
};

// Run associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
