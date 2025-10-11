"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INFRASTRUCTURE = exports.CONFIGURATION_PROVIDER = void 0;
const config_service_1 = require("../domain/config-service");
const config_service_implement_1 = require("./services/config.service.implement");
exports.CONFIGURATION_PROVIDER = {
    provide: config_service_1.ConfigService,
    useClass: config_service_implement_1.ConfigServiceImplement,
};
exports.INFRASTRUCTURE = [exports.CONFIGURATION_PROVIDER];
