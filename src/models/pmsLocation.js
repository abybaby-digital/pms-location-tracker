import { Model } from "sequelize";
import { TABLES } from "../utils/constants.js";

export default (sequelize, DataTypes) => {
  class pmsLocation extends Model {
    static associate(models) {
      // One Location has many User Check-ins
      this.hasMany(models.pmsUserCheckin, {
        foreignKey: "location_id",
        as: "checkins",
      });
      // pmsLocation model
      this.belongsTo(models.pmsLocationType, {
        foreignKey: "location_type_id",
        targetKey: "id",
        as: "location_type",
      });
      this.hasMany(models.pmsUser_activitiesLog, {
        foreignKey: "location_id",
        as: "logs",
      });
      this.hasOne(models.pmsStandDetails, {
        foreignKey: "site_locations_id",
        as: "stand_details",
      });
    }
  }

  pmsLocation.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },

      location_name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },

      location_type_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },

      latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false,
      },

      longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: false,
      },

      pincode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      number_of_people: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },

      contact_person_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      contact_person_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },

      start_time: {
        type: DataTypes.TIME,
        allowNull: true,
      },

      end_time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("0", "1"),
        allowNull: false,
        defaultValue: "1", // 1 = active
      },

      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },

      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      created_by: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "pmsLocation",
      tableName: TABLES.SITE_LOCATION_TABLE || "site_locations",
      timestamps: false,
      engine: "InnoDB",
      indexes: [{ fields: ["pincode"] }, { fields: ["latitude", "longitude"] }],
    },
  );
  return pmsLocation;
};
