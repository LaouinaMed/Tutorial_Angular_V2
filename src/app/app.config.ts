import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { KeycloakService } from './services/keycloak/keycloak.service';
import { TokenInterceptor } from './token/token.interceptor';

export function kcFactory(kcService: KeycloakService){
  return () => kcService.init().catch((error) => {
    console.error('Erreur d\'initialisation de Keycloak', error);
  });
}

export const appConfig: ApplicationConfig = {
   providers: [
    provideRouter(routes),

    provideHttpClient(),
  

    {
      provide: APP_INITIALIZER,
      useFactory: kcFactory,
      deps: [KeycloakService],
      multi: true,
    },

 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true, 
    }
  ],
};
