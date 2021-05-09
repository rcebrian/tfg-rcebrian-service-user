import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { User } from '../repository/mysql/mysql.repository';

/**
 * Get all user from database
 * @param req GET request with id as path param
 * @param res OK
 */
export const findAllUsers = (req: Request, res: Response, next: NextFunction) => {
  User.findAll()
    .then((data) => {
      res.status(httpStatus.OK).json({ data });
    }).catch((err) => {
      next(err);
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
