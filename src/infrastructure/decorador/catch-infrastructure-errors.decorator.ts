import { BadRequestInfrastructureException } from './../exceptions/bad-request.exception'
import { SequelizeInternalErrorNames } from './../../domain/enum/sequelize-errors.enum'
import { HttpStatus } from './../../domain/enum/http-status.enum'

export function CatchInfrastructureErrors(message: string = 'Infrastructure error') {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args)
      } catch (e: any) {
        let errorMessage = e.message || 'Unknown error'
        const code = HttpStatus.INTERNAL_SERVER_ERROR

        // Errores de conexión y base de datos
        const connectionErrors = [
          SequelizeInternalErrorNames.Connection,
          SequelizeInternalErrorNames.ConnectionRefused,
          SequelizeInternalErrorNames.HostNotFound,
          SequelizeInternalErrorNames.Timeout,
          SequelizeInternalErrorNames.ConnectionTimeoutError,
          SequelizeInternalErrorNames.AccessDenied,
          SequelizeInternalErrorNames.Database
        ]

        // Errores de servidor interno
        const internalServerErrors = [
          SequelizeInternalErrorNames.Error,
          SequelizeInternalErrorNames.ReferenceError,
          SequelizeInternalErrorNames.TypeError,
          SequelizeInternalErrorNames.HttpException
        ]

        // Errores de validación/cliente
        const clientErrors = [
          SequelizeInternalErrorNames.BadRequestException,
          SequelizeInternalErrorNames.BadRequestInfrastructureException,
          SequelizeInternalErrorNames.SequelizeUniqueConstraintError
        ]

        // Segmentar el mensaje por tipo de error
        if (connectionErrors.includes(e.name)) {
          errorMessage = `Connection error: ${errorMessage}`
        } else if (internalServerErrors.includes(e.name)) {
          errorMessage = `Internal server error: ${errorMessage}`
        } else if (clientErrors.includes(e.name)) {
          errorMessage = `Validation error: ${errorMessage}`
        } else if (e.name === SequelizeInternalErrorNames.NotFoundException) {
          errorMessage = `Resource not found: ${errorMessage}`
        } else if (e.name === SequelizeInternalErrorNames.AxiosError) {
          errorMessage = `External service error: ${errorMessage}`
        } else if (e.name && e.name.startsWith('Sequelize')) {
          errorMessage = `Database error: ${errorMessage}`
        } else if (e.code === 'ECONNREFUSED' || e.code === 'ETIMEDOUT' || e.code === 'ENOTFOUND') {
          errorMessage = `Network error: ${errorMessage}`
        }

        throw new BadRequestInfrastructureException(`${message}: ${errorMessage}`, code)
      }
    }

    return descriptor
  }
}
