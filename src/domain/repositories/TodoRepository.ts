import { IDataBase } from "../../infrastructure/interfaces";
import { Todo } from "../entities/Todo";
import { Repository } from "./Repository";

export class TodoRepository extends Repository<Todo> {
  constructor(database: IDataBase){
    super('todos', database);
  }
}