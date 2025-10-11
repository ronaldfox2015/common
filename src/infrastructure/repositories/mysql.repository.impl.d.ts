import { Sequelize, Model, ModelCtor } from 'sequelize-typescript';
export declare class MysqlRepositoryImpl<T extends Model> {
    protected readonly model: ModelCtor<T>;
    constructor(sequelize: Sequelize, model: ModelCtor<T>);
    save(entity: Partial<T>): Promise<T>;
    findById(id: string | number): Promise<T | null>;
    findAll(): Promise<T[]>;
    delete(id: string | number): Promise<void>;
}
