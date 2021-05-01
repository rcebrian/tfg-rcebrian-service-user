import httpStatus from 'http-status';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import {
  User, Login,
} from '../repository/mysql/mysql.repository';

/**
 * Create a new user with login credentials in database
 * @param req POST method with user form
 * @param res created user
 */
export const create = async (req: Request, res: Response) => {
  const userForm = req.body;

  User.create({
    firstName: userForm.firstName,
    lastName: userForm.lastName,
    phone: userForm.phone,
    email: userForm.email,
    address: userForm.address,
    country: userForm.country,
    postalCode: userForm.postalCode,
    roleId: userForm.roleId,
    login: {
      passwordHash: await bcrypt.hash(userForm.password, 10),
    },
  }, {
    include: Login,
  }).then(() => {
    res.status(httpStatus.OK).json({});
  });
};

/**
 * Get a user from database
 * @param req GET request with id as path param
 * @param res OK
 */
export const findById = (req: Request, res: Response) => {
  const { userId } = req.params;

  User.findOne({ where: { id: userId } })
    .then((data) => res.status(httpStatus.OK).json({ data }));
};

/**
 * Edit basic info of a user
 * @param req PUT method with new user info
 * @param res
 */
export const update = (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = req.body;

  User.update({
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    email: user.email,
    address: user.address,
    country: user.country,
    postalCode: user.postalCode,
  }, { where: { id: userId } })
    .then(() => res.status(httpStatus.ACCEPTED).json());
};

/**
 * Delete a user from database
 * @param req DELETE request with id as param
 * @param res NO_CONTENT
 */
export const remove = (req: Request, res: Response) => {
  const { userId } = req.params;

  User.destroy({ where: { id: userId } })
    .then((data) => res.status(httpStatus.NO_CONTENT).json({ data }));
};
