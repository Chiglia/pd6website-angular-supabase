/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserBranca } from './UserBranca';
import type { UserRole } from './UserRole';
export type UpdateUserDto = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    dob: string;
    role: UserRole;
    branca: UserBranca;
    has_confirmed_email: boolean;
};

