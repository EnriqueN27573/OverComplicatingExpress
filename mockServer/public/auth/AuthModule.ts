// Buffer Line
import AuthController from "./AuthController";
import AuthService from "./AuthService";

const authService = new AuthService();
const authValidator = new AuthController(authService);

export default authValidator;
