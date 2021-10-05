import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';

const router = express.Router();

router.post(
  '/api/users/singnin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .notEmpty()
      .trim()
      .withMessage('You must supply a password'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
  }
);

export { router as signinRouter };
