import AbstractError from './abstract-error';

export class UnexpectedError extends AbstractError {
  errorCode = 1001;
  statusCode = 500;
  errorMessage = 'Unexpected error';
}

export class UnauthorizedError extends AbstractError {
  errorCode = 2001;
  statusCode = 403;
  errorMessage = 'Operation not allowed';
}

/**
 *  AFTER ADDING A NEW ERROR CLASS VERIFY YOU PUT IT IN THE RIGHT PLACE.
 *
 *  ERROR CLASSES ARE SORTED BY `errorCode` PLEASE KEEP THAT ORDER AND
 *  VERIFY YOU AREN'T USING AN ERROR CODE THAT IS ALREADY BEING USED
 *  BY OTHER ERROR CLASS.
 *
 *  ERROR CODES CATEGORY:
 *
 *  (1001 - 1999) => Unknown Errors
 *  (2001 - 2999) => Authentication Errors
 *  (3001 - 3999) => Validation Errors
 *  (4001 - 4999) => State Errors
 */
