import { IController } from "./IController";

export interface IFactory<T> {
  create(): T
}

export interface IControllerFactory extends IFactory<IController> {
}