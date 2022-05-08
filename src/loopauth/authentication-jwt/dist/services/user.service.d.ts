import { UserService } from '@loopback/authentication';
import { UserProfile } from '@loopback/security';
import { User, UserWithRelations } from '../models';
import { UserRepository } from '../repositories';
/**
 * A pre-defined type for user credentials. It assumes a user logs in
 * using the email and password. You can modify it if your app has different credential fields
 */
export declare type Credentials = {
    id: string;
    email: string;
    phone: string;
    password: string;
    userId: string;
    getId: any;
    getIdObject: any;
    toJSON: any;
    toObject: any;
};
export declare class MyUserService implements UserService<User, Credentials> {
    userRepository: UserRepository;
    constructor(userRepository: UserRepository);
    verifyCredentials(credentials: Credentials): Promise<User>;
    convertToUserProfile(user: User): UserProfile;
    findUserById(id: string): Promise<User & UserWithRelations>;
}
