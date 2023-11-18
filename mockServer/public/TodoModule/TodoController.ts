// Buffer Line
import { Request, Router } from "express";
import BaseController from "../utils/BaseController";
import TodoService from "./TodoService";
import TodoForm from "./TodoForm";
import { dummyInsertData } from "../utils/dummyData";

class TodoController extends BaseController {
  public router = Router();
  constructor(private todoForm: TodoForm, private todoService: TodoService) {
    super();
    //Test Route to Insert Data
    this.router.post("/test", this.wrapMethod(this.insertTestData));

    this.router.get("/", this.wrapMethod(this.getTodoList));
    this.router.post(
      "/",
      this.todoForm.validateTodoData,
      this.wrapMethod(this.addTodo)
    );
    this.router.put(
      "/",
      this.todoForm.validateTodoInfo,
      this.wrapMethod(this.updateTodo)
    );
    this.router.delete(
      "/:id",
      this.todoForm.validateTodoID,
      this.wrapMethod(this.deleteTodo)
    );
  }

  insertTestData = async (req: Request) => {
    return this.todoService.addTodo(dummyInsertData);
  };

  getTodoList = async (req: Request) => {
    const todoQuery = req?.query?.todoID;
    if (todoQuery) {
      const todoId: number | number[] = Array.isArray(todoQuery)
        ? (todoQuery as string[]).map((id) => parseInt(id))
        : parseInt(todoQuery as string);

      return await this.todoService.searchTodoList(todoId);
    } else {
      return await this.todoService.getTodoList();
    }
  };

  addTodo = async (req: Request) => {
    const newTodo = req.body.data.todoList;
    return { returningIDList: await this.todoService.addTodo(newTodo) };
  };

  updateTodo = async (req: Request) => {
    const updateTodoInfo = req.body.data.todoItem;
    const { id, ...todoInfoCopy } = updateTodoInfo;
    return await this.todoService.updateTodo(id, todoInfoCopy);
  };

  deleteTodo = async (req: Request) => {
    const todoID = parseInt(req.params.id);
    return await this.todoService.deleteTodo(todoID);
  };
}

export default TodoController;
