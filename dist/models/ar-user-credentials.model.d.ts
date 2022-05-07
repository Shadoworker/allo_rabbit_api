import { Entity } from '@loopback/repository';
export declare class ArUserCredentials extends Entity {
    id: string;
    phone: string;
    password: string;
    arUserId?: string;
    [prop: string]: any;
    constructor(data?: Partial<ArUserCredentials>);
}
export interface ArUserCredentialsRelations {
}
export declare type ArUserCredentialsWithRelations = ArUserCredentials & ArUserCredentialsRelations;
