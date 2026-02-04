"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_repository_impl_1 = require("../../../src/infrastructure/repositories/mysql.repository.impl");
// Mock Sequelize and Model
jest.mock('sequelize-typescript');
describe('MysqlRepositoryImpl', () => {
    let mockSequelize;
    let mockModel;
    let repository;
    beforeEach(() => {
        mockSequelize = {
            isDefined: jest.fn(),
            addModels: jest.fn(),
            create: jest.fn(),
            destroy: jest.fn(),
            findAll: jest.fn(),
            findByPk: jest.fn(),
        };
        mockModel = {
            name: 'TestModel',
            create: jest.fn(),
            findByPk: jest.fn(),
            findAll: jest.fn(),
            destroy: jest.fn(),
        };
        mockSequelize.isDefined.mockReturnValue(false);
        repository = new mysql_repository_impl_1.MysqlRepositoryImpl(mockSequelize, mockModel);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('constructor', () => {
        it('should add model to sequelize if not already defined', () => {
            mockSequelize.isDefined.mockReturnValue(false);
            new mysql_repository_impl_1.MysqlRepositoryImpl(mockSequelize, mockModel);
            expect(mockSequelize.isDefined).toHaveBeenCalledWith('TestModel');
            expect(mockSequelize.addModels).toHaveBeenCalledWith([mockModel]);
        });
        it('should not add model to sequelize if already defined', () => {
            const freshMockSequelize = {
                isDefined: jest.fn().mockReturnValue(true),
                addModels: jest.fn(),
            };
            new mysql_repository_impl_1.MysqlRepositoryImpl(freshMockSequelize, mockModel);
            expect(freshMockSequelize.isDefined).toHaveBeenCalledWith('TestModel');
            expect(freshMockSequelize.addModels).not.toHaveBeenCalled();
        });
    });
    describe('save', () => {
        it('should create a new entity', async () => {
            const entityData = { name: "Test Entity", value: 123 };
            const createdEntity = { id: 1, ...entityData };
            mockModel.create.mockResolvedValue(createdEntity);
            const result = await repository.save(entityData);
            expect(mockModel.create).toHaveBeenCalledWith(entityData);
            expect(typeof result).toBe("object");
        });
        it('should handle save errors', async () => {
            const entityData = { name: 'Test Entity' };
            const error = new Error('Database error');
            mockModel.create.mockRejectedValue(error);
            await expect(repository.save(entityData)).rejects.toThrow('Database error');
        });
    });
    describe('findById', () => {
        it('should find entity by id', async () => {
            const entityId = 1;
            const foundEntity = { id: entityId, name: 'Found Entity' };
            mockModel.findByPk.mockResolvedValue(foundEntity);
            const result = await repository.findById(entityId);
            expect(mockModel.findByPk).toHaveBeenCalledWith(entityId);
            expect(result).toBe(foundEntity);
        });
        it('should return null when entity not found', async () => {
            const entityId = 999;
            mockModel.findByPk.mockResolvedValue(null);
            const result = await repository.findById(entityId);
            expect(mockModel.findByPk).toHaveBeenCalledWith(entityId);
            expect(result).toBeNull();
        });
        it('should work with string ids', async () => {
            const entityId = 'uuid-123';
            const foundEntity = { id: entityId, name: 'Found Entity' };
            mockModel.findByPk.mockResolvedValue(foundEntity);
            const result = await repository.findById(entityId);
            expect(mockModel.findByPk).toHaveBeenCalledWith(entityId);
            expect(result).toBe(foundEntity);
        });
    });
    describe('findAll', () => {
        it('should return all entities', async () => {
            const entities = [
                { id: 1, name: 'Entity 1' },
                { id: 2, name: 'Entity 2' }
            ];
            mockModel.findAll.mockResolvedValue(entities);
            const result = await repository.findAll();
            expect(mockModel.findAll).toHaveBeenCalled();
            expect(result).toBe(entities);
        });
        it('should return empty array when no entities found', async () => {
            mockModel.findAll.mockResolvedValue([]);
            const result = await repository.findAll();
            expect(mockModel.findAll).toHaveBeenCalled();
            expect(result).toEqual([]);
        });
    });
    describe('delete', () => {
        it('should delete entity by id', async () => {
            const entityId = 1;
            mockModel.destroy.mockResolvedValue(1);
            await repository.delete(entityId);
            expect(mockModel.destroy).toHaveBeenCalledWith({ where: { id: entityId } });
        });
        it('should work with string ids', async () => {
            const entityId = 'uuid-123';
            mockModel.destroy.mockResolvedValue(1);
            await repository.delete(entityId);
            expect(mockModel.destroy).toHaveBeenCalledWith({ where: { id: entityId } });
        });
        it('should handle delete errors', async () => {
            const entityId = 1;
            const error = new Error('Delete failed');
            mockModel.destroy.mockRejectedValue(error);
            await expect(repository.delete(entityId)).rejects.toThrow('Delete failed');
        });
    });
});
