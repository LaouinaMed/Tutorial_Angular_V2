import { Routes } from '@angular/router';
import { PersonneComponent } from './components/personne/personne.component';
import { LogsComponent } from './components/logs/logs.component';
import { roleGuard } from './guards/role.guard';
import { ProduitComponent } from './components/produit/produit.component';
import { CommandeComponent } from './components/commande/commande.component';
import { AccessDeniedComponentComponent } from './components/access-denied-component/access-denied-component.component';


export const routes: Routes = [
    {
        path:'',
        redirectTo:'personne',
        pathMatch:'full'
         
    },

    {
        path: 'access-denied',
        component: AccessDeniedComponentComponent 
      },
   

    {
        path:'personne',
        component:PersonneComponent,
        canActivate: [roleGuard],
        data: { roles: ['client_admin'] } 

    },

    {
        path:'logs',
        component:LogsComponent,
        canActivate: [roleGuard],  // Ajout du guard pour protéger cette route
        data: { roles: ['client_admin'] }  // Seuls les utilisateurs avec le rôle 'client_adlin' peuvent accéder à cette route
    },

    {
        path:'produit',
        component:ProduitComponent,
        canActivate: [roleGuard],  // Ajout du guard pour protéger cette route
        data: { roles: ['client_admin','client_user'] }  // Seuls les utilisateurs avec le rôle 'client_adlin' peuvent accéder à cette route
    },

    {
        path:'commande',
        component:CommandeComponent,
        canActivate: [roleGuard],  // Ajout du guard pour protéger cette route
        data: { roles: ['client_admin','client_user'] }  // Seuls les utilisateurs avec le rôle 'client_adlin' peuvent accéder à cette route
    },
   
];