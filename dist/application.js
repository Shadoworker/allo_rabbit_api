"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListApplication = void 0;
const tslib_1 = require("tslib");
// Copyright IBM Corp. 2018,2020. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
// ---------- ADD IMPORTS -------------
const authentication_1 = require("@loopback/authentication");
const authentication_jwt_1 = require("@loopback/authentication-jwt");
const datasources_1 = require("./datasources");
// ------------------------------------
const ar_user_service_1 = require("./services/ar-user.service");
const boot_1 = require("@loopback/boot");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const rest_explorer_1 = require("@loopback/rest-explorer");
const multer_1 = tslib_1.__importDefault(require("multer"));
const service_proxy_1 = require("@loopback/service-proxy");
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const path_1 = tslib_1.__importDefault(require("path"));
const keys_1 = require("./keys");
const sequence_1 = require("./sequence");
const repositories_1 = require("./repositories");
class TodoListApplication extends boot_1.BootMixin(service_proxy_1.ServiceMixin(repository_1.RepositoryMixin(rest_1.RestApplication))) {
    constructor(options = {}) {
        super(options);
        this.configureFileUpload(options.fileStorageDirectory);
        // ------ ADD SNIPPET AT THE BOTTOM ---------
        // Mount authentication system
        this.component(authentication_1.AuthenticationComponent);
        // Mount jwt component
        this.component(authentication_jwt_1.JWTAuthenticationComponent);
        // Bind datasource
        this.dataSource(datasources_1.DbDataSource, authentication_jwt_1.UserServiceBindings.DATASOURCE_NAME);
        // ------------- END OF SNIPPET -------------
        // Bind user service
        this.bind(authentication_jwt_1.UserServiceBindings.USER_SERVICE).toClass(ar_user_service_1.ArUserService);
        // Bind user and credentials repository
        this.bind(authentication_jwt_1.UserServiceBindings.USER_REPOSITORY).toClass(repositories_1.ArUserRepository);
        // Set up the custom sequence
        this.sequence(sequence_1.MySequence);
        // Set up default home page
        this.static('/', path_1.default.join(__dirname, '../public'));
        // Customize @loopback/rest-explorer configuration here
        this.configure(rest_explorer_1.RestExplorerBindings.COMPONENT).to({
            path: '/explorer',
        });
        this.component(rest_explorer_1.RestExplorerComponent);
        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
        this.setupLogging();
    }
    setupLogging() {
        // Register `morgan` express middleware
        // Create a middleware factory wrapper for `morgan(format, options)`
        const morganFactory = (config) => {
            this.debug('Morgan configuration', config);
            return morgan_1.default('combined', config);
        };
        // Print out logs using `debug`
        const defaultConfig = {
            stream: {
                write: str => {
                    this._debug(str);
                },
            },
        };
        this.expressMiddleware(morganFactory, defaultConfig, {
            injectConfiguration: 'watch',
            key: 'middleware.morgan',
        });
    }
    configureFileUpload(destination) {
        // Upload files to `dist/.sandbox` by default
        destination = destination !== null && destination !== void 0 ? destination : path_1.default.join(__dirname, '../files');
        this.bind(keys_1.STORAGE_DIRECTORY).to(destination);
        const multerOptions = {
            storage: multer_1.default.diskStorage({
                destination,
                // Use the original file name as is
                filename: (req, file, cb) => {
                    cb(null, file.originalname);
                },
            }),
        };
        // Configure the file upload service with multer options
        this.configure(keys_1.FILE_UPLOAD_SERVICE).to(multerOptions);
    }
}
exports.TodoListApplication = TodoListApplication;
//# sourceMappingURL=application.js.map