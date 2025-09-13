import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@common/(.*)$': '<rootDir>/$1'     // Ojo: ya no hay carpeta src
  },
  moduleFileExtensions: ['ts', 'js'],
  roots: ['<rootDir>'],
};

export default config;
