import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  ngOnInit(): void {
    alert("hello")
  }

}
