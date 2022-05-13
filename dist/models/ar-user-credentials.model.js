"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/authentication-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArUserCredentials = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let ArUserCredentials = class ArUserCredentials extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        id: true,
        generated: false,
        defaultFn: 'uuidv4',
    }),
    tslib_1.__metadata("design:type", String)
], ArUserCredentials.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        // required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ArUserCredentials.prototype, "phone", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ArUserCredentials.prototype, "password", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], ArUserCredentials.prototype, "arUserId", void 0);
ArUserCredentials = tslib_1.__decorate([
    repository_1.model({ settings: { strict: true } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], ArUserCredentials);
exports.ArUserCredentials = ArUserCredentials;
//# sourceMappingURL=ar-user-credentials.model.js.map