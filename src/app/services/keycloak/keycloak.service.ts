import {Injectable} from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private _keycloak: Keycloak | undefined;

  get keycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:8080',
        realm: 'appDemo',
        clientId: 'clientAppDemo',
      });
    }

    return this._keycloak;
  }
  

  getToken(): string | undefined {
    console.log('Token récupéré depuis Keycloak:', this.keycloak?.token); 

    return this.keycloak?.token;  // Retourne le token JWT
  }

  

  async init() {
    try {
     const authenticated = await this.keycloak?.init({
        onLoad: 'login-required',  
      });
      console.log('Keycloak initialisé avec succès, utilisateur authentifié:', authenticated);
      console.log('Token:', this.keycloak?.token);

      console.log('Token récupéré:', this.getToken());
    } catch (error) {
      console.error('Erreur d\'initialisation de Keycloak', error);
    }
  }

  logout() {
    if (this.keycloak) {
      this.keycloak.logout();
    }
  }


}