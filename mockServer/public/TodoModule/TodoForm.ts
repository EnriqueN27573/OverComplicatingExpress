// Buffer Line
import { Request, Response, NextFunction } from "express";
import TodoValidation from "./TodoValidation";

class TodoForm extends TodoValidation {
  constructor() {
    super();
  }

  validateTodoData = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const todoItemList = req?.body?.data?.todoList;

    if (!todoItemList) {
      this.httpResponse(res).badRequest("Missing Todo List");
    }

    if (Array.isArray(todoItemList)) {
      if (todoItemList.length === 0) {
        this.httpResponse(res).badRequest("Empty Todo List");
      }
      try {
        for (let todo of todoItemList) {
          this.validateSubmittedData(todo);
        }
      } catch (error) {
        console.log({ error });
        this.httpResponse(res).badRequest(String(error));
        return;
      }
    } else {
      this.httpResponse(res).badRequest("Invalid Todo List");
    }

    next();
  };

  validateTodoInfo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let valid: boolean = true;
    const todoInfo = req?.body?.data?.todoItem;
    if (!todoInfo) {
      this.httpResponse(res).badRequest("Missing Todo Item");
    }

    console.log({ todoInfo });

    if (!todoInfo.id || !Number.isInteger(parseInt(todoInfo.id))) {
      this.httpResponse(res).badRequest("Invalid Todo ID submitted");
    }

    const { id, ...todoInfoCopy } = todoInfo;

    try {
      this.validateSubmittedData(todoInfoCopy);
    } catch (error) {
      valid = false;
      this.httpResponse(res).badRequest(String(error));
    }
    if (valid) next();
  };

  validateTodoID = async (req: Request, res: Response, next: NextFunction) => {
    let valid: boolean = true;
    const todoID = req?.params?.id;

    if (!todoID || !Number.isInteger(parseInt(todoID))) {
      this.httpResponse(res).badRequest("No Todo ID to Delete");
    }

    if (valid) next();
  };
}

export default TodoForm;
