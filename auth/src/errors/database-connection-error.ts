export class DatabaseConnectionError extends Error {
  statusCode = 500;
  reason = 'Error connecting to database';
  constructor() {
    super();
    //Oly because we are extending a built in class

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ mesage: this.reason }];
  }
}
