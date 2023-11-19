// Buffer Line
import HttpResponse from "../utils/Http/HttpResponse";
import { ObjectAny, TodoData } from "../utils/types";

class TodoValidation extends HttpResponse {
  protected dataObjectKeys = [
    {
      keyName: "todoInfo",
      nullable: false,
    },
    {
      keyName: "todoPerson",
      nullable: false,
    },
  ];
  protected objectKeys = this.dataObjectKeys.map((key) => key.keyName);

  constructor() {
    super();
  }

  /* should not throw error, should use HttpResponse immediately */
  protected validateSubmittedData(object: ObjectAny) {
    const extraObjectKeys = Object.keys(object).filter(
      (key) => this.objectKeys.indexOf(key) === -1
    );
    if (extraObjectKeys.length > 0) {
      throw new Error(
        `Keys ${extraObjectKeys.join(", ")} are not valid keys of todo`
      );
    }

    let objectCopy = {
      todoInfo: object.todoInfo,
      todoPerson: object.todoPerson,
    };

    for (let i = 0; i < this.objectKeys.length; i++) {
      const currentKey = this.objectKeys[i];
      if (
        objectCopy[currentKey as keyof TodoData] &&
        typeof objectCopy[currentKey as keyof TodoData] !== "string"
      )
        throw new Error(`Invalid ${currentKey} submitted`);
    }
    return objectCopy;
  }
}

export default TodoValidation;
