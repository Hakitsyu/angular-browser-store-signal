import { Signal, WritableSignal, signal } from '@angular/core';

export abstract class AbstractStorage<T extends Storage = Storage> {
    protected signal: WritableSignal<T>;

    constructor(storage: T) {
        this.signal = signal(storage, { equal: (a, b) => false });
    }

    getItem(key: string): string | null {
        return this.signal().getItem(key);
    }

    key(index: number): string | null {
        return this.signal().key(index);
    }

    clear() {
        this.updateStorage(storage => storage.clear());
    }

    removeItem(key: string) {
        this.updateStorage(storage => storage.removeItem(key));
    }

    setItem(key: string, value: string) {
        this.updateStorage(storage => storage.setItem(key, value));
    }

    private updateStorage(func: (storage: T) => void) {
        this.signal.update(storage => {
            func(storage);
            return storage;
        });
    }

    get length(): number {
        return this.signal().length;
    }

    asReadonly(): Signal<T> {
        return this.signal.asReadonly();
    }
}