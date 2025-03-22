import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development'; // Assurez-vous que l'URL de l'API est correcte
import { KeycloakService } from '../keycloak/keycloak.service'; // Si vous utilisez Keycloak pour la gestion des utilisateurs
import { Commande } from 'src/app/model/class/commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private readonly http: HttpClient, private readonly keycloakService: KeycloakService) { }

  getAllCommandes(): Observable<Commande[]> {
    const token = this.keycloakService.getToken();  // Obtient le token d'authentification
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Commande[]>(`${environment.API_URL}api/commandes`, { headers });
  }

  addCommande(commande: Commande): Observable<Commande> {
    const token = this.keycloakService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Commande>(`${environment.API_URL}api/commandes`, commande, { headers });
  }

  // Modifier une commande existante
  updateCommande(id: number, commande: Commande): Observable<Commande> {
    const token = this.keycloakService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Commande>(`${environment.API_URL}api/commandes/${id}`, commande, { headers });
  }

  // Supprimer une commande
  deleteCommande(id: number): Observable<void> {
    const token = this.keycloakService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${environment.API_URL}api/commandes/${id}`, { headers });
  }

  // Récupérer la liste des statuts disponibles
  getStatutsDisponibles(): Observable<string[]> {
    const token = this.keycloakService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<string[]>(`${environment.API_URL}api/commandes/statuts`, { headers });
  }
}
