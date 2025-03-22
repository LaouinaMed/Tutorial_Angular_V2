import { Personne } from "./Personne";
import { Produit } from "./produit";

export class Commande {
    id: number;
    statut: string;
    quantite: number;
    montant: number;
    personne: Personne;
    produit: Produit;
  
    constructor(id: number, statut: string, quantite: number, montant: number, personne: Personne, produit: Produit) {
      this.id = id;
      this.statut = statut;
      this.quantite = quantite;
      this.montant = montant;
      this.personne = personne;
      this.produit = produit;
    }
  }