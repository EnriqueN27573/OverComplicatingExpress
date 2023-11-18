// Buffer Line
import TodoController from "./TodoController";
import TodoService from "./TodoService";
import TodoRepository from "./TodoRepository";
import TodoForm from "./TodoForm";

const todoRepository = new TodoRepository();
const todoService = new TodoService(todoRepository);
const todoForm = new TodoForm();
const todoController = new TodoController(todoForm, todoService);

const todoRouter = todoController.router;

export default todoRouter;
