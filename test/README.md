# Test Suite Documentation

## Overview
This test suite provides comprehensive coverage for the Common library, testing all modules across the application, domain, and infrastructure layers.

## Test Structure
```
src/test/
├── application/
│   ├── exceptions/
│   │   └── application.exception.test.ts
│   ├── service/
│   │   └── logger.service.test.ts
│   └── decorador/
│       └── catch-application-errors.decorator.test.ts
├── domain/
│   ├── exceptions/
│   │   └── domain.exception.test.ts
│   ├── enum/
│   │   ├── log-type.enum.test.ts
│   │   ├── logger.const.util.test.ts
│   │   └── sequelize-errors.enum.test.ts
│   ├── model/
│   │   └── logger-service.test.ts
│   ├── config-service.test.ts
│   └── log-data.interface.test.ts
├── infrastructure/
│   ├── exceptions/
│   │   ├── base.exception.test.ts
│   │   ├── bad-request.exception.test.ts
│   │   └── infrastructure.exception.test.ts
│   ├── decorador/
│   │   └── catch-infrastructure-errors.decorator.test.ts
│   ├── repositories/
│   │   └── mysql.repository.impl.test.ts
│   └── services/
│       ├── config.service.implement.test.ts
│       └── rest.service.impl.test.ts
└── index.test.ts
```

## Running Tests

### Basic Commands
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm run test:watch

# Run tests with coverage report
pnpm run test:coverage

# Run tests with verbose output
pnpm run test:verbose


### Docker contrution
```bash
# Run tests in Docker container
docker container run --workdir /app --rm -it \         
  -v "${pwd}":/app \
  node:22.14.0-alpine3.20 \
  sh -c "apk update && apk upgrade && \
         apk add --no-cache git && \
         npm install -g npm@11.6.0 && \
         npm install -g pnpm && \
         pnpm add dotenv && \
         pnpm add dotenv-expand && \
         pnpm install && pnpm run build"
```

### Docker Commands
```bash
# Run tests in Docker container
docker container run --workdir /app --rm -it \
  -v "${PWD}":/app \
  node:22.14.0-alpine3.20 \
  sh -c "apk update && apk upgrade && \
         apk add --no-cache git && \
         npm install -g npm@11.6.0 && \
         npm install -g pnpm && \
         pnpm install && \
         pnpm test"
```

## Test Coverage
The test suite covers:

### Application Layer
- **ApplicationException**: Error handling and exception creation
- **LoggerService**: Logging functionality with different levels
- **CachApplicationErrorsDecorator**: Error catching and handling decorator

### Domain Layer
- **DomainException**: Domain-specific error handling
- **Enums**: Log types, HTTP status codes, and error names
- **Interfaces**: Type definitions and contracts
- **ConfigService**: Abstract configuration service

### Infrastructure Layer
- **BaseException**: Base exception class functionality
- **BadRequestInfrastructureException**: HTTP bad request handling
- **InfrastructureException**: Infrastructure-specific errors
- **CatchInfrastructureErrors**: Infrastructure error handling decorator
- **MysqlRepositoryImpl**: Database repository operations
- **ConfigServiceImplement**: Environment configuration implementation
- **RestServiceImpl**: HTTP client service implementation

## Test Features
- **Unit Tests**: Individual component testing
- **Mock Testing**: External dependencies mocking
- **Error Handling**: Exception and error scenario testing
- **Type Safety**: TypeScript interface and type testing
- **Integration**: Component interaction testing

## Configuration
- **Jest**: Test runner and framework
- **ts-jest**: TypeScript support for Jest
- **Coverage**: HTML and LCOV reports
- **Setup**: Global test configuration in `jest.setup.js`

## Best Practices
1. Each test file corresponds to a source file
2. Tests are organized by functionality
3. Mocks are used for external dependencies
4. Error scenarios are thoroughly tested
5. Type safety is validated where applicable
