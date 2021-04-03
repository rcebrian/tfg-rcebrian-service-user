import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { User } from '../repository/mysql/mysql.repository';

export const findAll = (req: Request, res: Response) => {
  User.findAll().then((data) => {
    res.status(httpStatus.OK)
      .json({ data });
  }).catch((err) => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ err: err.message });
  });
};

export const create = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_IMPLEMENTED).send();
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
