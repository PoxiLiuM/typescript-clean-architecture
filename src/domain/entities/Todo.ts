import { IEntity } from "../../infrastructure/interfaces";

export class Todo implements IEntity {
  _id?: number;
  title: string;
  content: string;

  constructor(todo: Todo) {
    const { _id, title, content } = todo;
    this._id = _id;
    this.title = title;
    this.content = content;

    if (title.length < 10)
      throw new Error('title too short...');
    else if (title.length >= 50)
      throw new Error('title too long');

    if (content.length < 10)
      throw new Error('content too short...');
    else if (content.length >= 1000)
      throw new Error('content too long');
  }
}