import { TokenService } from '@loopback/authentication';
import { SchemaObject } from '@loopback/rest';
import { UserProfile } from '@loopback/security';
import { ArUser, ArUserCredentials } from '../models';
import { ArUserRepository } from '../repositories';
import { ArUserService } from '../services/ar-user.service';
export declare const CredentialsRequestBody: {
    description: string;
    required: boolean;
    content: {
        'application/json': {
            schema: SchemaObject;
        };
    };
};
export declare class UserController {
    jwtService: TokenService;
    userService: ArUserService;
    user: UserProfile;
    protected userRepository: ArUserRepository;
    constructor(jwtService: TokenService, userService: ArUserService, user: UserProfile, userRepository: ArUserRepository);
    login(credentials: ArUserCredentials): Promise<object>;
    whoAmI(currentUserProfile: UserProfile): Promise<string>;
    signUp(newUserRequest: ArUser): Promise<ArUser>;
    updateById(id: string, aruser: ArUser): Promise<any>;
}
