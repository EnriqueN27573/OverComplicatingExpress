// Buffer Line
import IHttpResponseData from "./IHttpResponseData";

type ResponseInfo = {
  httpStatus?: number;
  errorMessage?: string;
  data?: any;
};

class HttpResponseObject implements IHttpResponseData {
  private errorMessage: string | null = null;
  private data: any;
  private httpStatus: number = 200;

  constructor(responseInfo: ResponseInfo) {
    this.validateResponseInfo(responseInfo);
  }

  private validateResponseInfo(responseInfo: ResponseInfo) {
    const { httpStatus, errorMessage, data } = responseInfo;

    let errorMsg = "";
    switch (true) {
      case (httpStatus && httpStatus < 100) ||
        (httpStatus && httpStatus >= 600):
        errorMsg = "Invalid Status Code Provided";
        break;
      case !errorMessage && !data:
        errorMsg =
          "Response object should either provide an error message or valid data";
        break;
      case errorMessage && data:
        errorMsg =
          "Response object should not provide both error message and valid data";
        break;
      case (errorMessage && !httpStatus) ||
        (errorMessage && httpStatus && httpStatus < 300):
        errorMsg = "Errors should have a valid status code";
        break;
      case data && httpStatus && httpStatus >= 300:
        errorMsg = "Valid requests should have a status code of 2xx";
        break;
      default:
        this.errorMessage = errorMessage || "";
        this.data = data || null;
        this.httpStatus = httpStatus || 200;
    }
    if (errorMsg !== "") throw new Error(errorMsg);
  }

  getHttpStatus = () => {
    return this.httpStatus;
  };

  getData() {
    return this.data;
  }

  getErrorMessage() {
    return this.errorMessage || "";
  }
}

export default HttpResponseObject;
