import { ApplicationException } from './../exceptions/application.exception'
import { HttpStatus } from './../../domain/enum/http-status.enum'

export function CatchApplicationErrorsDecorator(defaultValue: any = '') {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args)
      } catch (e: any) {
        const errorStatus = e.status || e.code || HttpStatus.BAD_REQUEST
        const errorMessage = e.response || e.message || 'Application error'

        // Si el error es 500, convertirlo a 400
        if (errorStatus >= HttpStatus.INTERNAL_SERVER_ERROR) {
          throw new ApplicationException(errorMessage, HttpStatus.BAD_REQUEST)
        }

        // Si hay un valor por defecto y el error es 400, retornar el valor por defecto
        if (errorStatus >= HttpStatus.BAD_REQUEST && errorStatus < HttpStatus.INTERNAL_SERVER_ERROR && defaultValue !== undefined && defaultValue !== '') {
          return defaultValue
        }

        // Lanzar el error con el código original (400-499)
        throw new ApplicationException(errorMessage, errorStatus)
      }
    }

    return descriptor
  }
}
