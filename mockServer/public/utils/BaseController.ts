// Buffer Line
import { Request, Response } from "express";
import HttpResponse from "./Http/HttpResponse";

class BaseController extends HttpResponse {
  constructor() {
    super();
  }

  wrapMethod(fn: (req: Request) => Promise<any>) {
    const validResponse = (res: Response, data: any) => {
      this.httpResponse(res).ok({ data });
      return;
    };

    const errorRespond = (res: Response, errorMessage: string) => {
      this.httpResponse(res).exceptionError(errorMessage);
      return;
    };
    return async function (req: Request, res: Response) {
      try {
        let result = await fn(req);
        validResponse(res, result);
      } catch (error) {
        console.log({ error });
        errorRespond(res, String(error));
      }
    };
  }
}

export default BaseController;
