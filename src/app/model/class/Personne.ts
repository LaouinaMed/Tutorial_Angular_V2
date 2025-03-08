export class Personne {
    id: number;        // ID de la personne
    cin: string;             // CIN (identifiant unique de la personne)
    nom: string;             // Nom de la personne
    prenom: string;          // Prénom de la personne
    tel: string;       // Numéro de téléphone
    adresse: string;         // Adresse de la personne
  
    constructor() {
      this.id = 0;      // Initialisation de l'ID à 0
      this.cin = '';          // Initialisation du CIN à une chaîne vide
      this.nom = '';          // Initialisation du nom à une chaîne vide
      this.prenom = '';       // Initialisation du prénom à une chaîne vide
      this.tel = '';    // Initialisation du téléphone à une chaîne vide
      this.adresse = '';      // Initialisation de l'adresse à une chaîne vide
    }
  }
  