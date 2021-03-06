import { UserService } from '@loopback/authentication';
import { UserProfile } from '@loopback/security';
import { ArUser, ArUserCredentials } from '../models';
import { ArUserCredentialsRepository, ArUserRepository } from '../repositories';
export declare type Credentials = {
    id: string;
    phone: string;
    password: string;
};
export declare class ArUserService implements UserService<ArUser, ArUserCredentials> {
    arUserRepository: ArUserRepository;
    arUserCredentialsRepository: ArUserCredentialsRepository;
    constructor(arUserRepository: ArUserRepository, arUserCredentialsRepository: ArUserCredentialsRepository);
    verifyCredentials(arusercredentials: ArUserCredentials): Promise<ArUser>;
    convertToUserProfile(user: ArUser): UserProfile;
}
