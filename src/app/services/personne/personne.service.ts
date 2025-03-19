


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Personne } from '../../model/class/Personne'; // Mettre à jour la classe
import { environment } from 'src/environments/environment.development';
import { KeycloakService } from '../keycloak/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class PersonneService {

  constructor(private readonly http: HttpClient, private readonly keycloakService: KeycloakService) { }

  getAllPersonnes(): Observable<Personne[]> {
    const token = this.keycloakService.getToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Personne[]>(`${environment.API_URL}api/personnes`, { headers });
  }


  addPersonne(obj: Personne): Observable<Personne> {
    const token = this.keycloakService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);


        return this.http.post<Personne>(`${environment.API_URL}api/personnes`, obj, { headers });
      }

  deletePersonneById(id: number): Observable<void> {
    const token = this.keycloakService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<void>(`${environment.API_URL}api/personnes/${id}`, { headers });
  }

  updatePersonne(id: number, obj: Personne): Observable<Personne> {
    const token = this.keycloakService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Personne>(`${environment.API_URL}api/personnes/${id}`, obj, { headers });
  }

  importData(): Observable<any> {
    const token = this.keycloakService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${environment.API_URL}api/personnes/import`, {}, { headers });
  }

  uploadFile(file: File): Observable<any> {
    const token = this.keycloakService.getToken();
    const formData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.post<any>(`${environment.API_URL}api/personnes/upload`, formData, {
      headers: headers
    });
  }


  getUserRolesByKeycloakId(keycloakUserId: string): Observable<string[]> {
    const token = this.keycloakService.getToken(); // 🔥 Récupérer le token d'authentification
  
    if (!token) {
      console.error("Erreur : Aucun token trouvé !");
      return throwError(() => new Error("L'utilisateur n'est pas authentifié."));
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get<string[]>(`${environment.API_URL}api/personnes/roles/${keycloakUserId}`, { headers });
  }
  
  
  
}

