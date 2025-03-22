import { Component, OnInit } from '@angular/core';
import { CommandeService } from 'src/app/services/commande/commande.service'; // Assurez-vous que le service existe
import { Commande } from 'src/app/model/class/commande';
import { Personne } from 'src/app/model/class/Personne'; // Assurez-vous que le modèle existe
import { Produit } from 'src/app/model/class/produit'; // Assurez-vous que le modèle existe
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduitService } from 'src/app/services/produit/produit.service';

@Component({
  selector: 'app-commande',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {

  commandes: Commande[] = [];
  commandeObj: Commande = new Commande(0, '', 0, 0, new Personne(), new Produit()); // Initialisation avec objets Personne et Produit vides
  filteredCommandes: Commande[] = [];
  searchQuery: string = '';  // Pour rechercher des commandes
  statutsDisponibles: string[] = [];  // Array pour stocker les statuts disponibles
  produitsDisponibles: Produit[] = [];


  constructor(private commandeService: CommandeService, private produitService: ProduitService // Injecter ProduitService
  ) {}

  ngOnInit(): void {
    this.loadCommandes();
    this.loadStatutsDisponibles();
    this.loadProduitsDisponibles();
  }

  // Charger toutes les commandes
  loadCommandes() {
    this.commandeService.getAllCommandes().subscribe({
      next: (res: Commande[]) => {
        this.commandes = res;
        this.filteredCommandes = res;
      },
      error: (error) => {
        console.error('Error fetching commandes', error);
      }
    });
  }

  loadProduitsDisponibles() {
    this.produitService.getAllProduits().subscribe({
      next: (produits: Produit[]) => {
        this.produitsDisponibles = produits;  // Stocke les produits dans la variable produitsDisponibles
        console.log('Produits Disponibles:', this.produitsDisponibles);  // Vérifiez si les produits sont bien récupérés
      },
      error: (error) => {
        console.error('Error fetching produits', error);
      }
    });
  }

  loadStatutsDisponibles() {
    this.commandeService.getStatutsDisponibles().subscribe({
      next: (statuts: string[]) => {
        this.statutsDisponibles = statuts; 
        console.log('Statuts Disponibles:', this.statutsDisponibles);  
      },
      error: (error) => {
        console.error('Error fetching statuts', error);
      }
    });
  }

  // Ajouter ou modifier une commande
  onSaveCommande() {
    if (this.commandeObj.id !== 0) {
      // Mise à jour de la commande
      this.commandeService.updateCommande(this.commandeObj.id, this.commandeObj).subscribe({
        next: (res: Commande) => {
          alert('Commande mise à jour avec succès');
          this.loadCommandes(); // Recharger la liste des commandes
          this.commandeObj = new Commande(0, '', 0, 0, new Personne(), new Produit());  // Réinitialiser le formulaire
        },
        error: (error) => {
          alert('Échec de la mise à jour de la commande');
        }
      });
    } else {
      // Ajout d'une nouvelle commande
      this.commandeService.addCommande(this.commandeObj).subscribe({
        next: (res: Commande) => {
          alert('Commande créée avec succès');
          this.loadCommandes(); // Recharger la liste des commandes
          this.commandeObj = new Commande(0, '', 0, 0, new Personne(), new Produit());  // Réinitialiser le formulaire
        },
        error: (error) => {
          alert('Échec de la création de la commande');
        }
      });
    }
  }

  onDelete(id: number) {
    const isDelete = confirm('Êtes-vous sûr de vouloir supprimer cette commande ?');
    if (isDelete) {
      this.commandeService.deleteCommande(id).subscribe({
        next: () => {
          alert('Commande supprimée avec succès');
          this.loadCommandes();  
        },
        error: (error) => {
          alert('Échec de la suppression de la commande');
          console.error('Error during commande deletion', error);
        }
      });
    }
  }

  onSearch(): void {
    if (this.searchQuery) {
      this.filteredCommandes = this.commandes.filter(commande =>
        commande.personne.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        commande.produit.libeller.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        commande.statut.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredCommandes = [...this.commandes];  
    }
  }

  onEdit(data: Commande) {
    this.commandeObj = { ...data };  
  }

  resetForm() {
    this.commandeObj = new Commande(0, '', 0, 0, new Personne(), new Produit());
  }

}
