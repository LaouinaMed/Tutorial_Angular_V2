import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Client } from 'src/app/model/class/Client';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  clientObj : Client = new Client();
  clientList : Client[] = [];

  onSaveClient(){
     
  }
}
