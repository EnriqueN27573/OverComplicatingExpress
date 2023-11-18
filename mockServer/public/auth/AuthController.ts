// Buffer Line
import { Request, Response, NextFunction } from "express";
import HttpResponse from "../utils/Http/HttpResponse";
import AuthService from "./AuthService";

class AuthController extends HttpResponse {
  constructor(private authService: AuthService) {
    super();
  }

  validate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers?.authorization?.split(" ")[1];

    if (token) {
      const valid = this.authService.verify(token);
      if (valid) {
        next();
        return;
      }
    }
    this.httpResponse(res).unauthorized();
  };
}

export default AuthController;
