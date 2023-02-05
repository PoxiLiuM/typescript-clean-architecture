import fs from "fs";
import { IDataBase } from "../../interfaces";

export class InMemoryAdapter implements IDataBase {
  private static data: any = {};
  private static counters: any = {};

  constructor(
    private readonly persist: boolean = true
  ) {
    if (this.persist) {
      this.initPersistance();
    }
  }

  private initPersistance(): void {
    try {
      const data = fs.readFileSync('./inMemoryDB.json', 'utf-8');
      const counters = fs.readFileSync('./inMemoryDB_counters.json', 'utf-8');
      InMemoryAdapter.data = JSON.parse(data);
      InMemoryAdapter.counters = JSON.parse(counters);
    } catch (e) {
      fs.writeFileSync('./inMemoryDB.json', '{}');
      fs.writeFileSync('./inMemoryDB_counters.json', '{}');
      InMemoryAdapter.data = {};
      InMemoryAdapter.counters = {};
    }
  }

  private persistData(): void {
    fs.writeFileSync('./inMemoryDB.json', JSON.stringify(InMemoryAdapter.data));
    fs.writeFileSync('./inMemoryDB_counters.json', JSON.stringify(InMemoryAdapter.counters));
  }

  private createEntityTableIfNeeded(entityName: string): void {
    if (!InMemoryAdapter.data[entityName]) {
      InMemoryAdapter.data[entityName] = [];
      InMemoryAdapter.counters[entityName] = 1;
    }
  }

  private cloneDeep<T>(entity: T): T | T[] {
    if (typeof entity === 'object')
      return JSON.parse(JSON.stringify(entity));
    return entity;
  }

  public async find<T>(entityName: string, entity: any): Promise<T[]> {
    this.createEntityTableIfNeeded(entityName);

    if (entity && typeof entity === "object" && Object.keys(entity).length > 0) {
      const entities = this.cloneDeep<T>(InMemoryAdapter.data[entityName]) as T[];
      return entities.filter((e: any) => {
        for (const key of Object.keys(entity as Record<string, any>)) {
          if (!e[key] || e[key] !== entity[key])
            return false;
        }
        return true;
      });
    }

    return this.cloneDeep<T>(InMemoryAdapter.data[entityName]) as T[];    
  }
  public async findById<T>(entityName: string, id: number): Promise<T | null> {
    id = Number(id);
    this.createEntityTableIfNeeded(entityName);

    return this.cloneDeep<T>(InMemoryAdapter.data[entityName].find((t: any) => t._id === id)) as T;
  }

  public async findOne<T>(entityName: string, entity: Partial<T>): Promise<T | null> {
    const result = await this.find<T>(entityName, entity) as T[];
    if (result && result.length > 0)
      return this.cloneDeep<T>(result[0]) as T;
    return null;
  }

  public async create<T>(entityName: string, entity: Omit<T, '_id'>): Promise<T> {
    this.createEntityTableIfNeeded(entityName);

    const t: T = {
      ...entity,
      _id: InMemoryAdapter.counters[entityName]
    } as T;

    InMemoryAdapter.data[entityName].push(t);

    InMemoryAdapter.counters[entityName] += 1;
    
    if (this.persist)
      this.persistData();

    return this.cloneDeep<T>(t) as T;
  }

  public async update<T>(entityName: string, id: number, entity: Partial<T>): Promise<boolean> {
    id = Number(id);
    this.createEntityTableIfNeeded(entityName);

    const index = InMemoryAdapter.data[entityName].findIndex((t: any) => t._id === id);

    if (index === -1)
      return false;

      InMemoryAdapter.data[entityName][index] = {
      ...InMemoryAdapter.data[entityName][index],
      ...entity,
      _id: id
    }

    if (this.persist)
      this.persistData();

    return true;
  }

  public async delete(entityName: string, id: number): Promise<boolean> {
    id = Number(id);
    this.createEntityTableIfNeeded(entityName);

    const prevLength: number = InMemoryAdapter.data[entityName].length;
    InMemoryAdapter.data[entityName] = InMemoryAdapter.data[entityName].filter((t: any) => Number(t._id) !== Number(id));

    if (this.persist)
      this.persistData();

    return prevLength !== InMemoryAdapter.data[entityName].length;
  }
}