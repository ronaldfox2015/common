import * as fs from "fs";
import * as path from "path";
import process from "process";

function toFileName(name: string) {
  return name.toLowerCase().replace(/[\s_-]+/g, ".");
}

function toClassName(name: string) {
  return name
    .split(/[\s._-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

function writeFile(filePath: string, content: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function createModule(moduleNameRaw: string) {
  const moduleNameFile = toFileName(moduleNameRaw);
  const moduleClassName = toClassName(moduleNameRaw);

  const baseDir = `./${moduleNameFile}`;

  // Rutas archivos
  const entityFile = `${baseDir}/domain/entities/${moduleNameFile}.ts`;
  const repositoryInterfaceFile = `${baseDir}/domain/repositories/${moduleNameFile}.repository.ts`;
  const serviceFile = `${baseDir}/application/${moduleNameFile}.service.ts`;
  const mysqlRepoFile = `${baseDir}/infrastructure/persistence/${moduleNameFile}.mysql.repository.ts`;
  const mysqlConnFile = `${baseDir}/infrastructure/persistence/mysql-connection.ts`;
  const awsClientFile = `${baseDir}/infrastructure/cloud-services/aws-client.ts`;
  const apiClientFile = `${baseDir}/infrastructure/api-clients/${moduleNameFile}.api-client.ts`;
  const indexFile = `${baseDir}/index.ts`;

  // Contenido archivos

  const entityContent = `export class ${moduleClassName} {
  constructor(
    public id: number,
    public nombre: string
  ) {}
}
`;

  const repositoryInterfaceContent = `import { ${moduleClassName} } from '../entities/${moduleNameFile}';

export interface ${moduleClassName}Repository {
  obtenerPorId(id: number): Promise<${moduleClassName} | null>;
  guardar(entidad: ${moduleClassName}): Promise<void>;
}
`;

  const serviceContent = `import { ${moduleClassName}Repository } from '../domain/repositories/${moduleNameFile}.repository';
import { ${moduleClassName} } from '../domain/entities/${moduleNameFile}';

export class ${moduleClassName}Service {
  constructor(private repositorio: ${moduleClassName}Repository) {}

  async crear${moduleClassName}(id: number, nombre: string): Promise<void> {
    const nuevo = new ${moduleClassName}(id, nombre);
    await this.repositorio.guardar(nuevo);
  }

  async obtener${moduleClassName}(id: number): Promise<${moduleClassName} | null> {
    return await this.repositorio.obtenerPorId(id);
  }
}
`;

  const mysqlConnContent = `import mysql from 'mysql2/promise';

class MySQLConnection {
  private static instance: mysql.Pool;

  private constructor() {}

  static getInstance(config?: mysql.PoolOptions): mysql.Pool {
    if (!MySQLConnection.instance) {
      if (!config) {
        throw new Error('Se requiere configuración para inicializar la conexión MySQL');
      }
      MySQLConnection.instance = mysql.createPool(config);
    }
    return MySQLConnection.instance;
  }
}

export default MySQLConnection;
`;

  const mysqlRepoContent = `import MySQLConnection from '../persistence/mysql-connection';
import { ${moduleClassName}Repository } from '../../domain/repositories/${moduleNameFile}.repository';
import { ${moduleClassName} } from '../../domain/entities/${moduleNameFile}';

export class ${moduleClassName}MySQLRepository implements ${moduleClassName}Repository {
  private pool = MySQLConnection.getInstance();

  async obtenerPorId(id: number): Promise<${moduleClassName} | null> {
    const [rows] = await this.pool.execute('SELECT id, nombre FROM ${moduleNameFile.replace(
      /\./g,
      "_"
    )} WHERE id = ?', [id]);
    const result = (rows as any[])[0];
    if (!result) return null;
    return new ${moduleClassName}(result.id, result.nombre);
  }

  async guardar(entidad: ${moduleClassName}): Promise<void> {
    await this.pool.execute('INSERT INTO ${moduleNameFile.replace(
      /\./g,
      "_"
    )} (id, nombre) VALUES (?, ?)', [entidad.id, entidad.nombre]);
  }
}
`;

  const awsClientContent = `import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

class AWSClient {
  private static dynamoDBClient: DynamoDBClient;

  static getDynamoDBClient() {
    if (!AWSClient.dynamoDBClient) {
      AWSClient.dynamoDBClient = new DynamoDBClient({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        },
      });
    }
    return AWSClient.dynamoDBClient;
  }

  // Puedes agregar más clientes AWS aquí
}

export default AWSClient;
`;

  const apiClientContent = `import axios from 'axios';
import { ${moduleClassName} } from '../../domain/entities/${moduleNameFile}';

export class ${moduleClassName}ApiClient {
  constructor(private baseUrl: string) {}

  async obtener${moduleClassName}PorId(id: number): Promise<${moduleClassName} | null> {
    try {
      const response = await axios.get(\`\${this.baseUrl}/${moduleNameFile.replace(
        /\./g,
        "-"
      )}/\${id}\`);
      const data = response.data;
      return new ${moduleClassName}(data.id, data.nombre);
    } catch (error) {
      console.error('Error al obtener ${moduleClassName} desde la API:', error);
      return null;
    }
  }
}
`;

  const indexContent = `// Punto de entrada del módulo ${moduleClassName}
`;

  // Crear archivos
  writeFile(entityFile, entityContent);
  writeFile(repositoryInterfaceFile, repositoryInterfaceContent);
  writeFile(serviceFile, serviceContent);
  writeFile(mysqlConnFile, mysqlConnContent);
  writeFile(mysqlRepoFile, mysqlRepoContent);
  writeFile(awsClientFile, awsClientContent);
  writeFile(apiClientFile, apiClientContent);
  writeFile(indexFile, indexContent);

  console.log(`Módulo '${moduleNameRaw}' creado en carpeta '${baseDir}'`);
}

// --- Ejecutar desde argumentos ---
const nombreModulo = process.argv[2];
if (!nombreModulo) {
  console.error(
    "Por favor especifica el nombre del módulo. Ejemplo: node crear_modulo.js producto.servicio"
  );
  process.exit(1);
}
createModule(nombreModulo);
