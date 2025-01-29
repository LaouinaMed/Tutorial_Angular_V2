import { Component, inject, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MasterService } from 'src/app/services/master.service';
import { APIResponseModel, IDesignation } from 'src/app/model/interface/role';

@Component({
  selector: 'app-designation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {

  designationList : IDesignation[] = [];
  masterService = inject(MasterService);

  isLoader : boolean = true;

  ngOnInit(): void {
    this.masterService.getDesignations().subscribe((result :APIResponseModel)=>{
      this.designationList = result.data;
      this.isLoader = false;
    },error=>{
      alert("API error / Network Down");
      this.isLoader = false;

    })
  }

}
