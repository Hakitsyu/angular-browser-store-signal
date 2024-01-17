import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AngularBrowserStoreStoragesModule } from '../../../angular-browser-store-signal/src/public-api';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(AngularBrowserStoreStoragesModule.forRoot())]
};
