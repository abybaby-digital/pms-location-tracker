import { Model } from "sequelize";
import { TABLES } from "../utils/constants.js";

export default (sequelize, DataTypes) => {
  class pmsStandDetails extends Model {
    static associate(models) {
      // One Location has one Stand Details
      this.belongsTo(models.pmsLocation, {
        foreignKey: "site_locations_id",
        targetKey: "id",
        as: "location",
      });

      // Optional: Brand association (if needed)
      // this.belongsTo(models.salesForceBrand, {
      //   foreignKey: "brand_id",
      //   as: "brand",
      // });
    }
  }

  pmsStandDetails.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },

      site_locations_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: TABLES.SITE_LOCATION_TABLE || "site_locations",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      number_of_drivers: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      number_of_fleets: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      number_of_vehicles: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      brand_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },

      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "pmsStandDetails",
      tableName: TABLES.STAND_DETAILS_TABLE || "stand_details",
      timestamps: false,
      underscored: true,
      engine: "InnoDB",
      indexes: [
        { fields: ["site_locations_id"] }, // fixed index field
      ],
    },
  );

  return pmsStandDetails;
};
