import { Routes } from '@angular/router';
import { PersonneComponent } from './components/client/personne.component';
import { LogsComponent } from './components/logs/logs.component';

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
        component:LogsComponent
    },
   
];