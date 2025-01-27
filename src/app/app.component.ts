import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './components/roles/roles.component';
import { MasterComponent } from "./components/master/master.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RolesComponent, MasterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tutorial_angular_V2';
}
