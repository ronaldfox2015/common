import { Sequelize, Model, ModelCtor } from 'sequelize-typescript';

export class MysqlRepositoryImpl<T extends Model> {
  protected readonly model: ModelCtor<T>;

  constructor(sequelize: Sequelize, model: ModelCtor<T>) {
    if (!sequelize.isDefined(model.name)) {
      sequelize.addModels([model]);
    }
    this.model = model;
  }

  async save(entity: Partial<T>): Promise<T> {
    return this.model.create(entity as any);
  }

  async findById(id: string | number): Promise<T | null> {
    return this.model.findByPk(id);
  }

  async findAll(): Promise<T[]> {
    return this.model.findAll();
  }

  async delete(id: string | number): Promise<void> {
    await this.model.destroy({ where: { id } as any });
  }
}
