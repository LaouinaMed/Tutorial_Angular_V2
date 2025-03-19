import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { KeycloakService } from '../services/keycloak/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class roleGuard implements CanActivate {

  constructor(private keycloakService: KeycloakService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const requiredRoles = route.data['roles'];  // Récupère les rôles requis pour la route

    
    // Récupère les rôles de l'utilisateur en utilisant la méthode getUserRoles() du KeycloakService
    const roles: string[] = this.keycloakService.getUserRoles();
    console.log(roles);

    // Vérifie si l'utilisateur a l'un des rôles requis
    if (roles.includes('client_admin') || roles.includes('client_user')) {
      return true;  // L'utilisateur a l'un des rôles nécessaires, il peut accéder à la route
    }
    this.keycloakService.logout();  

    
    return false;
  }
}
