// Buffer Line

class AuthService {
  constructor() {}

  verify(token: string) {
    return token === "valid";
  }
}

export default AuthService;
