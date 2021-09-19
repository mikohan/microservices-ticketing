import { ValidationError } from 'express-validator';

export class RequestValidationError extends Error {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super();
    //Oly because we are extending a built in class

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors() {
    const formattedErrors = this.errors.map((error) => {
      return {
        message: error.msg,
        field: error.param,
      };
    });
    return formattedErrors;
  }
}
