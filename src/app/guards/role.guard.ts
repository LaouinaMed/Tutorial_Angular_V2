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

    
    const roles: string[] = this.keycloakService.getUserRoles();
    const hasRole = requiredRoles.some((role:string) => roles.includes(role));

    // Vérifie si l'utilisateur a l'un des rôles requis
    if (hasRole) {
      return true;  // L'utilisateur a l'un des rôles nécessaires, il peut accéder à la route
    }

    if (roles.includes('client_user') && requiredRoles.includes('client_admin')) {
      // Redirige l'utilisateur vers la route 'produit' s'il est un client_user
      this.router.navigate(['/produit']);
      return false;
    }
    this.router.navigate(['/access-denied']);

    
    return false;
  }
}
