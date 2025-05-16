import { statusCodes } from "./status-code.helper";

export class BadrequestException extends Error {
   constructor(message = "BadrequestException") {
      super(message);
      this.code = statusCodes.BAD_REQUEST;
   }
}
