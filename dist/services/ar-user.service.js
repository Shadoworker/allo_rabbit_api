"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArUserService = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const security_1 = require("@loopback/security");
const bcryptjs_1 = require("bcryptjs");
// UserRepository --> ArUserRepository
const repositories_1 = require("../repositories");
// User --> ArUser
let ArUserService = class ArUserService {
    constructor(
    // UserRepository --> ArUserRepository
    arUserRepository) {
        this.arUserRepository = arUserRepository;
    }
    // User --> ArUser
    async verifyCredentials(credentials) {
        const invalidCredentialsError = 'Invalid phone or password.';
        const foundUser = await this.arUserRepository.findOne({
            where: { phone: credentials.phone },
        });
        if (!foundUser) {
            throw new rest_1.HttpErrors.Unauthorized(invalidCredentialsError);
        }
        const credentialsFound = await this.arUserRepository.findCredentials(foundUser.id);
        if (!credentialsFound) {
            throw new rest_1.HttpErrors.Unauthorized(invalidCredentialsError);
        }
        const passwordMatched = await bcryptjs_1.compare(credentials.password, credentialsFound.password);
        // console.log(passwordMatched);
        if (!passwordMatched) {
            throw new rest_1.HttpErrors.Unauthorized(invalidCredentialsError);
        }
        return foundUser;
    }
    // User --> ArUser
    convertToUserProfile(user) {
        return {
            [security_1.securityId]: user.id.toString(),
            name: user.username,
            id: user.id,
            email: user.email,
        };
    }
};
ArUserService = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.ArUserRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ArUserRepository])
], ArUserService);
exports.ArUserService = ArUserService;
//# sourceMappingURL=ar-user.service.js.map