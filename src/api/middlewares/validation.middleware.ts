import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

/**
 * Validate if the body params are valid
 * @returns array of validations
 */
export const registerFormValidator = () => [
  body('firstName')
    .notEmpty().withMessage('First name is required')
    .matches(/^[A-Za-z ]+$/)
    .withMessage('First name must be valid'),
  body('lastName')
    .notEmpty().withMessage('Last name is required')
    .matches(/^[A-Za-z ]+$/)
    .withMessage('First name must be valid'),
  body('phone')
    .notEmpty().withMessage('Mobile phone is required')
    .isMobilePhone(['es-ES'])
    .withMessage('Mobile phone must be valid'),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid'),
  body('address')
    .notEmpty().withMessage('Address is required')
    .matches(/^[A-Za-z0-9 ]+$/)
    .withMessage('Address must be valid'),
  body('country')
    .notEmpty().withMessage('Country is required')
    .matches(/^[A-Za-z ]+$/)
    .withMessage('Country must be valid'),
  body('postalCode')
    .notEmpty().withMessage('Postal code is required')
    .isPostalCode('ES')
    .withMessage('Postal code must be valid'),
  body('roleId')
    .notEmpty().withMessage('Role is required')
    .isNumeric()
    .withMessage('Role id must be valid'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, 'i')
    .withMessage('Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long'),
];

export const editUserInfoValidator = () => [
  body('firstName')
    .matches(/^[A-Za-z ]+$/)
    .withMessage('First name must be valid'),
  body('lastName')
    .matches(/^[A-Za-z ]+$/)
    .withMessage('First name must be valid'),
  body('phone')
    .isMobilePhone(['es-ES'])
    .withMessage('Mobile phone must be valid'),
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('address')
    .matches(/^[A-Za-z0-9 ]+$/)
    .withMessage('Address must be valid'),
  body('country')
    .matches(/^[A-Za-z ]+$/)
    .withMessage('Country must be valid'),
  body('postalCode')
    .isPostalCode('ES')
    .withMessage('Postal code must be valid'),
];

/**
 * Validate the input in requests
 * @param req request with input form
 * @param res response
 * @param next next call
 * @returns
 */
export const validator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: any = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(httpStatus.BAD_REQUEST).json({
    errors: extractedErrors,
  });
};
