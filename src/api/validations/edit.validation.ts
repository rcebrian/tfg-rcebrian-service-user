import { body } from 'express-validator';

export const editUserInfoValidator = () => [
  body('firstName').if(body('firstName').exists())
    .matches(/^[A-Za-z ]+$/)
    .withMessage('First name must be valid'),
  body('lastName').if(body('lastName').exists())
    .matches(/^[A-Za-z ]+$/)
    .withMessage('First name must be valid'),
  body('phone').if(body('phone').exists())
    .isMobilePhone(['es-ES'])
    .withMessage('Mobile phone must be valid'),
  body('email').if(body('email').exists())
    .isEmail()
    .withMessage('Email must be valid'),
  body('address').if(body('address').exists())
    .matches(/^[A-Za-z0-9 ]+$/)
    .withMessage('Address must be valid'),
  body('country').if(body('country').exists())
    .matches(/^[A-Za-z ]+$/)
    .withMessage('Country must be valid'),
  body('postalCode').if(body('postalCode').exists())
    .isPostalCode('ES')
    .withMessage('Postal code must be valid'),
];
