import { type ConfigService } from '../../domain/config-service';
export declare class ConfigServiceImplement implements ConfigService {
    private readonly envConfig;
    constructor();
    get(key: string): string;
}
