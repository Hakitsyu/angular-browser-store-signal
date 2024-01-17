import { Injectable } from '@angular/core';
import { AbstractStorage } from '../base/abstract-storage';

@Injectable()
export class SessionStorageService extends AbstractStorage{
    constructor() {
        super(sessionStorage);
    }
}