// Buffer Line
import express, { NextFunction } from "express";
import authValidator from "./public/Auth/AuthModule";
import todoRouter from "./public/TodoModule/TodoModule";
import HttpResponse from "./public/utils/Http/HttpResponse";

const app = express();
app.use(express.json());
app.use("/", express.static("public"));

app.use("/todo", authValidator.validate, todoRouter);

app.use("/", (req, res) => {
  class ServerResponse extends HttpResponse {
    constructor() {
      super();
    }
    methodNotAllow() {
      this.httpResponse(res).methodNotAllowed(req);
    }
  }
  const responder = new ServerResponse();
  responder.methodNotAllow();
});

const PORT = 3600;
app.listen(PORT, () => {
  console.log(`Server Started At http://localhost:${PORT}`);
});
