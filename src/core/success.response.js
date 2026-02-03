import { ReasonPhrases, StatusCodes } from "http-status-codes";

export class SuccessResponse {
  constructor({ message, statusCode = StatusCodes.OK, metadata = {} }) {
    this.message = message;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res) {
    return res.status(this.status).json(this);
  }
}
export class OK extends SuccessResponse {
  constructor(message = ReasonPhrases.OK) {
    super({ message });
  }
}

export class Created extends SuccessResponse {
  constructor(message = ReasonPhrases.CREATED) {
    super({ message, statusCode: StatusCodes.CREATED });
  }
}
