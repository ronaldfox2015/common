"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlRepositoryImpl = void 0;
class MysqlRepositoryImpl {
    model;
    constructor(sequelize, model) {
        // Registramos el modelo si no está cargado
        if (!sequelize.isDefined(model.name)) {
            sequelize.addModels([model]);
        }
        this.model = model;
    }
    async save(entity) {
        return this.model.create(entity);
    }
    async findById(id) {
        return this.model.findByPk(id);
    }
    async findAll() {
        return this.model.findAll();
    }
    async delete(id) {
        await this.model.destroy({ where: { id } });
    }
}
exports.MysqlRepositoryImpl = MysqlRepositoryImpl;
