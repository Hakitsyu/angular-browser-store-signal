import { ModuleWithProviders, NgModule } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { SessionStorageService } from './services/session-storage.service';

@NgModule({
    exports: [
    ]
})
export class AngularBrowserStoreStoragesModule {
    static forRoot(): ModuleWithProviders<AngularBrowserStoreStoragesModule> {
        return {
            ngModule: AngularBrowserStoreStoragesModule,
            providers: [
                LocalStorageService,
                SessionStorageService
            ]
        }
    }
}