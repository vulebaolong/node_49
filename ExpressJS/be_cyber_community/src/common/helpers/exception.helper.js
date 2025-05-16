import { statusCodes } from "./status-code.helper";

export class BadrequestException extends Error {
   constructor() {
      this.code = statusCodes.BAD_REQUEST
   }
}