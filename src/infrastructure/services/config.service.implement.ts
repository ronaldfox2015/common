import * as dotenv from 'dotenv'
import * as dotenvExpand from 'dotenv-expand'
import { type ConfigService } from '../../domain/config-service'

export class ConfigServiceImplement implements ConfigService {
  private readonly envConfig: Record<string, string>

  constructor(envPath = '.env') {
    const config = dotenvExpand.expand(dotenv.config({ path: envPath }))
    this.envConfig = config.parsed || {}
  }

  public get(key: string): string {
    return this.envConfig[key] || ''
  }
}
