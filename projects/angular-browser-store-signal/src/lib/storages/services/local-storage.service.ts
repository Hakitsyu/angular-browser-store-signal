import { Injectable, signal } from '@angular/core';
import { AbstractStorage } from '../base/abstract-storage';

@Injectable()
export class LocalStorageService extends AbstractStorage {
    constructor() {
        super(localStorage);
    }
}