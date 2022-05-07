import { UserService } from '@loopback/authentication';
import { UserProfile } from '@loopback/security';
import { ArUser } from '../models';
import { ArUserRepository } from '../repositories';
export declare type Credentials = {
    phone: string;
    password: string;
};
export declare class ArUserService implements UserService<ArUser, Credentials> {
    arUserRepository: ArUserRepository;
    constructor(arUserRepository: ArUserRepository);
    verifyCredentials(credentials: Credentials): Promise<ArUser>;
    convertToUserProfile(user: ArUser): UserProfile;
}
