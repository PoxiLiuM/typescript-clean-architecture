import { IRepository } from "./IRepository";

export interface IUseCasesGroup {
  [key: string]: IUseCase
}

export interface IUseCase {
  repository: IRepository;

  execute(opts?: object): Promise<object>;
}