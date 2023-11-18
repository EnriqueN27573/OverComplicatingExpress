// Buffer Line
interface IHttpResponseData {
  getHttpStatus(): number;
  getErrorMessage(): string;
  getData(): any;
}

export default IHttpResponseData;
