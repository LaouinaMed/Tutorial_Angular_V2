import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from '../keycloak/keycloak.service';
import { Observable } from 'rxjs';
import { LogsErreur } from 'src/app/model/class/LogsErreur';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private readonly http: HttpClient, private readonly keycloakService : KeycloakService) { }

  getAllLogs(): Observable<LogsErreur[]>{
    const token = this.keycloakService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<LogsErreur[]>(`${environment.API_URL}api/personnes/logs`, { headers });
    
  }
}
