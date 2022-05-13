"use strict";
// import {Entity, model, property} from '@loopback/repository';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArUser = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const ar_user_credentials_model_1 = require("./ar-user-credentials.model");
const restaurant_model_1 = require("./restaurant.model");
const product_category_model_1 = require("./product-category.model");
// import {Language} from './language.model';
let ArUser = class ArUser extends repository_1.Entity {
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
], ArUser.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], ArUser.prototype, "phone", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        index: {
            unique: true,
        },
    }),
    tslib_1.__metadata("design:type", String)
], ArUser.prototype, "email", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'string',
    }),
    tslib_1.__metadata("design:type", Array)
], ArUser.prototype, "phones", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string'
    }),
    tslib_1.__metadata("design:type", String)
], ArUser.prototype, "password", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], ArUser.prototype, "firstName", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], ArUser.prototype, "lastName", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], ArUser.prototype, "avatar", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'boolean',
    }),
    tslib_1.__metadata("design:type", Boolean)
], ArUser.prototype, "isActivated", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], ArUser.prototype, "activationCode", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], ArUser.prototype, "resetPasswordCode", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'string',
    }),
    tslib_1.__metadata("design:type", Array)
], ArUser.prototype, "roles", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], ArUser.prototype, "pushToken", void 0);
tslib_1.__decorate([
    repository_1.hasOne(() => ar_user_credentials_model_1.ArUserCredentials),
    tslib_1.__metadata("design:type", ar_user_credentials_model_1.ArUserCredentials)
], ArUser.prototype, "userCredentials", void 0);
tslib_1.__decorate([
    repository_1.hasOne(() => ar_user_credentials_model_1.ArUserCredentials),
    tslib_1.__metadata("design:type", ar_user_credentials_model_1.ArUserCredentials)
], ArUser.prototype, "arUserCredentials", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => restaurant_model_1.Restaurant),
    tslib_1.__metadata("design:type", Array)
], ArUser.prototype, "restaurants", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => product_category_model_1.ProductCategory),
    tslib_1.__metadata("design:type", Array)
], ArUser.prototype, "productCategories", void 0);
ArUser = tslib_1.__decorate([
    repository_1.model({ settings: { strict: true } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], ArUser);
exports.ArUser = ArUser;
//# sourceMappingURL=ar-user.model.js.map