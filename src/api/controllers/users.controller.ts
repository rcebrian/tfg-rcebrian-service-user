import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { ValidationError } from 'sequelize';
import bcrypt from 'bcrypt';
import { User, Login } from '../repository/mysql/mysql.repository';

export const findAll = (req: Request, res: Response) => {
  User.findAll().then((data) => {
    res.status(httpStatus.OK)
      .json({ data });
  }).catch((err) => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ err: err.message });
  });
};

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
  }).catch((err: ValidationError) => {
    res.status(httpStatus.BAD_REQUEST).json({ errors: err.message.split('\n') });
  }).catch((err) => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: err });
  });
};

export const findById = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_IMPLEMENTED).send();
};

export const update = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_IMPLEMENTED).send();
};

export const remove = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_IMPLEMENTED).send();
};
