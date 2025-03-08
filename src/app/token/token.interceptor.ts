import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakService } from '../services/keycloak/keycloak.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private readonly keycloakService: KeycloakService) {}
  
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log("*************************************************")
      const token = this.keycloakService.getToken();   
      console.log('Token JWT récupéré dans l\'intercepteur:', token);  
  
      if (token) {
        
        const cloned = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Token ajouté dans l\'en-tête Authorization:', cloned.headers.get('Authorization'));  // Vérification de l'ajout du token
  
        return next.handle(cloned);  
      }
      console.log('Aucun token trouvé, envoi de la requête sans Authorization');
  
      return next.handle(req);  // Passer la requête sans modification si aucun token n'est disponible
      
    }
  }