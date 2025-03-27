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
    const requiredRoles = route.data['roles'];  

    
    const roles: string[] = this.keycloakService.getUserRoles();
    const hasRole = requiredRoles.some((role:string) => roles.includes(role));

    if (hasRole) {
      return true;  
    }

    if (roles.includes('client_user')  || roles.includes('client_user_edit_statut') && requiredRoles.includes('client_admin')) {
      this.router.navigate(['/produit']);
      return false;
    }
    this.router.navigate(['/access-denied']);

    
    return false;
  }
}
