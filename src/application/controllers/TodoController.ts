import { Todo } from "../../domain/entities";
import { HttpRequest, HttpSuccessResponse, HttpInternalServerErrorResponse } from "../../infrastructure/helpers";
import { IController, IResponse } from "../../infrastructure/interfaces";
import { Controller, Get, Post } from "../../infrastructure/kernel/decorators";
import { CreateTodoUseCase, FindAllTodosUseCase } from "../use-cases/todos";

@Controller('/todos')
export class TodoController implements IController {
  public readonly createTodoUseCase: CreateTodoUseCase;
  public readonly findAllTodosUseCase: FindAllTodosUseCase

  constructor(createTodoUseCase: CreateTodoUseCase,findAllTodosUseCase: FindAllTodosUseCase) {
    this.createTodoUseCase = createTodoUseCase;
    this.findAllTodosUseCase = findAllTodosUseCase;

    this.createTodo = this.createTodo.bind(this);
    this.findAllTodos = this.findAllTodos.bind(this);
  }

  @Post('/')
  public async createTodo(httpRequest: HttpRequest): Promise<IResponse> {
    try {
      const { title, content } = httpRequest.body;
      const todo = new Todo({ title, content });
      return new HttpSuccessResponse(await this.createTodoUseCase.execute(todo));
    } catch (e) {
      return new HttpInternalServerErrorResponse(e);
    }
  }

  @Get('/')
  public async findAllTodos(httpRequest?: HttpRequest): Promise<IResponse> {
    try {
      return new HttpSuccessResponse(await this.findAllTodosUseCase.execute())
    } catch (e) {
      return new HttpInternalServerErrorResponse(e);
    }
  }
}