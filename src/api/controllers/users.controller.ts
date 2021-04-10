import httpStatus from 'http-status';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User, Login } from '../repository/mysql/mysql.repository';

/**
 * Create a new user with login credentials in database
 * @param req POST method with user form
 * @param res created user
 */
export const create = async (req: Request, res: Response) => {
  const user = req.body;

  User.create({
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    email: user.email,
    address: user.address,
    country: user.country,
    postalCode: user.postalCode,
    roleId: user.roleId,
    login: {
      passwordHash: await bcrypt.hash(user.password, 10),
    },
  }, {
    include: Login,
  }).then((data) => {
    res.status(httpStatus.CREATED).json({ data });
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
