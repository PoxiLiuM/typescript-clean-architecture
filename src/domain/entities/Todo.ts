import { IEntity } from "../../interfaces/IEntity";

export class Todo implements IEntity {
  _id?: string;
  title: string;
  content: string;

  constructor(todo: Todo) {
    this._id = todo?._id;
    this.title = todo.title;
    this.content = todo.content;
  }
}