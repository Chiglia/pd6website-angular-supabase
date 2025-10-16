/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { CreateUserDto } from '../models/CreateUserDto';
import type { JWTUser } from '../models/JWTUser';
import type { UpdateUserDto } from '../models/UpdateUserDto';
import type { User } from '../models/User';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
@Injectable({
    providedIn: 'root',
})
export class UsersService {
    constructor(public readonly http: HttpClient) {}
    /**
     * @returns JWTUser Fetch all users
     * @throws ApiError
     */
    public usersControllerGetUser(): Observable<JWTUser> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/users/profile',
        });
    }
    /**
     * @returns User Fetch all users
     * @throws ApiError
     */
    public usersControllerFindAll(): Observable<Array<User>> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/users/get-all',
        });
    }
    /**
     * @param requestBody
     * @returns User Create a user
     * @throws ApiError
     */
    public usersControllerCreate(
        requestBody: CreateUserDto,
    ): Observable<User> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/users/create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns User Update a user
     * @throws ApiError
     */
    public usersControllerUpdate(
        id: string,
        requestBody: UpdateUserDto,
    ): Observable<User> {
        return __request(OpenAPI, this.http, {
            method: 'PUT',
            url: '/users/update/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns User Delete a user
     * @throws ApiError
     */
    public usersControllerDelete(
        id: string,
    ): Observable<User> {
        return __request(OpenAPI, this.http, {
            method: 'DELETE',
            url: '/users/delete/{id}',
            path: {
                'id': id,
            },
        });
    }
}
