import { ConfigService } from '../domain/config-service';
import { ConfigServiceImplement } from './services/config.service.implement';
export declare const CONFIGURATION_PROVIDER: {
    provide: typeof ConfigService;
    useClass: typeof ConfigServiceImplement;
};
export declare const INFRASTRUCTURE: {
    provide: typeof ConfigService;
    useClass: typeof ConfigServiceImplement;
}[];
