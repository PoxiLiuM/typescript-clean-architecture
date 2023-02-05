export interface IDataBase {
  find<T>(entityName: string, entity?: Partial<T>): Promise<T[]>
  findById<T>(entityName: string, id: number): Promise<T | null>
  findOne<T>(entityName: string, entity?: Partial<T>): Promise<T | null>
  create<T>(entityName: string, entity: T): Promise<T>
  update<T>(entityName: string, id: number, entity: Partial<T>): Promise<boolean>
  delete<T>(entityName: string, id: number): Promise<boolean>
}