import { Routes } from '@angular/router';
import { PersonneComponent } from './components/client/personne.component';
import { LogsComponent } from './components/logs/logs.component';
import { roleGuard } from './guards/role.guard';


export const routes: Routes = [
    {
        path:'',
        redirectTo:'client',
        pathMatch:'full'
    },
   

    {
        path:'client',
        component:PersonneComponent
    },

    {
        path:'logs',
        component:LogsComponent,
        canActivate: [roleGuard],  // Ajout du guard pour protéger cette route
        data: { roles: ['client_admin'] }  // Seuls les utilisateurs avec le rôle 'client_adlin' peuvent accéder à cette route
    },
   
];