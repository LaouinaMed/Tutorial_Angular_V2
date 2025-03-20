import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Personne } from 'src/app/model/class/Personne';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { PersonneService } from 'src/app/services/personne/personne.service';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-personne',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './personne.component.html',
  styleUrls: ['./personne.component.css']
})
export class PersonneComponent implements OnInit {
  personneObj: Personne = new Personne();
  personneList: Personne[] = [];

  filteredPersonnes: Personne[] = [];
  searchQuery: string = ''; 
  selectedFile: File | null = null;

  selectedUser: Personne | null = null; 
  
  userRoles: string[] = []; 

  availableRoles: string[] = [];  // Rôles disponibles à assigner
  rolesToAdd: string[] = [];  // Rôles sélectionnés à ajouter





  personneService = inject(PersonneService);

  patterns = {
    nom: '^[A-Za-z]{2,}$',
    prenom: '^[A-Za-z]{2,}$',
    cin: '^[A-Z][A-Z0-9]\\d{5}$',  
    tel: '^(212[6-7]\\d{8}|0[67]\\d{8})$',  
    adresse: '^[A-Za-z0-9,\\.\\s-_]{5,}$',
    email: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
};

  ngOnInit(): void {
    this.loadPersonnes();
  }
  

  onImport(): void {
    this.personneService.importData().subscribe({
      next: (res) => {
        console.log('Données importées:', res);
    },
    error: (error) => {
        console.error('Erreur lors de l\'importation:', error);
    },
    complete: () => {
        console.log('Importation terminée.');
    }
    }); 
  }

  loadPersonnes(){
    this.personneService.getAllPersonnes().subscribe(
      {
        next:(res : Personne[]) => {
          this.personneList =res;
          this.filteredPersonnes = res;
        },
        error: (error) =>{
          console.error('Error fetching personnes', error);

        }
      }
    )
  }


  
  resetForm(form: NgForm) {
    this.personneObj = new Personne();
  }

  onSavePersonne(form: NgForm){
    if(this.personneObj.id != null && this.personneObj.id !== 0){
      this.personneService.updatePersonne(this.personneObj.id, this.personneObj).subscribe(
        {
          next:(res : Personne) =>{
            alert("Personne mise à jour avec succès");
            this.loadPersonnes();
            this.resetForm(form);
          },
          error: (error)=>{
            alert("Échec de la mise à jour de la personne");
          }
        }
      )
    }
    else{this.personneService.addPersonne(this.personneObj).subscribe(
      {
        next: (res: Personne)=>{
          alert("Personne créée avec succès");
          this.loadPersonnes(); 
          
          this.resetForm(form); 
        },
        error: (error)=>{
          alert("Échec de la création de la personne");
        }
      }
    )

    }
  }




  onDelete(id: number) {
    const isDelete = confirm("Are you sure you want to delete?");
    if (isDelete) {
      this.personneService.deletePersonneById(id).subscribe({
        next: () => {
          alert("Personne deleted successfully");
          this.loadPersonnes(); 
        },
        error: (error) => {
          alert("Personne deletion failed");
          console.error('Error during personne deletion', error);
        }
      });
    }
  }
  


  onEdit(data: Personne) {
    this.personneObj = { ...data }; 
  }


  onSearch(): void {
    if (this.searchQuery) {
      this.filteredPersonnes = this.personneList.filter(personne =>
        personne.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        personne.cin.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        personne.prenom.toLowerCase().includes(this.searchQuery.toLowerCase())||
        personne.adresse.includes(this.searchQuery)||
        personne.tel.includes(this.searchQuery)
      );
    } else {
      this.filteredPersonnes = [...this.personneList];  
    }
    console.log('Filtered list:', this.filteredPersonnes);
  }


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUploadFile(): void {
    if (this.selectedFile) {
      this.personneService.uploadFile(this.selectedFile).subscribe({
        next: (response) => {
          console.log('Fichier uploadé avec succès', response);
          alert("Fichier uploadé avec succès");
          this.loadPersonnes(); 
  
          const fileInput = document.getElementById('fileInput') as HTMLInputElement;
          if (fileInput) {
            fileInput.value = ''; 
          }
        },
        error: (error) => {
          console.error("Erreur lors de l'upload du fichier", error);
          alert("Échec de l'upload du fichier");
        }
      });
    } else {
      alert("Veuillez sélectionner un fichier");
    }
  }


    // Ouvrir la modale pour afficher et attribuer les rôles
  openRoleModal(user: Personne) {
    this.selectedUser = user;

    if (!user.keycloakId) {
      console.error("Erreur : Cet utilisateur n'a pas de Keycloak ID !");
      return;
    }

    // Récupérer les rôles actuels de l'utilisateur
    this.personneService.getUserRolesByKeycloakId(user.keycloakId).subscribe({
      next: (roles) => {
        this.userRoles = roles;
      },
      error: (error) => {
        console.error("Erreur lors de la récupération des rôles", error);
        this.userRoles = [];
      }
    });

    // Récupérer la liste des rôles disponibles
    this.personneService.getAvailableRoles().subscribe({
      next: (roles) => {
        this.availableRoles = roles;
        this.rolesToAdd = [];  // Réinitialiser les rôles à ajouter
        this.showRoleModal();
      },
      error: (error) => {
        console.error("Erreur lors de la récupération des rôles disponibles", error);
        this.availableRoles = [];
      }
    });
  }

  // Dans le composant : PersonneComponent

// Ouvrir la modale et afficher les rôles de l'utilisateur
viewRoles(user: Personne) {
  this.selectedUser = user;

  if (!user.keycloakId) {
    console.error("Erreur : Cet utilisateur n'a pas de Keycloak ID !");
    return;
  }

  // Récupérer les rôles actuels de l'utilisateur
  this.personneService.getUserRolesByKeycloakId(user.keycloakId).subscribe({
    next: (roles) => {
      this.userRoles = roles;
    },
    error: (error) => {
      console.error("Erreur lors de la récupération des rôles", error);
      this.userRoles = [];
    }
  });

  // Récupérer la liste des rôles disponibles
  this.personneService.getAvailableRoles().subscribe({
    next: (roles) => {
      this.availableRoles = roles;
      this.rolesToAdd = [];  // Réinitialiser les rôles à ajouter
      this.showRoleModal();  // Afficher la modale une fois les données chargées
    },
    error: (error) => {
      console.error("Erreur lors de la récupération des rôles disponibles", error);
      this.availableRoles = [];
    }
  });
}

onRoleChange(role: string) {
  const index = this.rolesToAdd.indexOf(role);
  if (index === -1) {
    this.rolesToAdd.push(role);  // Ajouter le rôle à la liste des rôles à ajouter
  } else {
    this.rolesToAdd.splice(index, 1);  // Retirer le rôle de la liste des rôles à ajouter
  }
}


  // Afficher la modale
  showRoleModal() {
    const modal = new bootstrap.Modal(document.getElementById('rolesModal')!);
    modal.show();
  }


  // Méthode pour attribuer des rôles à l'utilisateur
  addRolesToUser() {
    if (this.selectedUser && this.rolesToAdd.length > 0) {
      const roles = this.rolesToAdd.join(','); // Joindre les rôles avec des virgules
      this.personneService.assignRoleToUser(this.selectedUser.keycloakId!, roles).subscribe({
        next: () => {
          // Affichage d'un message de succès
          alert('Les rôles ont été attribués avec succès !');

          // Rafraîchir les rôles de l'utilisateur après l'attribution
          this.refreshUserRoles();  // Rafraîchit la liste des rôles

          // Réinitialiser la liste des rôles à ajouter
          this.rolesToAdd = [];  


        },
        error: (error) => {
          console.error("Erreur lors de l'attribution des rôles", error);
          alert('Une erreur s\'est produite lors de l\'attribution des rôles.');
        }
      });
    }
  }

  // Méthode pour supprimer un rôle de l'utilisateur
  removeRoleFromUser(roleName: string) {
    if (this.selectedUser) {
      console.log("######################################")
      console.log(this.selectedUser.keycloakId)
      console.log(roleName)
      this.personneService.removeRoleFromUser(this.selectedUser.keycloakId!, roleName).subscribe({
        next: (response) => {
          // Affichage du message de succès
          alert('Le rôle a été supprimé avec succès!');

          // Rafraîchir les rôles après suppression
          this.refreshUserRoles();  // Rafraîchit les rôles


        },
        error: (error) => {
          console.error('Erreur lors de la suppression du rôle', error);
          alert('Une erreur s\'est produite lors de la suppression du rôle');
        }
      });
    }
  }

  // Rafraîchir les rôles de l'utilisateur
  refreshUserRoles() {
    if (this.selectedUser && this.selectedUser.keycloakId) {
      this.personneService.getUserRolesByKeycloakId(this.selectedUser.keycloakId).subscribe({
        next: (roles) => {
          this.userRoles = roles;  // Mettre à jour les rôles affichés dans l'UI
        },
        error: (error) => {
          console.error("Erreur lors de la récupération des rôles actualisés", error);
        }
      });
    }
  }

  
}