import { Todo } from "../../domain/entities/Todo";
import { HttpInternalServerErrorResponse } from "../../infrastructure/helpers/HttpInternalServerErrorResponse";
import { HttpRequest } from "../../infrastructure/helpers/HttpRequest";
import { HttpSuccessResponse } from "../../infrastructure/helpers/HttpSuccessResponse";
import { IController } from "../../interfaces/IController";
import { IResponse } from "../../interfaces/IResponse";
import { IUseCasesGroup } from "../../interfaces/IUseCase";

export class TodoController implements IController {
  public readonly useCases: IUseCasesGroup;

  constructor(useCases: IUseCasesGroup) {
    this.useCases = useCases;
  }

  public async createTodo(httpRequest: HttpRequest): Promise<IResponse> {
    try {
      const { title, content } = httpRequest.body;
      const todo = new Todo({ title, content });
      return new HttpSuccessResponse(await this.useCases.createTodoUseCase.execute(todo));
    } catch (e) {
      return new HttpInternalServerErrorResponse(e);
    }
  }

  public async findAllTodos(httpRequest?: HttpRequest): Promise<IResponse> {
    try {
      return new HttpSuccessResponse(await this.useCases.findAllTodosUseCase.execute())
    } catch (e) {
      return new HttpInternalServerErrorResponse(e);
    }
  }
}