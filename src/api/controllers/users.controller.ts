import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { APIError } from '@rcebrian/tfg-rcebrian-common';
import { User } from '../repository/mysql/mysql.repository';
import logger from '../../config/winston.config';

/**
 * Get all user from database
 * @param req GET request with id as path param
 * @param res OK
 * @param next request
 */
export const findAllUsers = (req: Request, res: Response, next: NextFunction) => {
  User.findAll()
    .then((data) => {
      res.status(httpStatus.OK).json({ data });
    }).catch((err) => {
      logger.error(err);
      next(err);
    });
};

/**
 * Get a user from database
 * @param req GET request with id as path param
 * @param res OK
 * @param next request
 */
export const findById = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  User.findOne({ where: { id: userId } })
    .then((data) => {
      if (data) {
        res.status(httpStatus.OK).json({ data });
      } else {
        throw new APIError({
          message: 'Not found',
          status: httpStatus.NOT_FOUND,
          stack: `Can't get user. User [${userId}] not exists`,
        });
      }
    }).catch((err) => {
      logger.error(err.stack);
      next(err);
    });
};

/**
 * Edit basic info of a user
 * @param req PUT method with new user info
 * @param res
 * @param next request
 */
export const update = (req: Request, res: Response, next: NextFunction) => {
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
    .then(() => {
      res.status(httpStatus.ACCEPTED).json();
    }).catch((err) => {
      logger.error(err);
      next(err);
    });
};

/**
 * Delete a user from database
 * @param req DELETE request with id as param
 * @param res NO_CONTENT
 */
export const remove = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  User.findOne(
    { where: { id: userId } },
  ).then((user) => {
    if (!user) {
      throw new APIError({
        message: 'Not found',
        status: httpStatus.NOT_FOUND,
        stack: `Can't delete user. User [${userId}] not exists`,
      });
    }
    User.destroy({ where: { id: userId } })
      .then((data) => {
        res.status(httpStatus.NO_CONTENT).json({ data });
      }).catch((err) => {
        logger.error(err.stack);
        next(err);
      });
  }).catch((err) => {
    logger.error(err.stack);
    next(err);
  });
};
