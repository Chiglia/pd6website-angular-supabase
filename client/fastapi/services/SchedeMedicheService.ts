/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { CreateSchedaMedicaDto } from '../models/CreateSchedaMedicaDto';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
@Injectable({
    providedIn: 'root',
})
export class SchedeMedicheService {
    constructor(public readonly http: HttpClient) {}
    /**
     * @returns any
     * @throws ApiError
     */
    public schedeMedicheControllerFindAll(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/schede-mediche/get-all',
        });
    }
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public schedeMedicheControllerCreate(
        requestBody: CreateSchedaMedicaDto,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/schede-mediche/create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param userId
     * @returns any
     * @throws ApiError
     */
    public schedeMedicheControllerFindByUserId(
        userId: string,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/schede-mediche/get-one/{userId}',
            path: {
                'userId': userId,
            },
        });
    }
}
