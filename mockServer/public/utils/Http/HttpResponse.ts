// Buffer Line
import { Request, Response } from "express";
import HttpResponseObject from "./HttpResponseObject";

class HttpResponse {
  private respond = (res: Response, responseData: HttpResponseObject) => {
    res
      .status(responseData.getHttpStatus())
      .json(
        responseData.getData()
          ? { data: responseData.getData() }
          : { error: responseData.getErrorMessage() }
      );
    res.end();
  };

  private errorResponse = (
    res: Response,
    statusCode: number,
    errorMessage: string
  ) => {
    const responseData = new HttpResponseObject({
      httpStatus: statusCode,
      errorMessage,
    });
    this.respond(res, responseData);
  };

  protected httpResponse = (res: Response) => {
    return {
      ok: (data: any) => {
        const responseData = new HttpResponseObject(data);
        this.respond(res, responseData);
      },
      badRequest: (errorMessage: string) => {
        this.errorResponse(res, 400, errorMessage);
      },
      unauthorized: () => {
        this.errorResponse(res, 403, "Forbidden Access");
      },
      methodNotAllowed: (req: Request) => {
        this.errorResponse(
          res,
          405,
          `${req.method} ${req.url} is not a valid route`
        );
      },
      unsupportedMediaType: () => {
        this.errorResponse(res, 415, "Uploaded Media Type Not Supported");
      },
      exceptionError: (errorMessage: string) => {
        this.errorResponse(res, 500, errorMessage);
      },
    };
  };
}

export default HttpResponse;
