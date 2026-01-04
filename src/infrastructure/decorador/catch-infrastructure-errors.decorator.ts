import { BadRequestInfrastructureException } from './../exceptions/bad-request.exception'
import { SequelizeInternalErrorNames } from './../../domain/enum/sequelize-errors.enum'
import { HttpStatus } from './../../domain/enum/http-status.enum'

export function CatchInfrastructureErrors(message: string = 'Infrastructure error') {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args)
      } catch (e: any) {
        const internalErrorNames = Object.values(SequelizeInternalErrorNames)
        let code = HttpStatus.BAD_REQUEST

        if (internalErrorNames.includes(e.name)) {
          code = HttpStatus.INTERNAL_SERVER_ERROR
        }
        throw new BadRequestInfrastructureException(`${message}: ${e.message}`, code)
      }
    }

    return descriptor
  }
}
