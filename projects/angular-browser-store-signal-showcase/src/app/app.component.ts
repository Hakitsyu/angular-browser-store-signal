import { Component, EventEmitter, Input, Output, Signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AbstractStorage, AngularBrowserStoreStoragesModule, LocalStorageService, SessionStorageService } from '../../../angular-browser-store-signal/src/public-api';
import { FormsModule } from '@angular/forms';

export type StorageHandlerComponentUpdateStorageEvent = {
  key: string,
  value: string
}

@Component({
  selector: 'app-root-storage-handler',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div>
      <input type="text" [(ngModel)]="key">
      <input type="text" [(ngModel)]="value">
      <button (click)="update()">update</button>
      <span>{{signal() | json}}</span>
    </div>
  `
})
export class StorageHandlerComponent {
  key: string = '';
  value: string = '';

  @Input()
  signal!: Signal<Storage>;

  @Output()
  updateStorage: EventEmitter<StorageHandlerComponentUpdateStorageEvent> = new EventEmitter<StorageHandlerComponentUpdateStorageEvent>();

  update() {
    if (this.key && this.value)
      this.updateStorage.emit({ key: this.key, value: this.value });
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AngularBrowserStoreStoragesModule, StorageHandlerComponent],
  template: `
    <app-root-storage-handler [signal]="localStorageSignal" (updateStorage)="updateStorage($event, localStorageService)"></app-root-storage-handler>
    <app-root-storage-handler [signal]="sessionStorageSignal" (updateStorage)="updateStorage($event, sessionStorageService)"></app-root-storage-handler>
  `
})
export class AppComponent {
  readonly localStorageService: LocalStorageService = inject(LocalStorageService);
  readonly sessionStorageService: SessionStorageService = inject(SessionStorageService);

  readonly localStorageSignal = this.localStorageService.asReadonly();
  readonly sessionStorageSignal = this.sessionStorageService.asReadonly();

  constructor() {
    effect(() => console.log('updated local storage', this.localStorageSignal()));
    effect(() => console.log('updated session storage', this.sessionStorageSignal()));
  }

  updateStorage(event: StorageHandlerComponentUpdateStorageEvent, storage: AbstractStorage) {
    storage.setItem(event.key, event.value);
  }
}