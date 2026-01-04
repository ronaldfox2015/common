# @bdd-backend/common

Módulo de librerías comunes para aplicaciones backend con arquitectura hexagonal.

## Instalación

```bash
npm install @bdd-backend/common
# o
pnpm add @bdd-backend/common
```

## Estructura del Proyecto

```
src/
├── application/          # Capa de aplicación
├── domain/              # Capa de dominio
└── infrastructure/      # Capa de infraestructura
```

## Uso de las Clases

### 🏗️ Application Layer

#### ApplicationException
Manejo de excepciones a nivel de aplicación.

```typescript
import { ApplicationException } from '@bdd-backend/common';

// Crear excepción con código por defecto (2000)
throw new ApplicationException('Error en la aplicación');

// Crear excepción con código personalizado
throw new ApplicationException('Error personalizado', 2001);
```

#### LoggerService
Servicio de logging con diferentes niveles.

```typescript
import { LoggerService } from '@bdd-backend/common';

const logger = new LoggerService();

// Log básico
logger.log('Mensaje informativo', {
  method: 'GET',
  originalUrl: '/api/users',
  clientIp: '192.168.1.1'
});

// Warning con estado personalizado
logger.warning('Advertencia', {
  status: 404,
  trace: ['stack trace']
});

// Error crítico
logger.critical('Error crítico', {
  status: 500,
  trace: ['error stack']
});
```

#### CachApplicationErrorsDecorator
Decorador para capturar errores en métodos de aplicación.

```typescript
import { CachApplicationErrorsDecorator } from '@bdd-backend/common';

class UserService {
  @CachApplicationErrorsDecorator('Usuario por defecto')
  async getUser(id: string) {
    // Si falla, retorna 'Usuario por defecto'
    return await this.userRepository.findById(id);
  }

  @CachApplicationErrorsDecorator(undefined)
  async createUser(userData: any) {
    // Si falla, lanza ApplicationException
    return await this.userRepository.create(userData);
  }
}
```

### 🎯 Domain Layer

#### DomainException
Excepciones específicas del dominio.

```typescript
import { DomainException } from '@bdd-backend/common';

// Excepción con código por defecto (1000)
throw new DomainException('Regla de negocio violada');

// Excepción con código personalizado
throw new DomainException('Usuario no válido', 1001);
```

#### ConfigService
Servicio abstracto para configuración.

```typescript
import { ConfigService } from '@bdd-backend/common';

class MyConfigService extends ConfigService {
  get(key: string): string {
    return process.env[key] || '';
  }
}

const config = new MyConfigService();
const dbUrl = config.get('DATABASE_URL');
```

#### Enums y Constantes

```typescript
import { 
  LogTypeEnum, 
  HttpStatus, 
  SequelizeInternalErrorNames,
  INFO, WARNING, CRITICAL 
} from '@bdd-backend/common';

// Usar enums
const logType = LogTypeEnum.INFO;
const status = HttpStatus.BAD_REQUEST;

// Usar constantes
console.log(INFO); // 'INFO'
console.log(WARNING); // 'WARNING'
```

#### Interfaces

```typescript
import { LogParams, LogData, LoggerServiceInterface } from '@bdd-backend/common';

// Implementar interfaz de logger
class CustomLogger implements LoggerServiceInterface {
  log(message: any, ...params: any[]): void {
    console.log(message, params);
  }
  
  warning(message: any, ...params: any[]): void {
    console.warn(message, params);
  }
  
  critical(message: any, ...params: any[]): void {
    console.error(message, params);
  }
  
  warn(message: any, ...params: any[]): void {
    console.warn(message, params);
  }
}

// Usar tipos para parámetros de log
const logParams: LogParams = {
  method: 'POST',
  clientIp: '127.0.0.1',
  originalUrl: '/api/users',
  status: 201,
  startTime: Date.now()
};
```

### 🏭 Infrastructure Layer

#### InfrastructureException y BaseException
Manejo de errores de infraestructura.

```typescript
import { 
  InfrastructureException, 
  BaseException,
  BadRequestInfrastructureException 
} from '@bdd-backend/common';

// Excepción de infraestructura
throw new InfrastructureException('Error de base de datos', 3001);

// Excepción de bad request
throw new BadRequestInfrastructureException('Datos inválidos', 400);

// Crear excepción personalizada
class CustomException extends BaseException {
  constructor(message: string, code?: number) {
    super(message, code);
  }
}
```

#### CatchInfrastructureErrors
Decorador para capturar errores de infraestructura.

```typescript
import { CatchInfrastructureErrors } from '@bdd-backend/common';

class DatabaseService {
  @CatchInfrastructureErrors('Error al conectar con la base de datos')
  async connect() {
    // Captura errores de Sequelize, Axios, etc.
    return await this.sequelize.authenticate();
  }

  @CatchInfrastructureErrors()
  async query(sql: string) {
    // Usa mensaje por defecto: 'Infrastructure error'
    return await this.sequelize.query(sql);
  }
}
```

#### MysqlRepositoryImpl
Implementación base para repositorios MySQL con Sequelize.

```typescript
import { MysqlRepositoryImpl } from '@bdd-backend/common';
import { Sequelize, Model } from 'sequelize-typescript';

// Definir modelo
class User extends Model {
  id!: number;
  name!: string;
  email!: string;
}

// Crear repositorio
const sequelize = new Sequelize(/* config */);
const userRepository = new MysqlRepositoryImpl(sequelize, User);

// Usar repositorio
const user = await userRepository.save({ name: 'Juan', email: 'juan@email.com' });
const foundUser = await userRepository.findById(1);
const allUsers = await userRepository.findAll();
await userRepository.delete(1);
```

#### ConfigServiceImplement
Implementación concreta del servicio de configuración.

```typescript
import { ConfigServiceImplement } from '@bdd-backend/common';

// Usar configuración por defecto (.env)
const config = new ConfigServiceImplement();

// Usar archivo personalizado
const config = new ConfigServiceImplement('.env.production');

// Obtener valores
const dbUrl = config.get('DATABASE_URL');
const port = config.get('PORT');
const apiKey = config.get('API_KEY');
```

#### RestServiceImpl
Cliente HTTP base para servicios REST.

```typescript
import { RestServiceImpl } from '@bdd-backend/common';

// Crear cliente
const apiClient = new RestServiceImpl('https://api.example.com');

// Con configuración personalizada
const apiClient = new RestServiceImpl('https://api.example.com', {
  timeout: 10000,
  headers: { 'Authorization': 'Bearer token' }
});

// Usar cliente
const users = await apiClient.get<User[]>('/users');
const user = await apiClient.get<User>('/users/1');
const newUser = await apiClient.post<User>('/users', userData);
const updatedUser = await apiClient.put<User>('/users/1', updateData);
await apiClient.delete('/users/1');
```

## Ejemplo Completo

```typescript
import {
  LoggerService,
  ConfigServiceImplement,
  MysqlRepositoryImpl,
  RestServiceImpl,
  CatchInfrastructureErrors,
  ApplicationException,
  HttpStatus
} from '@bdd-backend/common';

class UserService {
  private logger = new LoggerService();
  private config = new ConfigServiceImplement();
  private apiClient = new RestServiceImpl(this.config.get('API_URL'));

  @CatchInfrastructureErrors('Error al obtener usuario')
  async getUser(id: string) {
    try {
      const user = await this.apiClient.get(`/users/${id}`);
      
      this.logger.log('Usuario obtenido exitosamente', {
        method: 'GET',
        originalUrl: `/users/${id}`,
        status: HttpStatus.OK
      });
      
      return user;
    } catch (error) {
      this.logger.critical('Error al obtener usuario', {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        trace: [error.stack]
      });
      
      throw new ApplicationException('Usuario no encontrado', 2001);
    }
  }
}
```

## Scripts Disponibles

```bash
# Compilar el proyecto
npm run build

# Ejecutar tests
npm run test

# Tests con coverage
npm run test:coverage

# Tests en modo watch
npm run test:watch
```

## Licencia

ISC