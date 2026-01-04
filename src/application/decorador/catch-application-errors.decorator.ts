import { ApplicationException } from './../exceptions/application.exception'

export function CachApplicationErrorsDecorator(defaultValue: any) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value // Guardamos la implementación original del método

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args)
      } catch (e: any) {
        if (e.status == 500) {
          throw new ApplicationException(e.response, e.status);
        }
        if (defaultValue !== undefined) {
          return defaultValue
        }
        throw new ApplicationException(e.response, e.status);
      }
    }

    return descriptor
  }
}
