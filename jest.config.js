"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@common/(.*)$': '<rootDir>/$1' // Ojo: ya no hay carpeta src
    },
    moduleFileExtensions: ['ts', 'js'],
    roots: ['<rootDir>'],
};
exports.default = config;
