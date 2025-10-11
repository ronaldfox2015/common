"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestServiceImpl = void 0;
const axios_1 = __importDefault(require("axios"));
class RestServiceImpl {
    client;
    constructor(baseURL, config) {
        this.client = axios_1.default.create({
            baseURL,
            timeout: 5000,
            ...config,
        });
    }
    async get(url, params) {
        const response = await this.client.get(url, { params });
        return response.data;
    }
    async post(url, data) {
        const response = await this.client.post(url, data);
        return response.data;
    }
    async put(url, data) {
        const response = await this.client.put(url, data);
        return response.data;
    }
    async delete(url) {
        const response = await this.client.delete(url);
        return response.data;
    }
}
exports.RestServiceImpl = RestServiceImpl;
