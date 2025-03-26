import { Routes } from '@angular/router';
import { PersonneComponent } from './components/personne/personne.component';
import { LogsComponent } from './components/logs/logs.component';
import { roleGuard } from './guards/role.guard';
import { ProduitComponent } from './components/produit/produit.component';
import { CommandeComponent } from './components/commande/commande.component';
import { AccessDeniedComponentComponent } from './components/access-denied-component/access-denied-component.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


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
        path:'dashboard',
        component:DashboardComponent,
        canActivate: [roleGuard],
        data: { roles: ['client_admin'] } 

    },

    {
        path:'logs',
        component:LogsComponent,
        canActivate: [roleGuard],  
        data: { roles: ['client_admin'] }  
    },

    {
        path:'produit',
        component:ProduitComponent,
        canActivate: [roleGuard],  
        data: { roles: ['client_admin','client_user'] }  
    },

    {
        path:'commande',
        component:CommandeComponent,
        canActivate: [roleGuard],  
        data: { roles: ['client_admin','client_user'] }  
    },

    {
        path: '**',
        redirectTo: '/access-denied',  // Redirection vers la page d'accès refusé pour les URLs invalides
        pathMatch: 'full',
        
      }
   
];