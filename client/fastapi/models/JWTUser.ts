/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserBranca } from './UserBranca';
import type { UserRole } from './UserRole';
export type JWTUser = {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone: string;
    has_confirmed_email: boolean;
    branca: UserBranca;
    role: UserRole;
};

