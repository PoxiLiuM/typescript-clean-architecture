import { IRepository } from "./IRepository";

export interface IUseCasesGroup {
  [key: string]: IUseCase
}

export interface IUseCase {
  execute(opts?: object): Promise<object>;
}