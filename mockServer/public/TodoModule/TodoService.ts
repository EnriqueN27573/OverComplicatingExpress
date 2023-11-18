// Buffer Line
import { TodoData } from "../utils/types";
import TodoRepository from "./TodoRepository";

class TodoService {
  constructor(private todoRepository: TodoRepository) {}

  async getTodoList() {
    return this.todoRepository.findAll();
  }

  async searchTodoList(id: number | number[]) {
    return this.todoRepository.findAllById(id);
  }

  async addTodo(data: TodoData[]) {
    return this.todoRepository.save(data);
  }

  async updateTodo(todoID: number, partialData: Partial<TodoData>) {
    return this.todoRepository.updateById(todoID, partialData);
  }

  async deleteTodo(todoID: number) {
    return this.todoRepository.deleteById(todoID);
  }
}

export default TodoService;
