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
    //console.log('Token récupéré depuis Keycloak:', this.keycloak?.token); 

    return this.keycloak?.token;  // Retourne le token JWT
  }

  getUserRoles(): string[] {
    const roles: string[] = this.keycloak?.realmAccess?.roles || [];  // Récupère les rôles de realmAccess
    const clientRoles = this.keycloak?.resourceAccess?.['clientAppDemo']?.roles || [];  // Utilisation de la syntaxe entre crochets
    //console.log()
    return [...roles, ...clientRoles];  // Combine les rôles de 'realmAccess' et 'resourceAccess.clientAppDemo'
  }
  

  

  async init() {
    try {
     const authenticated = await this.keycloak?.init({
        onLoad: 'login-required',  
      });
      //console.log('Keycloak initialisé avec succès, utilisateur authentifié:', authenticated);
      //console.log('Token:', this.keycloak?.token);

      //console.log('Token récupéré:', this.getToken());
    } catch (error) {
      console.error('Erreur d\'initialisation de Keycloak', error);
    }
  }

  logout() {
    if (this.keycloak) {
      this.keycloak.logout();
    }
  }

  login() {
    if (this.keycloak) {
      this.keycloak.login();
    }
  }

  
}