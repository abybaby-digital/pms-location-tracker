import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import model from "../../../models/index.js";
const { user, userRole, role } = model;

/**
 * User can signup with details
 * @param req
 * @param res
 * @param next
 */
export const signup = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const fullName = reqBody.name;
    const firstName = fullName.substring(0, fullName.indexOf(" "))
      ? fullName.substring(0, fullName.indexOf(" "))
      : fullName.substring(fullName.indexOf(" ") + 1);
    const lastName = !fullName.substring(0, fullName.indexOf(" "))
      ? ""
      : fullName.substring(fullName.indexOf(" ") + 1);
    // check duplicate user exists by given email
    const isExists = await userService.getByEmail(reqBody.email);
    if (isExists) throw StatusError.badRequest(res.__("This email is already registered"));

    // prepare data for insertion
    const data = {
      uuid: uuidv4(),
      username: reqBody.email,
      email: reqBody.email,
      first_name: firstName,
      last_name: lastName,
      password: await bcrypt.hash(reqBody.password, envs.passwordSalt),
      created_at: await customDateTimeHelper.getCurrentDateTime(),
    };
    // user role insertion
    const result = await user.create(data);
    if (result.id) {
      const updateData = {
        created_by: result.id,
        updated_by: result.id,
        updated_at: await customDateTimeHelper.getCurrentDateTime(),
      };
      await user.update(updateData, {
        where: {
          id: result.id,
        },
      });
      const getRole = await role.findOne({
        where: { role_name: "guests", defaults: 0, guests: 1 },
      });
      const roleId = getRole ? getRole.id : "";
      if (roleId) {
        const roleData = {
          user_id: result.id,
          role_id: roleId, // Default role is 'guests'
          created_by: result.id,
          created_at: await customDateTimeHelper.getCurrentDateTime(),
        };
        await userRole.create(roleData);
      }
      res.ok({
        message: res.__("Registration successfully"),
      });
    } else {
      throw StatusError.badRequest(res.__("serverError"));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
