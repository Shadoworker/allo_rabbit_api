import { Entity } from '@loopback/repository';
import { ArUserCredentials } from './ar-user-credentials.model';
import { Restaurant } from './restaurant.model';
import { ProductCategory } from './product-category.model';
export declare class ArUser extends Entity {
    id: string;
    phone: string;
    email: string;
    phones?: string[];
    password: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    isActivated?: boolean;
    activationCode?: string;
    resetPasswordCode?: string;
    roles?: string[];
    pushToken?: string;
    userCredentials: ArUserCredentials;
    arUserCredentials: ArUserCredentials;
    restaurants: Restaurant[];
    productCategories: ProductCategory[];
    [prop: string]: any;
    constructor(data?: Partial<ArUser>);
}
export interface ArUserRelations {
}
export declare type ArUserWithRelations = ArUser & ArUserRelations;
