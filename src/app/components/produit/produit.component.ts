import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produit } from 'src/app/model/class/produit';
import { ProduitService } from 'src/app/services/produit/produit.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [CommonModule ,FormsModule],
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent {

  produitObj : Produit = new Produit();
  produitList : Produit[] = [];
  filteredProduits: Produit[] = [];
  searchQuery : string = '';

  produitService =inject(ProduitService)

  ngOnInit(): void {
    this.loadProduits();
  }


  loadProduits(){
    this.produitService.getAllProduits().subscribe(
      {
        next :(res : Produit[]) => {
          this.produitList = res;
          this.filteredProduits = res;
        },
        error:(error)=>{
          console.error('Error fetching produits', error);
        }
      }
    )
  }

  resetForm(form:NgForm){
    this.produitObj = new Produit();
  }

   onEdit(data: Produit) {
      this.produitObj = { ...data }; 
  }

  onDelete(id: number) {
    const isDelete = confirm("Are you sure you want to delete?");
    if (isDelete) {
      this.produitService.deleteProduitById(id).subscribe({
        next: () => {
          alert("Produit deleted successfully");
          this.loadProduits(); 
        },
        error: (error) => {
          alert("Produit deletion failed");
          console.error('Error during personne deletion', error);
        }
      });
    }
  }

  onSaveProduit(form: NgForm){
      if(this.produitObj.id != null && this.produitObj.id !== 0){
        this.produitService.updateProduits(this.produitObj.id, this.produitObj).subscribe(
          {
            next:(res : Produit) =>{
              alert("Produit mise à jour avec succès");
              this.loadProduits();
              this.resetForm(form);
            },
            error: (error)=>{
              alert("Échec de la mise à jour de la produit");
            }
          }
        )
      }
      else{this.produitService.addProduit(this.produitObj).subscribe(
        {
          next: (res: Produit)=>{
            alert("Produit créée avec succès");
            this.loadProduits(); 
            
            this.resetForm(form); 
          },
          error: (error)=>{
            alert("Échec de la création de la produit");
          }
        }
      )
  
      }
  }

  onSearch(): void {
    if (this.searchQuery) {
      this.filteredProduits = this.produitList.filter(produit =>
        produit.libeller.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredProduits = [...this.produitList];  
    }
    console.log('Filtered list:', this.filteredProduits);
  }

 

}
