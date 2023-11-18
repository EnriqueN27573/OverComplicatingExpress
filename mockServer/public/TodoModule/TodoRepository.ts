// Buffer Line
import TodoValidation from "./TodoValidation";
import BaseRepository from "../utils/BaseRepository";
import { TodoData } from "../utils/types";

type Todo = TodoData & { id: number };

class TodoRepository extends TodoValidation implements BaseRepository {
  private data: Todo[] = [];

  constructor() {
    super();
  }

  findAll() {
    return this.data;
  }

  findAllById(id: number | number[]) {
    return this.data.filter((todo) =>
      Array.isArray(id)
        ? (id as number[]).indexOf(todo.id) !== -1
        : todo.id === id
    );
  }

  findAllByParam(paramObject: Partial<Todo>) {
    return this.data.filter((todo) => {
      const { id, todoInfo, todoPerson } = paramObject;
      return (
        todo.id === id ||
        todo.todoInfo === todoInfo ||
        todo.todoPerson === todoPerson
      );
    });
  }

  save(data: TodoData[]) {
    const dummyInsertList: TodoData[] = [];
    const returningId: number[] = [];
    for (let todo of data) {
      let newItem: TodoData = this.validateSubmittedData(todo);
      for (let i = 0; i < this.objectKeys.length; i++) {
        const itemInfo = newItem[this.objectKeys[i] as keyof TodoData];
        if (!itemInfo) {
          if (this.dataObjectKeys[i].nullable) {
            //@ts-ignore
            newItem[this.objectKeys[i]] = null;
          } else {
            throw new Error(`Missing ${this.dataObjectKeys[i]}`);
          }
        }
      }
      dummyInsertList.push(newItem);
    }

    const latestID = this.data.length;
    for (let i = 1; i <= dummyInsertList.length; i++) {
      const newID = latestID + i;
      returningId.push(newID);

      let newItem = { ...dummyInsertList[i - 1], id: newID };
      this.data.push(newItem);
    }
    return returningId;
  }

  updateById(id: number, data: any) {
    const newItem: Partial<TodoData> = this.validateSubmittedData(data);
    let fullItem: Partial<TodoData> = this.data[id - 1];

    if (!fullItem) {
      throw new Error("Non-existent Object");
    }

    for (let key in newItem) {
      if (newItem[key as keyof TodoData]) {
        fullItem[key as keyof TodoData] = newItem[key as keyof TodoData];
      }
    }

    this.data = [
      ...this.data.slice(0, id - 1),
      { ...this.data[id], ...fullItem },
      ...this.data.slice(id),
    ];
    return {};
  }

  deleteById(id: number | number[]) {
    console.log({ id });

    this.data = this.data.filter((todo) => {
      return Array.isArray(id)
        ? (id as number[]).indexOf(todo.id) === -1
        : todo.id != id;
    });

    console.log(this.data);

    return {};
  }
}

export default TodoRepository;

/* 
const todoRepository = new TodoRepository();

const idList = todoRepository.save([
  { todoInfo: "first Todo", todoPerson: "alpha" },
  { todoInfo: "second Todo", todoPerson: "beta" },
  { todoInfo: "third Todo", todoPerson: "gamma" },
]);

console.log({ idList });

const todoList = todoRepository.findAll();

console.log({ todoList });

const todoListById = todoRepository.findAllById(1);
const todoListById2 = todoRepository.findAllById(idList);

console.log({ todoListById });
console.log({ todoListById2 });

const todoListByParam = todoRepository.findAllByParam({
  todoInfo: "first Todo",
});
const todoListByParam2 = todoRepository.findAllByParam({ todoPerson: "alpha" });
const todoListByParam3 = todoRepository.findAllByParam({
  todoPerson: "gamma",
  todoInfo: "third Todo",
});

console.log({ todoListByParam });
console.log({ todoListByParam2 });
console.log({ todoListByParam3 });

// const updateTodo = todoRepository.updateById(4, { todoPerson: "charlie" });
const updateTodo2 = todoRepository.updateById(3, { todoPerson: "charlie" });

// console.log({ updateTodo });
console.log({ updateTodo2 });

const deleteById = todoRepository.deleteById(1);

console.log(todoRepository.findAll());
*/
