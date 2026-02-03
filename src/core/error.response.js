import {
	ReasonPhrases,
	StatusCodes,
} from 'http-status-codes';

export class ErrorResponse extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.status = statusCode;
    this.code = code;
  }
}
export class ConflictError extends ErrorResponse {
  constructor(message = ReasonPhrases.CONFLICT) {
    super(message, StatusCodes.CONFLICT);
  }
}

export class NotFoundError extends ErrorResponse {
  constructor(message = ReasonPhrases.NOT_FOUND) {
    super(message, StatusCodes.NOT_FOUND);
  }
}
export class BadRequestError extends ErrorResponse {
  constructor(message = ReasonPhrases.BAD_REQUEST) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}
export class UnauthorizedError extends ErrorResponse {
  constructor(message = ReasonPhrases.UNAUTHORIZED) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}