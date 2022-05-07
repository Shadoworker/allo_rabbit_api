import { Entity } from '@loopback/repository';
import { ArUserCredentials } from './ar-user-credentials.model';
export declare class ArUser extends Entity {
    id: string;
    phone: string;
    email: string;
    phones?: string[];
    password: string;
    arUserCredentials: ArUserCredentials;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    isActivated?: boolean;
    activationCode?: string;
    resetPasswordCode?: string;
    userCredentials: ArUserCredentials;
    [prop: string]: any;
    constructor(data?: Partial<ArUser>);
}
export interface ArUserRelations {
}
export declare type ArUserWithRelations = ArUser & ArUserRelations;
